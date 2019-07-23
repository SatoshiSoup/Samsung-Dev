package com.satoshisoup.storjlibmodule.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import io.storj.libstorj.Keys;

/**
 * Created by Crawter on 22.02.2018.
 */

public class KeyModel implements IStorjModel {
    @Expose
    @SerializedName("apiKey")
    private String _apiKey;

    @Expose
    @SerializedName("encryptionKey")
    private String _encryptionKey;


    public KeyModel(String apiKey, String encryptionKey) {
        _apiKey = apiKey;
        _encryptionKey = encryptionKey;
    }

    public KeyModel(Keys key) {
        _apiKey = key.getApiKey();
        _encryptionKey = key.getEncryptionContext();
    }

    public boolean isValid() {
        return  _apiKey != null && !_apiKey.isEmpty() &&
        _encryptionKey != null && !_encryptionKey.isEmpty();

    }

    public String getApikey() {
        return _apiKey;
    }
    public String getEncryptionKey() {
        return _encryptionKey;
    }
}
