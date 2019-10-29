package com.musl.module;

import android.content.Context;
import android.content.SharedPreferences;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by talapbekov on 10/12/17.
 */

public class SharedPreferencesModule extends ReactContextBaseJavaModule {

    public static final String PREFERENCES = "DEFAULT";
    public static final String QUIET_HOURS_STATUS = "QUIET_HOURS_TURNED_ON";
    public static final String QUIET_HOURS_START_HOURS = "QUIET_HOURS_START_HOURS";
    public static final String QUIET_HOURS_START_MINUTES = "QUIET_HOURS_START_MINUTES";
    public static final String QUIET_HOURS_END_HOURS = "QUIET_HOURS_END_HOURS";
    public static final String QUIET_HOURS_END_MINUTES = "QUIET_HOURS_END_MINUTES";
    public static final String SETTINGS_ALERTS_NOTIFICATION_ENABLED = "ALERTS_NOTIFICATIONS_TURNED_ON";
    public static final String SETTINGS_ALERTS_SOUND_TURNED_ON = "ALERTS_SOUND_TURNED_ON";

    public SharedPreferencesModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SharedPreferencesModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(QUIET_HOURS_STATUS, QUIET_HOURS_STATUS);
        constants.put(QUIET_HOURS_START_HOURS, QUIET_HOURS_START_HOURS);
        constants.put(QUIET_HOURS_START_MINUTES, QUIET_HOURS_START_MINUTES);
        constants.put(QUIET_HOURS_END_HOURS, QUIET_HOURS_END_HOURS);
        constants.put(QUIET_HOURS_END_MINUTES, QUIET_HOURS_END_MINUTES);
        constants.put(SETTINGS_ALERTS_NOTIFICATION_ENABLED, SETTINGS_ALERTS_NOTIFICATION_ENABLED);
        constants.put(SETTINGS_ALERTS_SOUND_TURNED_ON, SETTINGS_ALERTS_SOUND_TURNED_ON);
        return constants;
    }

    @ReactMethod
    public void putString(String key, String val) {
        SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        prefs.edit().putString(key, val).apply();
    }

    @ReactMethod
    public void putBoolean(String key, boolean val) {
        SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        prefs.edit().putBoolean(key, val).apply();
    }

    @ReactMethod
    public void putInt(String key, int val) {
        SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        prefs.edit().putInt(key, val).apply();
    }

    @ReactMethod
    public void putFloat(String key, float val) {
        SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        prefs.edit().putFloat(key, val).apply();
    }

    @ReactMethod
    public void putLong(String key, long val) {
        SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        prefs.edit().putLong(key, val).apply();
    }


}
