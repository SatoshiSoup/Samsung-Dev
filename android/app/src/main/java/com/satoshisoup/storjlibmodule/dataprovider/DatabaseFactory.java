package com.satoshisoup.storjlibmodule.dataprovider;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.satoshisoup.storjlibmodule.dataprovider.contracts.BucketContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.FileContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.SettingsContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.SynchronizationQueueContract;
import com.satoshisoup.storjlibmodule.dataprovider.contracts.UploadingFileContract;

/**
 * Created by Crawter on 02.03.2018.
 */

public class DatabaseFactory extends SQLiteOpenHelper {

    private static final int DATABASE_VERSION = 1;
    private static final String DATABASE_NAME = "satoshi.db";

    public DatabaseFactory(Context context, SQLiteDatabase.CursorFactory factory) {
        super(context, DATABASE_NAME, factory, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        createTables(db);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        dropTables(db);
        createTables(db);
    }

    @Override
    public void onConfigure(SQLiteDatabase db){
        db.setForeignKeyConstraintsEnabled(true);
    }

    private void createTables(SQLiteDatabase db) {
        //db.execSQL("PRAGMA foreign_keys=ON");
        db.execSQL(BucketContract.createTable());
        db.execSQL(FileContract.createTable());
        db.execSQL(UploadingFileContract.createTable());
        db.execSQL(SettingsContract.createTable());
        db.execSQL(SynchronizationQueueContract.createTable());
    }

    private void dropTables(SQLiteDatabase db) {
        db.execSQL("DROP TABLE IF EXISTS " + BucketContract.TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + FileContract.TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + UploadingFileContract.TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + SettingsContract.TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + SynchronizationQueueContract.TABLE_NAME);
    }
}
