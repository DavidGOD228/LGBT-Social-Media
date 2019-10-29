import {
  NativeModules,
  Platform
} from 'react-native'

const SharedPreferencesModule = NativeModules.SharedPreferencesModule

export default class PreferencesUtil {

  static putString(key: string, value: string) {
    if (Platform.OS === 'android') {
      SharedPreferencesModule.putString(key, value)
    }
  }

  static putBoolean(key: string, value: boolean) {
    if (Platform.OS === 'android') {
      SharedPreferencesModule.putBoolean(key, value)
    }
  }

  static putInt(key: string, value: number) {
    if (Platform.OS === 'android') {
      SharedPreferencesModule.putInt(key, value)
    }
  }

  static putFloat(key: string, value: number) {
    if (Platform.OS === 'android') {
      SharedPreferencesModule.putFloat(key, value)
    }
  }

  static putLong(key: string, value: number) {
    if (Platform.OS === 'android') {
      SharedPreferencesModule.putLong(key, value)
    }
  }
}
