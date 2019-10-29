var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import es6_symbol from 'es6-symbol/implement';
import { AppRegistry, Linking } from 'react-native';
import ContainerComponent from './container';
import VersionCheck from 'react-native-version-check';
import configuration from './configs/index';
VersionCheck.setAppID(configuration.appStore.APP_ID);
VersionCheck.setAppName(configuration.appStore.APP_NAME);
VersionCheck.needUpdate()
    .then((res) => __awaiter(this, void 0, void 0, function* () {
    if (res.isNeeded) {
        return Linking.openURL(yield VersionCheck.getStoreUrl());
    }
}));
console.log(es6_symbol);
AppRegistry.registerComponent('Musl', () => ContainerComponent);
//# sourceMappingURL=index.js.map