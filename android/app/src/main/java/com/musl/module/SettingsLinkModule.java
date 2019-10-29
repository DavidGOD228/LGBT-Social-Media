package com.musl.module;

import android.content.Intent;
import android.net.Uri;
//import android.support.annotation.NonNull;
import androidx.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.LocationSettingsStatusCodes;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import static android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS;
import static android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS;

/**
 * Created on 10/25/17.
 */

public class SettingsLinkModule extends ReactContextBaseJavaModule {

    public SettingsLinkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SettingsLinkModule";
    }

    @ReactMethod
    public void openSettings(Promise promise) {
        if (getCurrentActivity() == null) {
            promise.reject("CURRENT_ACTIVITY_NOT_FOUND", "getCurrentActivity() returned null");
            return;
        }

        Intent intent = new Intent(ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", getCurrentActivity().getPackageName(), null);
        intent.setData(uri);
        try {
            getCurrentActivity().startActivity(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("EXCEPTION", e.getMessage());
        }
    }

    @ReactMethod
    public void isLocationServicesEnabled(final Promise promise) {
        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
        builder.addLocationRequest(locationRequest);

        Task<LocationSettingsResponse> task =
                LocationServices.getSettingsClient(getCurrentActivity()).checkLocationSettings(builder.build());


        task.addOnCompleteListener(new OnCompleteListener<LocationSettingsResponse>() {
            @Override
            public void onComplete(@NonNull Task<LocationSettingsResponse> task) {
                try {
                    LocationSettingsResponse response = task.getResult(ApiException.class);
                    Log.d("SettingsLinkModule", "available");
                    promise.resolve(true);
                } catch (ApiException exception) {
                    switch (exception.getStatusCode()) {
                        case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
                            promise.resolve(false);
                            break;
                        case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
                            Log.d("SettingsLinkModule", "Location settings are not satisfied. However, we have no way to fix");
                            promise.reject("Location settings are not available", "Location settings are not satisfied. However, we have no way to fix");
                            break;
                    }
                }
            }
        });
    }

    @ReactMethod
    public void openPhoneLocationSettings(Promise promise) {
        if (getCurrentActivity() == null) {
            promise.reject("CURRENT_ACTIVITY_NOT_FOUND", "getCurrentActivity() returned null");
            return;
        }

        Intent intent = new Intent(ACTION_LOCATION_SOURCE_SETTINGS);
        try {
            getCurrentActivity().startActivity(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("EXCEPTION", e.getMessage());
        }
    }
}
