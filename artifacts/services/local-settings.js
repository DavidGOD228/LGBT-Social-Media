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
import LocalSettingsModel from '../models/local-settings';
import CacheRepository from '../repositories/base/impl/cache';
import { injectable } from 'inversify';
import { listener, onEvent } from '../annotations/event';
import { EVENTS } from '../configs/dicts';
import eventEmitter from '../utils/event-emitter';
import PreferencesUtil from '../utils/preferences-util';
const IS_TERMS_ACCEPTED = 'IS_TERMS_ACCEPTED';
const IS_ANY_ACCOUNT_EXIST = 'IS_ANY_ACCOUNT_EXIST';
const SESSION_TOKEN = 'SESSION_TOKEN';
const GETTING_STARTED = 'GETTING_STARTED';
const CURRENT_PROFILE_ID = 'CURRENT_PROFILE_ID';
const USER_METRICS = 'USER_METRICS';
const ALERTS_ALL_TURNED_ON = 'ALERTS_ALL_TURNED_ON';
const ALERTS_NOTIFICATIONS_TURNED_ON = 'ALERTS_NOTIFICATIONS_TURNED_ON';
const ALERTS_SOUND_TURNED_ON = 'ALERTS_SOUND_TURNED_ON';
const ALERTS_VIBRATE_TURNED_ON = 'ALERTS_VIBRATE_TURNED_ON';
const QUIET_HOURS_TURNED_ON = 'QUIET_HOURS_TURNED_ON';
const QUIET_HOURS_START = 'QUIET_HOURS_START';
const QUIET_HOURS_END = 'QUIET_HOURS_END';
const TIME_LIMIT_TURNED_ON = 'TIME_LIMIT_TURNED_ON';
const TIME_LIMIT_DAILY_WEEKLY = 'TIME_LIMIT_DAILY_WEEKLY';
const TIME_LIMIT_HOURS = 'TIME_LIMIT_HOURS';
const TIME_LEFT_IN_MS = 'TIME_LEFT_IN_MS';
const LAST_TRACKED_DATE = 'LAST_TRACKED_DATE';
const TIME_LIMIT_PREWARNING_SHOWN = 'TIME_LIMIT_PREWARNING_SHOWN';
const TIME_LIMIT_FINALWARNING_SHOWN = 'TIME_LIMIT_FINALWARNING_SHOWN';
const PHOTOS_IN_SWITCHER_TURNED_ON = 'PHOTOS_IN_SWITCHER_TURNED_ON';
const SAFE_FOR_WORK_ON = 'SAFE_FOR_WORK_ON';
const SAFE_FOR_WORK_TIME_START = 'SAFE_FOR_WORK_TIME_START';
const SAFE_FOR_WORK_TIME_END = 'SAFE_FOR_WORK_TIME_END';
const SAFE_FOR_WORK_LOCATION = 'LOCATION_SAFE_FOR_WORK';
const LOCATION_PERMISSION_DENIED = 'LOCATION_PERMISSION_DENIED';
const EXPLORE_ENABLED = 'EXPLORE_ENABLED';
const EXPLORE_LOCATION = 'EXPLORE_LOCATION';
let LocalSettingsService = class LocalSettingsService extends DefaultBaseService {
    constructor() {
        super(...arguments);
        this.updateSafeForWorkLocation = (location) => {
            return this.saveValue(SAFE_FOR_WORK_LOCATION, JSON.stringify(location));
        };
        this.setExploreLocation = (location) => {
            return this.saveValue(EXPLORE_LOCATION, JSON.stringify(location));
        };
        this.updateLocationPermissionDenied = (denied) => {
            const value = denied ? 'yes' : 'no';
            return this.saveValue(LOCATION_PERMISSION_DENIED, value);
        };
        this.getLocationPermissionDenied = () => __awaiter(this, void 0, void 0, function* () {
            const val = yield this.getValue(LOCATION_PERMISSION_DENIED);
            return val === 'yes';
        });
    }
    isTermsAccepted() {
        return this.isCheck(IS_TERMS_ACCEPTED);
    }
    acceptTerms() {
        return this.setCheck(IS_TERMS_ACCEPTED);
    }
    isGettingStartedShowed() {
        return this.isCheck(GETTING_STARTED);
    }
    gettingStartedShow() {
        return this.setCheck(GETTING_STARTED);
    }
    isAnyAccountExist() {
        return this.isCheck(IS_ANY_ACCOUNT_EXIST);
    }
    accountExist() {
        return this.setCheck(IS_ANY_ACCOUNT_EXIST);
    }
    saveSession(session) {
        return this.setCheck(SESSION_TOKEN, session);
    }
    getSession() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getByPrimary(SESSION_TOKEN)).value;
        });
    }
    getUserMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const metric = yield this.getValue(USER_METRICS);
            return metric ? metric : 'Imperial';
        });
    }
    setUserMetrics(metrics) {
        return this.saveValue(USER_METRICS, metrics);
    }
    isAlertsAllTurnedOn() {
        return this.isCheck(ALERTS_ALL_TURNED_ON);
    }
    setAlertsAllTurnedOn(val) {
        return this.setCheck(ALERTS_ALL_TURNED_ON, val === true ? 'yes' : 'no');
    }
    isAlertsNotificationsTurnedOn() {
        return this.isCheck(ALERTS_NOTIFICATIONS_TURNED_ON);
    }
    setAlertsNotificationsTurnedOn(val) {
        PreferencesUtil.putBoolean(ALERTS_NOTIFICATIONS_TURNED_ON, val);
        return this.setCheck(ALERTS_NOTIFICATIONS_TURNED_ON, val === true ? 'yes' : 'no');
    }
    isAlertsSoundTurnedOn() {
        return this.isCheck(ALERTS_SOUND_TURNED_ON);
    }
    setAlertsSoundTurnedOn(val) {
        PreferencesUtil.putBoolean(ALERTS_SOUND_TURNED_ON, val);
        return this.setCheck(ALERTS_SOUND_TURNED_ON, val === true ? 'yes' : 'no');
    }
    isAlertsVibrateTurnedOn() {
        return this.isCheck(ALERTS_VIBRATE_TURNED_ON);
    }
    setAlertsVibrateTurnedOn(val) {
        return this.setCheck(ALERTS_VIBRATE_TURNED_ON, val === true ? 'yes' : 'no');
    }
    isQuietHoursTurnedOn() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getValue(QUIET_HOURS_TURNED_ON)) === 'yes';
        });
    }
    setQuietHoursTurnedOn(val) {
        PreferencesUtil.putBoolean(QUIET_HOURS_TURNED_ON, val);
        return this.setCheck(QUIET_HOURS_TURNED_ON, val === true ? 'yes' : 'no');
    }
    setQuietHoursStart(time) {
        const timeObj = JSON.parse(time);
        PreferencesUtil.putInt('QUIET_HOURS_START_HOURS', timeObj.hours);
        PreferencesUtil.putInt('QUIET_HOURS_START_MINUTES', timeObj.minutes);
        return this.saveValue(QUIET_HOURS_START, time);
    }
    getQuietHoursStart() {
        return this.getValue(QUIET_HOURS_START);
    }
    setQuietHoursEnd(time) {
        const timeObj = JSON.parse(time);
        PreferencesUtil.putInt('QUIET_HOURS_END_HOURS', timeObj.hours);
        PreferencesUtil.putInt('QUIET_HOURS_END_MINUTES', timeObj.minutes);
        return this.saveValue(QUIET_HOURS_END, time);
    }
    getQuietHoursEnd() {
        return this.getValue(QUIET_HOURS_END);
    }
    isTimeLimitTurnedOn() {
        return this.isCheck(TIME_LIMIT_TURNED_ON);
    }
    setTimeLimitTurnedOn(val) {
        if (val) {
            eventEmitter.emit(EVENTS.shouldStartTracking);
        }
        return this.setCheck(TIME_LIMIT_TURNED_ON, val === true ? 'yes' : 'no');
    }
    getTimeLimitDailyWeekly() {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.getValue(TIME_LIMIT_DAILY_WEEKLY);
            return type ? type : 'Daily';
        });
    }
    setTimeLimitDailyWeekly(val) {
        return this.saveValue(TIME_LIMIT_DAILY_WEEKLY, val);
    }
    getTimeLimitHours() {
        return __awaiter(this, void 0, void 0, function* () {
            const hours = yield this.getValue(TIME_LIMIT_HOURS);
            return hours ? +hours : 0;
        });
    }
    setTimeLimitHours(hours) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setTimeLeft(hours * 60 * 60 * 1000);
            yield this.setTimeLimitFinalWarningShown(false);
            yield this.setTimeLimitPrewarningShown(false);
            if (yield this.isTimeLimitTurnedOn()) {
                eventEmitter.emit(EVENTS.shouldStartTracking);
            }
            return this.saveValue(TIME_LIMIT_HOURS, hours.toString());
        });
    }
    getTimeLeft() {
        return this.getValue(TIME_LEFT_IN_MS);
    }
    setTimeLeft(time) {
        return this.saveValue(TIME_LEFT_IN_MS, time.toString());
    }
    getLastTrackedDate() {
        return this.getValue(LAST_TRACKED_DATE);
    }
    setLastTrackedDate(date) {
        return this.saveValue(LAST_TRACKED_DATE, date.toString());
    }
    getTimeLimitPrewarningShown() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getValue(TIME_LIMIT_PREWARNING_SHOWN)) === 'yes';
        });
    }
    setTimeLimitPrewarningShown(val) {
        return this.saveValue(TIME_LIMIT_PREWARNING_SHOWN, val ? 'yes' : 'no');
    }
    getTimeLimitFinalWarningShown() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getValue(TIME_LIMIT_FINALWARNING_SHOWN)) === 'yes';
        });
    }
    setTimeLimitFinalWarningShown(val) {
        return this.saveValue(TIME_LIMIT_FINALWARNING_SHOWN, val ? 'yes' : 'no');
    }
    isPhotosInSwitcherTurnedOn() {
        return this.isCheck(PHOTOS_IN_SWITCHER_TURNED_ON);
    }
    setPhotosInSwitcherTurnedOn(val) {
        return this.setCheck(PHOTOS_IN_SWITCHER_TURNED_ON, val === true ? 'yes' : 'no');
    }
    getSafeForWorkTurnedOn() {
        return __awaiter(this, void 0, void 0, function* () {
            const turndedOnString = yield this.getValue(SAFE_FOR_WORK_ON);
            return turndedOnString === 'yes';
        });
    }
    updateSafeForWorkTurnedOn(val) {
        const value = val ? 'yes' : 'no';
        this.saveValue(SAFE_FOR_WORK_ON, value);
    }
    getSafeForWorkTimeStart() {
        return this.getValue(SAFE_FOR_WORK_TIME_START);
    }
    updateSafeForWorkTimeStart(time) {
        this.saveValue(SAFE_FOR_WORK_TIME_START, time);
    }
    getSafeForWorkTimeEnd() {
        return this.getValue(SAFE_FOR_WORK_TIME_END);
    }
    updateSafeForWorkTimeEnd(time) {
        this.saveValue(SAFE_FOR_WORK_TIME_END, time);
    }
    getSafeForWorkLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const locationString = yield this.getValue(SAFE_FOR_WORK_LOCATION);
            if (!!locationString) {
                return JSON.parse(locationString);
            }
            return null;
        });
    }
    getExploreEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const turnedOnString = yield this.getValue(EXPLORE_ENABLED);
            return turnedOnString === 'yes';
        });
    }
    setExploreEnabled(val) {
        const value = val ? 'yes' : 'no';
        return this.saveValue(EXPLORE_ENABLED, value);
    }
    getExploreLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const locationString = yield this.getValue(EXPLORE_LOCATION);
            if (!!locationString) {
                return JSON.parse(locationString);
            }
            return null;
        });
    }
    saveValue(name, value) {
        return this.setCheck(name, value);
    }
    getValue(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getByPrimary(name)).value;
        });
    }
    saveCurrentProfileId(profileId) {
        return this.setCheck(CURRENT_PROFILE_ID, profileId);
    }
    getCurrentProfileId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getByPrimary(CURRENT_PROFILE_ID)).value;
        });
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            const TURNED_ON_BY_DEFAULT = [
                ALERTS_NOTIFICATIONS_TURNED_ON,
                ALERTS_SOUND_TURNED_ON,
                ALERTS_ALL_TURNED_ON,
                ALERTS_VIBRATE_TURNED_ON
            ];
            const TURNED_OFF_BY_DEFAULT = [
                PHOTOS_IN_SWITCHER_TURNED_ON,
                QUIET_HOURS_TURNED_ON,
                TIME_LIMIT_TURNED_ON
            ];
            const turn = (settings, value = 'yes') => settings.map((it) => __awaiter(this, void 0, void 0, function* () {
                const alertNotification = yield this.getByPrimary(it);
                if (!alertNotification.value) {
                    return alertNotification.set('value', value)
                        .save();
                }
                return;
            }));
            return Promise.all(turn(TURNED_ON_BY_DEFAULT)
                .concat(turn(TURNED_OFF_BY_DEFAULT, 'no')));
        });
    }
    findByPrimary(name) {
        return this.getRepo()
            .findRecord(`id = "${name}"`);
    }
    createByPrimary(name) {
        return this.getRepo()
            .createRecord()
            .set('id', name);
    }
    getByPrimary(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.findByPrimary(name)) || this.createByPrimary(name);
        });
    }
    isCheck(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.getByPrimary(name);
            return !!check && check.value === 'yes';
        });
    }
    setCheck(name, value = 'yes') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.getByPrimary(name)).set('value', value)
                .save();
        });
    }
};
__decorate([
    onEvent(EVENTS.login),
    onEvent(EVENTS.newAccount),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalSettingsService.prototype, "accountExist", null);
LocalSettingsService = __decorate([
    listener('LocalSettings'),
    injectable()
], LocalSettingsService);
export { LocalSettingsService };
const localSettingsService = new LocalSettingsService(LocalSettingsModel, CacheRepository);
export default localSettingsService;
//# sourceMappingURL=local-settings.js.map