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
import DefaultBaseService from './base/impl/default';
import AccountModel from '../models/account';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import configuration from '../configs/index';
import Fetch from '../utils/fetch';
import { EVENTS } from '../configs/dicts';
import { listener, onEvent, promiseEmit } from '../annotations/event';
import Cookie from 'react-native-cookie';
import { lazy } from '../annotations/inversify';
import { LocalSettingsService } from './local-settings';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { ProfileService } from './profile';
import Restrictions from '../lib/smart-criteria/restrictions';
import SafeForWork from '../utils/safe-for-work';
import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
import serviceRegistry from './base/-registry';
const SettingsLinkModule = NativeModules.SettingsLinkModule;
let AccountService = AccountService_1 = class AccountService extends DefaultBaseService {
    constructor() {
        super(...arguments);
        this.forceLocationUpdate = () => {
            this.reportCurrentPosition(true);
        };
        this.initCheck = () => __awaiter(this, void 0, void 0, function* () {
            this.forceLocationUpdate();
        });
        this.onFailedToUpdatePosition = (error) => {
            console.log('onFailedToUpdatePosition', error);
            if (error.code === error.PERMISSION_DENIED) {
                return;
            }
        };
        this.isLocationPermissionDenied = () => __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                return yield this.isLocationPermissionDeniedAndroid();
            }
            return this.isLocationPermissionDeniedIOS();
        });
        this.isLocationPermissionDeniedIOS = () => {
            return new Promise((resolve) => {
                resolve('approved');
                navigator.geolocation.getCurrentPosition(pos => {
                    console.log(pos);
                }, error => {
                    if (error.code === error.PERMISSION_DENIED) {
                        resolve('denied');
                        return;
                    }
                    if (error.code === error.POSITION_UNAVAILABLE) {
                        resolve('serviceTurnedOff');
                        return;
                    }
                    resolve('approved');
                }, {
                    enableHighAccuracy: false
                });
            });
        };
        this.isLocationPermissionDeniedAndroid = () => __awaiter(this, void 0, void 0, function* () {
            let serviceAvailable = false;
            try {
                serviceAvailable = yield SettingsLinkModule.isLocationServicesEnabled();
            }
            catch (e) {
                console.log('Failed to obtain location service', e.getMessage());
            }
            if (!serviceAvailable) {
                return 'serviceTurnedOff';
            }
            const granted = yield PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            return granted ? 'approved' : 'denied';
        });
    }
    static geoLocationReport({ coords }) {
        return Fetch.put(configuration.remoteApi.base + '/geo-locations', coords);
    }
    createNew(email, password) {
        return this.getRepo()
            .createRecord()
            .set('email', email)
            .set('password', password)
            .save()
            .catch((error) => __awaiter(this, void 0, void 0, function* () {
            error = yield error.json();
            throw { email: [error.errors.Error] };
        }));
    }
    login(username, password) {
        return Fetch.post(configuration.remoteApi.common + '/login', {
            username,
            password
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            // await this.profileService.restoreActive()
            // await Promise.all(serviceRegistry.values()
            //   .map(it => it.preload()))
            return res;
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () {
            const parsed = yield error.json();
            throw { server: [parsed.message] };
        }));
    }
    saveLoginData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.restoreActive();
            yield Promise.all(serviceRegistry.values()
                .map(it => it.preload()));
        });
    }
    logout() {
        return Fetch.get(configuration.remoteApi.common + '/logout')
            .catch(() => Promise.resolve());
    }
    resendConfirmation(email) {
        return Fetch.post(configuration.remoteApi.base + '/accounts/resend', {
            email
        })
            .catch(error => console.log(error));
    }
    getCurrent() {
        return this.getRepo()
            .findByPrimary('me');
    }
    deleteCurrent() {
        return Fetch.delete(configuration.remoteApi.base + '/accounts/me')
            .catch(error => console.log(error));
    }
    saveAuthToken() {
        return Cookie.get(configuration.remoteApi.common, 'SESSION')
            .then(session => this.localSettingsService.saveSession(session));
    }
    restoreAuthToken() {
        return this.localSettingsService.getSession()
            .then(session => Cookie.set(configuration.remoteApi.common, 'SESSION', session));
    }
    isLogged() {
        return this.getCurrent()
            .catch(() => false);
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                try {
                    const granted = yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                        title: 'MUSL needs location permission',
                        message: 'MUSL needs access to your location to provide best experience'
                    });
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.subscribeForGeoLocationChanges();
                    }
                    else {
                        throw new Error('Location not available');
                    }
                }
                catch (err) {
                    console.warn(err);
                }
            }
            else {
                this.subscribeForGeoLocationChanges();
            }
            setInterval(this.initCheck, 15000);
        });
    }
    getByEmail(email) {
        const query = new Query();
        query.add(Restrictions.equal('email', email));
        return this.getRepo()
            .findRecord(query);
    }
    getByProfile(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeProfile = yield this.getRepo()
                .peekRecord(`profiles.id = ${profileId}`);
            if (maybeProfile) {
                return maybeProfile;
            }
            const query = new Query();
            query.add(Restrictions.contain('profiles.id', profileId));
            return this.getRepo()
                .findRecord(query);
        });
    }
    onPositionUpdated(position, forceUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const REPORTING_DISTANCE_THRESHOLD = 50; // meters
            let location;
            try {
                location = JSON.parse(yield this.localSettingsService.getValue('LOCATION'));
            }
            catch (err) {
                console.log('location', err);
            }
            const lastKnownLatitude = (location && location.latitude) || 0;
            const lastKnownLongitude = (location && location.longitude) || 0;
            const distance = this.distanceInMetersBetweenEarthCoordinates(lastKnownLatitude, lastKnownLongitude, position.coords.latitude, position.coords.longitude);
            this.saveLocation(position);
            const isSFWEnabled = yield SafeForWork.isFakeLocationEnabled();
            if (isSFWEnabled) {
                const fakeLocation = yield this.localSettingsService.getSafeForWorkLocation();
                if (fakeLocation) {
                    AccountService_1.geoLocationReport(Object.assign({}, position, { coords: Object.assign({}, position.coords, { latitude: fakeLocation.latitude, longitude: fakeLocation.longitude }) }));
                    return;
                }
            }
            if (distance > REPORTING_DISTANCE_THRESHOLD || forceUpdate) {
                AccountService_1.geoLocationReport(position);
            }
        });
    }
    resetPassword(email) {
        return Fetch.post(configuration.remoteApi.base + '/accounts/reset-password-email', {
            email
        });
    }
    reportCurrentPosition(forceUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                const locationGranted = yield PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!locationGranted) {
                    return;
                }
            }
            try {
                navigator.geolocation.getCurrentPosition(pos => this.onPositionUpdated(pos, forceUpdate), this.onFailedToUpdatePosition, {
                    enableHighAccuracy: false
                });
            }
            catch (error) {
                console.log('geolocation.getCurrentPosition', error);
            }
        });
    }
    subscribeForGeoLocationChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                const locationGranted = yield PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!locationGranted) {
                    return;
                }
            }
            navigator.geolocation.watchPosition(pos => this.onPositionUpdated(pos), this.onFailedToUpdatePosition, {
                enableHighAccuracy: false
            });
        });
    }
    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    distanceInMetersBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371;
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (earthRadiusKm * c) * 1000;
    }
    saveLocation(position) {
        this.localSettingsService.saveValue('LOCATION', JSON.stringify(position.coords));
    }
};
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], AccountService.prototype, "localSettingsService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], AccountService.prototype, "profileService", void 0);
__decorate([
    promiseEmit(EVENTS.newAccount),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountService.prototype, "createNew", null);
__decorate([
    promiseEmit(EVENTS.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountService.prototype, "login", null);
__decorate([
    promiseEmit(EVENTS.logout),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountService.prototype, "logout", null);
__decorate([
    promiseEmit(EVENTS.resendConfirmation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountService.prototype, "resendConfirmation", null);
__decorate([
    onEvent(EVENTS.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountService.prototype, "saveAuthToken", null);
AccountService = AccountService_1 = __decorate([
    injectable(),
    listener('Account'),
    mixin([LogoutClearable])
], AccountService);
export { AccountService };
const accountService = new AccountService(AccountModel);
export default accountService;
var AccountService_1;
//# sourceMappingURL=account.js.map