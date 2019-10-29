package com.musl.reactpackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.musl.manager.NCViewManager;
import com.musl.module.NCViewModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by talapbekov on 10/9/17.
 */

public class NCViewPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new NCViewModule(reactContext));
        return nativeModules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new NCViewManager());
    }
}