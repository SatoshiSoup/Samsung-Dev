package com.satoshisoup.storjlibmodule.services.handlers;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import com.satoshisoup.storjlibmodule.dataprovider.DatabaseFactory;
import com.satoshisoup.storjlibmodule.dataprovider.repositories.UploadingFilesRepository;
import com.satoshisoup.storjlibmodule.models.UploadingFileModel;
import com.satoshisoup.storjlibmodule.services.UploadService;
import com.satoshisoup.storjlibmodule.utils.Uploader;

public class CancelHandler extends Handler {

    private Context mContext;

    public final static String PARAM_FILE_HANDLE = "fileHandle";

    public CancelHandler(Looper looper, Context context) {
        super(looper);
        mContext = context;
    }

    @Override
    public void handleMessage(Message msg) {
        Bundle data = msg.getData();
        long fileHandle = data.getLong(PARAM_FILE_HANDLE);

        try(SQLiteDatabase db = new DatabaseFactory(mContext, null).getWritableDatabase()) {
            UploadingFilesRepository uploadRepo = new UploadingFilesRepository(db);
            UploadingFileModel model = uploadRepo.get(String.valueOf(fileHandle));

            if(model != null) {
                Uploader uploader = new Uploader(mContext, null);
                boolean result = uploader.cancelFileUpload(fileHandle);
            }

        } catch (Exception e) {
            String message = e.getMessage();
        }
    }
}
