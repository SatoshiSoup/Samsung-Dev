package com.satoshisoup.storjlibmodule.services.callbacks;

import android.database.sqlite.SQLiteDatabase;

import io.storj.libstorj.File;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.FileRepository;
import com.satoshisoup.storjlibmodule.enums.DownloadStateEnum;
import com.satoshisoup.storjlibmodule.models.FileModel;
import com.satoshisoup.storjlibmodule.responses.Response;
import com.satoshisoup.storjlibmodule.responses.SingleResponse;
import com.satoshisoup.storjlibmodule.services.eventemitters.UploadEventEmitter;
import com.satoshisoup.storjlibmodule.utils.ThumbnailProcessor;
import com.satoshisoup.storjlibmodule.utils.Uploader;

public class WorkerUploaderCallback extends BaseUploaderCallback {
    private FileRepository mFileRepo;
    protected Uploader.Callback mEventEmitter;
    protected boolean mIsSync;

    public WorkerUploaderCallback(SQLiteDatabase db, Uploader.Callback eventEmitter, boolean isSync) {
        super(db);
        mFileRepo = new FileRepository(db);
        mEventEmitter = eventEmitter;
        mIsSync = isSync;

        if(eventEmitter == null) {
            mEventEmitter = new UploadEventEmitter();
        }
    }

    @Override
    public void onStart(long fileHandle, String bucketId, String fileName, String localPath) {
        super.onStart(fileHandle, bucketId, fileName, localPath);
        mEventEmitter.onStart(fileHandle, bucketId, fileName, localPath);
    }

    @Override
    public boolean onProgress(String localPath, double progress, long uploadedBytes, long totalBytes) {
        boolean result = super.onProgress(localPath, progress, uploadedBytes, totalBytes);

        if(result) {
            mEventEmitter.onProgress(localPath, progress, uploadedBytes, totalBytes);
        }

        return result;
    }

    @Override
    public void onComplete(String localPath, File file) {
        super.onComplete(localPath, file);

        ThumbnailProcessor tProc = new ThumbnailProcessor(mFileRepo);
        String thumbnail = null;

        if(file.getMimeType().contains("image/")) {
            SingleResponse resp = tProc.getThumbbnail(localPath);

            if(resp.isSuccess())
                thumbnail = resp.getResult();
        }

        FileModel fileModel = new FileModel(
                file,
                mIsSync,
                DownloadStateEnum.DOWNLOADED.getValue(),
                localPath,
                thumbnail);

        Response response = mFileRepo.insert(fileModel);
        mEventEmitter.onComplete(localPath, file);
    }

    @Override
    public void onError(String localPath, int code, String message) {
        super.onError(localPath, code, message);
        mEventEmitter.onError(localPath, code, message);
    }
}