import { NativeModules, Platform } from 'react-native';
const SharedPreferencesModule = NativeModules.SharedPreferencesModule;
export default class PreferencesUtil {
    static putString(key, value) {
        if (Platform.OS === 'android') {
            SharedPreferencesModule.putString(key, value);
        }
    }
    static putBoolean(key, value) {
        if (Platform.OS === 'android') {
            SharedPreferencesModule.putBoolean(key, value);
        }
    }
    static putInt(key, value) {
        if (Platform.OS === 'android') {
            SharedPreferencesModule.putInt(key, value);
        }
    }
    static putFloat(key, value) {
        if (Platform.OS === 'android') {
            SharedPreferencesModule.putFloat(key, value);
        }
    }
    static putLong(key, value) {
        if (Platform.OS === 'android') {
            SharedPreferencesModule.putLong(key, value);
        }
    }
}
//# sourceMappingURL=preferences-util.js.map