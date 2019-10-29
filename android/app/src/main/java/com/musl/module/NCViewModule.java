package com.musl.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Created by talapbekov on 10/9/17.
 */

public class NCViewModule extends ReactContextBaseJavaModule {

    public NCViewModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NCViewModule";
    }

}
