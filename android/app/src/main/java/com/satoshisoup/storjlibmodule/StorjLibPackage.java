package com.satoshisoup.storjlibmodule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.satoshisoup.storjlibmodule.utils.CameraModule;
import com.satoshisoup.storjlibmodule.utils.OpenFileModule;
import com.satoshisoup.storjlibmodule.utils.Sha256Module;
import com.satoshisoup.storjlibmodule.services.ServiceModule;

/**
 * Created by Yaroslav-Note on 1/4/2018.
 */

public class StorjLibPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new StorjLibModule(reactContext));
        modules.add(new Sha256Module(reactContext));
        modules.add(new FilePickerModule(reactContext));
        modules.add(new ServiceModule(reactContext));
        modules.add(new SyncModule(reactContext));
        modules.add(new CameraModule(reactContext));
        modules.add(new OpenFileModule(reactContext));

        return modules;
    }

}