package com.satoshisoup.storjlibmodule.services.callbacks;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.support.v4.app.NotificationCompat;

import io.storj.libstorj.File;
import com.satoshisoup.R;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.SynchronizationQueueContract;
import com.satoshisoup.storjlibmodule.dataprovider.dbo.SyncQueueEntryDbo;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.SyncQueueRepository;
import com.satoshisoup.storjlibmodule.enums.SyncStateEnum;
import com.satoshisoup.storjlibmodule.models.SyncQueueEntryModel;
import com.satoshisoup.storjlibmodule.responses.Response;
import com.satoshisoup.storjlibmodule.services.NotificationService;
import com.satoshisoup.storjlibmodule.services.SynchronizationService;
import com.satoshisoup.storjlibmodule.services.UploadService;
import com.satoshisoup.storjlibmodule.services.eventemitters.BaseEventEmitter;
import com.satoshisoup.storjlibmodule.services.eventemitters.SynchronizationEventEmitter;
import com.satoshisoup.storjlibmodule.utils.Uploader;

public class SyncUploaderCallback extends WorkerUploaderCallback {
    private int mSyncEntryId;
    private SyncQueueRepository mSyncRepo;
    private SyncQueueEntryModel mSyncEntryModel;
    private NotificationService mNotificationService;
    private SynchronizationEventEmitter mSyncEventEmitter;
    private Context mContext;

    public SyncUploaderCallback(Context context, SQLiteDatabase db, Uploader.Callback eventEmitter, NotificationService notificationService, int syncEntryId) {
        super(db, eventEmitter, true);
        mContext = context;
        mSyncEntryId = syncEntryId;
        mSyncRepo = new SyncQueueRepository(db);
        mNotificationService = notificationService;
        mSyncEventEmitter = new SynchronizationEventEmitter((BaseEventEmitter)eventEmitter);
    }

    @Override
    public void onStart(long fileHandle, String bucketId, String fileName, String localPath) {
        super.onStart(fileHandle, bucketId, fileName, localPath);
        mSyncEntryModel = mSyncRepo.get(mSyncEntryId);

        SyncQueueEntryDbo syncEntryDbo = new SyncQueueEntryDbo(mSyncEntryModel);
        syncEntryDbo.setProp(SynchronizationQueueContract._STATUS, SyncStateEnum.PROCESSING.getValue());
        syncEntryDbo.setProp(SynchronizationQueueContract._FILE_HANDLE, fileHandle);

        Response response = mSyncRepo.update(syncEntryDbo.toModel());

        if(response.isSuccess()) {
            mSyncEventEmitter.SyncEntryUpdated(mSyncEntryId);
        }

        mNotificationService.addAction(getNotificationAction("Skip", getCancelUploadIntent()));
        mNotificationService.addAction(getNotificationAction("Cancel", getCancelSyncIntent()));
    }

    @Override
    public boolean onProgress(String localPath, double progress, long uploadedBytes, long totalBytes) {
        if(!super.onProgress(localPath, progress, uploadedBytes, totalBytes)) {
            return false;
        }

        int filesLeftToProcess = mSyncRepo.getActiveCount();
        int totalMb = (int) (totalBytes/1024);
        int uploadedMb = (int) (uploadedBytes/1024);
        String state = "Uploading";

        String message = String.format("%s " + mSyncEntryModel.getFileName() + " %s left", state, filesLeftToProcess);
        String title = "Synchronization";

        mNotificationService.notify(1, message, title, uploadedMb, totalMb);
        return true;
    }

    @Override
    public void onComplete(String localPath, File file) {
        super.onComplete(localPath, file);

        SyncQueueEntryDbo syncEntryDbo = new SyncQueueEntryDbo(mSyncEntryModel);
        syncEntryDbo.setProp(SynchronizationQueueContract._STATUS, SyncStateEnum.PROCESSED.getValue());

        Response response = mSyncRepo.update(syncEntryDbo.toModel());

        if(response.isSuccess()) {
            mSyncEventEmitter.SyncEntryUpdated(mSyncEntryId);
        }
    }

    @Override
    public void onError(String localPath, int code, String message) {
        super.onError(localPath, code, message);

        SyncQueueEntryDbo syncEntryDbo = new SyncQueueEntryDbo(mSyncEntryModel);
        syncEntryDbo.setProp(SynchronizationQueueContract._STATUS, SyncStateEnum.ERROR.getValue());
        syncEntryDbo.setProp(SynchronizationQueueContract._ERROR_CODE, code);

        Response response = mSyncRepo.update(syncEntryDbo.toModel());

        if(response.isSuccess()) {
            mSyncEventEmitter.SyncEntryUpdated(mSyncEntryId);
        }
    }

    private  NotificationCompat.Action getNotificationAction(String title, Intent serviceIntent) {
        return new NotificationCompat.Action(R.mipmap.ic_launcher, title, getServicePendingIntent(serviceIntent));
    }

    private PendingIntent getServicePendingIntent(Intent serviceIntent) {
        return PendingIntent.getService(mContext, 0, serviceIntent, PendingIntent.FLAG_CANCEL_CURRENT);
    }

    private Intent getCancelUploadIntent() {
        Intent cancelUploadIntent = new Intent(mContext, UploadService.class);
        cancelUploadIntent.setAction(UploadService.ACTION_CANCEL_UPLOAD);
        cancelUploadIntent.putExtra(UploadService.PARAM_FILE_HANDLE, mFileHandle);

        return cancelUploadIntent;
    }

    private Intent getCancelSyncIntent() {
        return new Intent(mContext, SynchronizationService.class).setAction(SynchronizationService.ACTION_SYNC_CANCEL);
    }
}