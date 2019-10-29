package com.ootem.Musl;

import android.app.Application;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactApplication;
import io.realm.react.RealmReactPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.horcrux.svg.SvgPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import im.shimo.react.cookie.CookieManagerPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.musl.reactpackage.NCViewPackage;
import com.musl.reactpackage.SettingsLinkPackage;
import com.musl.reactpackage.SharedPreferencesPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.sbugert.rnadmob.RNAdMobPackage;

import im.shimo.react.cookie.CookieManagerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.realm.react.RealmReactPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;

import java.util.Arrays;
import java.util.List;
// import com.shahenlibrary.RNVideoProcessingPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RealmReactPackage(),
            new RNVersionCheckPackage(),
            new SvgPackage(),
            new ReactNativePushNotificationPackage(),
            new PhotoViewPackage(),
            new MapsPackage(),
            new PickerPackage(),
            new RNI18nPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new FastImageViewPackage(),
            new CookieManagerPackage(),
            new RNAdMobPackage(),
                    new RealmReactPackage(),
                    new RNI18nPackage(),
                    new CookieManagerPackage(),
                    new PickerPackage(),
                    new RNAdMobPackage(),
                    new SvgPackage(),
                    // new ImagePickerPackage(),
                    // new RNVideoProcessingPackage(),
                    new PhotoViewPackage(),
                    new FastImageViewPackage(),
                    new NCViewPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseMessagingPackage(),
                    new SharedPreferencesPackage(),
                    new MapsPackage(),
                    new RNVersionCheckPackage(),
                    new SettingsLinkPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "artifacts/index";
        }
    };

    protected String getJSMainModuleName() {
        return "artifacts/index";
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
