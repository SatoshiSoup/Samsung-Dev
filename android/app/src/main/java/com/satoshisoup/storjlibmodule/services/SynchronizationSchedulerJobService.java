package com.satoshisoup.storjlibmodule.services;

import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.AsyncTask;
import android.util.Log;

import com.firebase.jobdispatcher.JobParameters;
import com.firebase.jobdispatcher.JobService;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.satoshisoup.storjlibmodule.dataprovider.DatabaseFactory;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.BucketContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.FileContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.SettingsContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.UploadingFileContract;
import com.satoshisoup.storjlibmodule.dataprovider.dbo.BucketDbo;
import com.satoshisoup.storjlibmodule.dataprovider.dbo.FileDbo;
import com.satoshisoup.storjlibmodule.dataprovider.dbo.SettingsDbo;
import com.satoshisoup.storjlibmodule.dataprovider.dbo.SyncQueueEntryDbo;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.BucketRepository;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.FileRepository;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.SettingsRepository;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.SyncQueueRepository;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.UploadingFilesRepository;
import com.satoshisoup.storjlibmodule.enums.SyncSettingsEnum;
import com.satoshisoup.storjlibmodule.models.SyncQueueEntryModel;
import com.satoshisoup.storjlibmodule.models.UploadingFileModel;
import com.satoshisoup.storjlibmodule.responses.Response;

/**
 * Created by Yaroslav-Note on 3/13/2018.
 */

public class SynchronizationSchedulerJobService extends JobService {
    private AsyncTask mBackgroundTask;

    @Override
    public boolean onStartJob(final JobParameters job) {
        mBackgroundTask = new AsyncTask() {
            @Override
            protected Object doInBackground(Object[] objects) {
                String settingsId = job.getExtras().getString(SettingsContract._SETTINGS_ID);

                if(settingsId == null) {
                    Log.d(DEBUG_TAG, "sync: " + "No settings Id! Aborting!");
                    return null;
                }

                try(SQLiteDatabase db = new DatabaseFactory(SynchronizationSchedulerJobService.this, null).getReadableDatabase()) {
                    SettingsRepository settingsRepo = new SettingsRepository(db);
                    SettingsDbo dbo = settingsRepo.get(settingsId);

                    if(dbo == null) {
                        Log.d(DEBUG_TAG, "sync: " + "No settings settings found by specified id!");
                        return null;
                    }

                    BucketRepository bucketRepo = new BucketRepository(db);
                    int syncSettings = dbo.toModel().getSyncSettings();

                    syncFolder(settingsId, syncSettings, SyncSettingsEnum.SYNC_PHOTOS, bucketRepo, db);
                    syncFolder(settingsId, syncSettings, SyncSettingsEnum.SYNC_MOVIES, bucketRepo, db);
                    syncFolder(settingsId, syncSettings, SyncSettingsEnum.SYNC_DOCUMENTS, bucketRepo, db);
                    syncFolder(settingsId, syncSettings, SyncSettingsEnum.SYNC_MUSIC, bucketRepo, db);

                    settingsRepo.update(settingsId, getDateTime());
                } catch (Exception e) {
                    Log.d(DEBUG_TAG, "sync error: " + e.getMessage());
                }

                return null;
            }

            @Override
            protected void onPostExecute(Object o) {
                Intent syncIntent = new Intent(SynchronizationSchedulerJobService.this, SynchronizationService.class);
                syncIntent.setAction(SynchronizationService.ACTION_SYNC);
                SynchronizationSchedulerJobService.this.startService(syncIntent);
                jobFinished(job, true);
            }
        };

        mBackgroundTask.execute();
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters job) {
        if(mBackgroundTask != null)
            mBackgroundTask.cancel(true);
        return true;
    }

    private final static String DEBUG_TAG = "SYNCHRONIZATION DEBUG";

    private void syncFolder(String settingsId, int syncSettings, SyncSettingsEnum syncEnum, BucketRepository bucketRepo, SQLiteDatabase db) {
        if(syncEnum != SyncSettingsEnum.SYNC_DOCUMENTS
                && syncEnum != SyncSettingsEnum.SYNC_MUSIC
                && syncEnum != SyncSettingsEnum.SYNC_MOVIES
                && syncEnum != SyncSettingsEnum.SYNC_PHOTOS) {
            return;
        }

        if(bucketRepo == null) {
            return;
        }

        int syncValue = syncEnum.getValue();
        String bucketName = syncEnum.getBucketName();

        BucketDbo dbo = bucketRepo.get(BucketContract._NAME, bucketName);
        boolean dboIsNotNull = dbo != null;
        boolean isSyncOn = (syncSettings & syncValue) == syncValue;

        if(isSyncOn && dboIsNotNull)
            _syncFolder(syncEnum.geetFolderUri(), dbo.getId(), settingsId, syncSettings, db);
        else
            Log.d(DEBUG_TAG, "sync: " + "Settings for " + bucketName + " - " + " Dbo: " + dboIsNotNull + ", Sync settings: " + isSyncOn);
    }

    private void _syncFolder(String folderUri, String bucketId, String settingsId, int syncSettings, SQLiteDatabase db) {
        Log.d(DEBUG_TAG, "sync: " + "Start sync of " + folderUri + " and " + bucketId);
        File folder = new File(folderUri);

        if(!folder.exists() || !folder.isDirectory()) {
            Log.d(DEBUG_TAG, "sync: " + "File not exist or is not a directory");
            return;
        }

        File[] files = folder.listFiles();

        FileRepository fileRepo = new FileRepository(db);
        SyncQueueRepository syncRepo = new SyncQueueRepository(db);

        for(File file : files) {
            Log.d(DEBUG_TAG, "sync: " + "File, name: " + file.getName());
            if (file.isDirectory()) {
                Log.d(DEBUG_TAG, "sync: " + "File is directory continue");
                continue;
            }

            FileDbo fileDbo = fileRepo.get(file.getName(), FileContract._NAME, bucketId);
            SyncQueueEntryModel syncEntry = syncRepo.get(file.getPath(), bucketId);

            if (fileDbo == null && syncEntry == null) {
                syncFile(file.getName(), file.getPath(), bucketId, db);
            }
        }
    }

    private void syncFile(String fileName, String localPath, String bucketId, SQLiteDatabase db) {
        SyncQueueRepository syncRepo = new SyncQueueRepository(db);

        SyncQueueEntryDbo dbo = new SyncQueueEntryDbo(fileName, localPath, bucketId);
        Response response = syncRepo.insert(dbo.toModel());
    }

    private String getDateTime() {
        SimpleDateFormat dateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss", Locale.getDefault());
        Date date = new Date();
        return dateFormat.format(date);
    }
}
