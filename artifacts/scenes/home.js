var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import bootstrap from '../initializers/bootstrap';
import { Image, StyleSheet, View } from 'react-native';
import { LocalSettingsService } from '../services/local-settings';
import { lazy } from '../annotations/inversify';
import { AccountService } from '../services/account';
import { NavigationActions } from 'react-navigation';
import BaseScreenDefault from './base/base-scene';
import serviceRegistry from '../services/base/-registry';
export default class HomeScreen extends BaseScreenDefault {
    constructor() {
        super(...arguments);
        this.onMount = () => __awaiter(this, void 0, void 0, function* () {
            yield bootstrap();
            if (!(yield this.localSettingsService.isTermsAccepted())) {
                this.navigateBlank('terms');
                return;
            }
            yield this.checkForLoggedAccount();
        });
        this.checkForLoggedAccount = () => __awaiter(this, void 0, void 0, function* () {
            yield this.accountService.restoreAuthToken();
            // console.log(await this.accountService.isLogged(), 'this.accountService.isLogged()')
            // await this.accountService.isLogged().then(profile => {
            //   if (profile) {
            //     console.log(profile, "PROFILE========================")
            //     this.accountService.createAccountInRepo(profile)
            //     // this.localSettingsService.saveCurrentProfile(profile).then(profileNew => {
            //     //   console.log(this.accountService.isLogged(), 'this.accountService.isLogged() 22222-2-2-2-2-2--2')
            //     //
            //     // })
            //   }
            // })
            if (yield this.accountService.isLogged()) {
                this.checkForLocationPermission();
                return;
            }
            this.checkForAccountExist();
        });
        this.checkForLocationPermission = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(serviceRegistry.values().map(it => it.preload()));
            if (yield this.localSettingsService.getLocationPermissionDenied()) {
                this.navigateToSettings('locationPermission');
            }
            else {
                this.navigateBlank('profileHub');
            }
        });
        this.navigateToSettings = (routeName) => __awaiter(this, void 0, void 0, function* () {
            const locationStatus = yield this.accountService.isLocationPermissionDenied();
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                        routeName,
                        params: { status: locationStatus }
                    })],
                key: null
            }));
        });
    }
    componentDidMount() {
        this.onMount();
    }
    checkForAccountExist() {
        if (this.localSettingsService.isAnyAccountExist()) {
            this.navigateBlank('login');
        }
        else {
            this.navigateBlank('registration');
        }
    }
    navigateBlank(routeName) {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })],
            key: null
        }));
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Image, { style: styles.splash, resizeMode: 'cover', source: require('Musl/images/splash.png') })));
    }
}
HomeScreen.navigationOptions = {
    header: null
};
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], HomeScreen.prototype, "localSettingsService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], HomeScreen.prototype, "accountService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    splash: {
        flex: 1,
        height: undefined,
        width: undefined
    }
});
//# sourceMappingURL=home.js.map