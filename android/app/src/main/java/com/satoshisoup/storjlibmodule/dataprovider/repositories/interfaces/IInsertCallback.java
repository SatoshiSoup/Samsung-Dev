package com.satoshisoup.storjlibmodule.dataprovider.repositories.interfaces;

import android.content.ContentValues;

/**
 * Created by crawt on 3/3/2018.
 */

public interface IInsertCallback<T> {
    ContentValues callback();
}
