package com.satoshisoup.storjlibmodule.services.callbacks;

import android.database.sqlite.SQLiteDatabase;

import io.storj.libstorj.File;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.UploadingFileContract;
import com.satoshisoup.storjlibmodule.dataprovider.dbo.UploadingFileDbo;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.UploadingFilesRepository;
import com.satoshisoup.storjlibmodule.models.UploadingFileModel;
import com.satoshisoup.storjlibmodule.utils.ProgressResolver;
import com.satoshisoup.storjlibmodule.utils.Uploader;

public class BaseUploaderCallback implements Uploader.Callback {
    private UploadingFilesRepository mUploadingRepo;
    private ProgressResolver mProgressResolver;
    private UploadingFileDbo mDbo;
    private final Object lock = new Object();

    protected long mFileHandle;

    public BaseUploaderCallback(SQLiteDatabase db) {
        mUploadingRepo = new UploadingFilesRepository(db);
        mProgressResolver = new ProgressResolver();
    }

    @Override
    public void onStart(long fileHandle, String bucketId, String fileName, String localPath) {
        synchronized (lock) {
            mDbo = new UploadingFileDbo(fileHandle, fileName, localPath, bucketId);
        }

        mFileHandle = fileHandle;
        mUploadingRepo.insert(new UploadingFileModel(mDbo));
    }

    @Override
    public boolean onProgress(String localPath, double progress, long uploadedBytes, long totalBytes) {
        synchronized (lock) {
            if(mDbo == null || !mDbo.isIdSet()) {
                return false;
            }
        }

        synchronized (mProgressResolver) {
            mProgressResolver.setMProgress(progress);

            if(mProgressResolver.getMProgress() != progress) {
                return false;
            }

            mDbo.setProp(UploadingFileContract._PROGRESS, mProgressResolver.getMProgress());
            mDbo.setProp(UploadingFileContract._UPLOADED, uploadedBytes);
            mDbo.setProp(UploadingFileContract._SIZE, totalBytes);
        }

        mUploadingRepo.update(new UploadingFileModel(mDbo));
        return true;
    }

    @Override
    public void onComplete(String localPath, File file) {
        mUploadingRepo.delete(mDbo.getId());
    }

    @Override
    public void onError(String localPath, int code, String message) {
        mUploadingRepo.delete(mDbo.getId());
    }
}
