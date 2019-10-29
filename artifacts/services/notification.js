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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import DefaultBaseService from './base/impl/default';
import Query from '../lib/smart-criteria/query';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener, onEvent } from '../annotations/event';
import NotificationModel from '../models/notification';
import { ProfileService } from './profile';
import { lazy } from '../annotations/inversify';
import Restrictions from '../lib/smart-criteria/restrictions';
import { injectable } from 'inversify';
import { MediaRequestService } from './media-request';
import { EVENTS } from '../configs/dicts';
import Fetch from '../utils/fetch';
import configuration from '../configs/index';
import { LocalSettingsService } from './local-settings';
import { AccountService } from './account';
import firebase from '../utils/firebase';
import Time from '../models/time';
import moment from 'moment';
import { RabbitCredentialService } from './rabbit-credential';
import eventEmitter from '../utils/event-emitter';
import { Alert } from "react-native";
const strategyMap = {
    MESSAGE: (notification, _) => ({
        author: notification.notificationContent.parsedContent.chatMember.profileId,
        action: 'sent you a message'
    }),
    MEDIA_REQUEST: (notification, me) => __awaiter(this, void 0, void 0, function* () {
        const message = notification.notificationContent.parsedContent;
        return {
            author: message.sourceProfileId === me ? message.targetProfileId : message.sourceProfileId,
            action: '',
            mediaRequestId: message.id
        };
    }),
    PROFILE_WAS_VIEWED: (notification, me) => {
        const parsed = notification.notificationContent.parsedContent;
        return {
            author: parsed.sourceProfileId === me ? parsed.targetProfileId : parsed.sourceProfileId,
            action: 'looked at your profile'
        };
    },
    PROFILE_WAS_FAVORITE: (notification, me) => {
        const parsed = notification.notificationContent.parsedContent;
        return {
            author: parsed.sourceProfileId === me ? parsed.targetProfileId : parsed.sourceProfileId,
            action: 'favorited you'
        };
    },
    PROFILE_WAS_FLEXED: (notification, me) => {
        const parsed = notification.notificationContent.parsedContent;
        return {
            author: parsed.sourceProfileId === me ? parsed.targetProfileId : parsed.sourceProfileId,
            action: 'sent you a flex'
        };
    },
    PERMISSION: (notification, _) => ({
        author: notification.notificationContent.parsedContent.chatMember.profileId,
        action: 'sent you a message'
    })
};
const SUPPORTED_TYPES = Object.keys(strategyMap);
const notificationConverter = (notification, me) => strategyMap[notification.type](notification, me);
let NotificationService = class NotificationService extends DefaultBaseService {
    getAll() {
        const activeProfileId = this.profileService.getActiveProfileId();
        const query = new Query();
        query.add(Restrictions.equal('profileId', activeProfileId))
            .add(Restrictions.notEqual('status', 'ARCHIVED'))
            .add(Restrictions.equal('hidden', false))
            .add(Restrictions.contain('type', SUPPORTED_TYPES))
            .setSort(Restrictions.desc('id'));
        return this.getRepo()
            .find(query);
    }
    getUnreadForCurrentProfile() {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getUnreadForProfile(activeProfileId);
    }
    getUnreadForProfile(profileId) {
        const query = new Query();
        query.add(Restrictions.equal('profileId', profileId))
            .add(Restrictions.equal('status', 'UNREAD'))
            .add(Restrictions.equal('hidden', false))
            .add(Restrictions.contain('type', SUPPORTED_TYPES));
        return this.getRepo()
            .find(query);
    }
    getForNotificationScene() {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const notifications = yield this.getAll();
            return Promise.all(notifications.map((it) => __awaiter(this, void 0, void 0, function* () {
                const _a = yield notificationConverter(it, activeProfileId), { author, action } = _a, rest = __rest(_a, ["author", "action"]);
                let newAction;
                const profile = yield this.profileService.getByPrimary(author);
                if (!profile) {
                    throw new Error('no profile');
                }
                // todo: refactor this
                if (rest['mediaRequestId']) {
                    const mediaRequest = yield this.mediaRequestService.getByPrimary(rest['mediaRequestId']);
                    if (mediaRequest) {
                        if (mediaRequest.status === 'APPROVED') {
                            rest['state'] = 'approved';
                        }
                        if (mediaRequest.status === 'REJECTED') {
                            rest['state'] = 'denied';
                        }
                        if (mediaRequest.type === 'OUTBOUND') {
                            if (mediaRequest.status === 'APPROVED') {
                                if (activeProfileId === mediaRequest.targetProfileId) {
                                    newAction = 'You approved access to your photos';
                                }
                                else {
                                    newAction = 'approved access to his photos';
                                }
                            }
                            else if (mediaRequest.status === 'REJECTED') {
                                if (activeProfileId === mediaRequest.targetProfileId) {
                                    newAction = 'You rejected access to your photos';
                                }
                                else {
                                    newAction = 'rejected access to his photos';
                                }
                            }
                            else {
                                if (activeProfileId === mediaRequest.targetProfileId) {
                                    newAction = 'requested access to your photos';
                                }
                                else {
                                    newAction = 'You requested access to his photos';
                                }
                            }
                        }
                        else {
                            if (mediaRequest.status === 'APPROVED') {
                                if (activeProfileId === mediaRequest.targetProfileId) {
                                    newAction = 'shared access to his photos';
                                }
                                else {
                                    newAction = 'approved access to your photos';
                                }
                            }
                            else if (mediaRequest.status === 'REJECTED') {
                                if (activeProfileId === mediaRequest.targetProfileId) {
                                    newAction = 'You rejected access to his photos';
                                }
                                else {
                                    newAction = 'rejected access to your photos';
                                }
                            }
                            else {
                                if (activeProfileId === mediaRequest.targetProfileId) {
                                    newAction = 'shared access to his photos';
                                }
                                else {
                                    newAction = 'You shared access to your photos';
                                }
                            }
                        }
                    }
                }
                return Object.assign({}, rest, { type: it.type, userPicture: profile.avatar, nickName: profile.nickname, author: profile, action: newAction || action, id: it.id });
            })));
        });
    }
    markAllReadForProfile() {
        Fetch.post(configuration.remoteApi.base + '/notifications/mark-read', { profileId: this.profileService.getActiveProfileId() });
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            const isLoggedIn = yield this.accountService.isLogged();
            if (isLoggedIn) {
                const deviceId = yield this.localSettingsService.getValue('DEVICEID');
                firebase.messaging()
                    .getToken()
                    .then(token => {
                    Alert.alert('Hi there,', token, [
                        {
                            text: 'ОК',
                            onPress: () => console.log('Change date'),
                            style: 'cancel',
                        },
                    ]);
                    this.updateToken(token, deviceId);
                });
                firebase.messaging()
                    .onTokenRefresh(token => this.updateToken(token, deviceId));
                firebase.messaging()
                    .onMessage((message) => {
                    console.log('FCM MESSAGE', message);
                });
                this.subscribeToNotifications();
            }
            yield this.loadNotificationSettings();
            return Promise.resolve();
        });
    }
    subscribeToNotifications() {
        this.rabbitCredentialService.onReady(service => service.subscribe('NEW_NOTIFICATION', this.emitNotificationEvent));
    }
    emitNotificationEvent() {
        eventEmitter.emit(EVENTS.rabbitNewNotification, null);
    }
    saveNotificationSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const enabled = yield this.localSettingsService.isAlertsNotificationsTurnedOn();
            const sound = yield this.localSettingsService.isAlertsSoundTurnedOn();
            const quietHoursEnabled = yield this.localSettingsService.isQuietHoursTurnedOn();
            const fromTime = JSON.parse(yield this.localSettingsService.getQuietHoursStart());
            const toTime = JSON.parse(yield this.localSettingsService.getQuietHoursEnd());
            const fromDate = new Date();
            fromDate.setHours(fromTime.hours);
            fromDate.setMinutes(fromTime.minutes);
            const toDate = new Date();
            toDate.setHours(toTime.hours);
            toDate.setMinutes(toTime.minutes);
            const offset = new Date().getTimezoneOffset() * 60 * 1000; // minutes to ms
            const fromUtc = new Date(+fromDate + offset);
            const toUtc = new Date(+toDate + offset);
            const settingsDto = {
                from: moment(fromUtc)
                    .format('HH:mm'),
                to: moment(toUtc)
                    .format('HH:mm'),
                enabled,
                sound,
                quietHoursEnabled
            };
            Fetch.post(configuration.remoteApi.base + '/notifications/settings', settingsDto);
        });
    }
    loadNotificationSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = (yield Fetch.get(configuration.remoteApi.base + '/notifications/settings')).response.objects[0];
            yield this.localSettingsService.setAlertsNotificationsTurnedOn(settings.enabled);
            yield this.localSettingsService.setAlertsSoundTurnedOn(settings.sound);
            yield this.localSettingsService.setQuietHoursTurnedOn(settings.quietHoursEnabled);
            if (settings.from && settings.to) {
                const fromHmsSplit = settings.from.split(':');
                const toHmsSplit = settings.to.split(':');
                const utcFrom = new Date();
                utcFrom.setHours(+fromHmsSplit[0]);
                utcFrom.setMinutes(+fromHmsSplit[1]);
                const utcTo = new Date();
                utcTo.setHours(+toHmsSplit[0]);
                utcTo.setMinutes(+toHmsSplit[1]);
                const offset = new Date().getTimezoneOffset() * 60 * 1000; // minutes to ms
                const fromLocal = new Date(+utcFrom - offset);
                const toLocal = new Date(+utcTo - offset);
                const fromHours = fromLocal.getHours();
                const fromMinutes = fromLocal.getMinutes();
                const toHours = toLocal.getHours();
                const toMinutes = toLocal.getMinutes();
                const from = JSON.stringify(new Time(fromHours, fromMinutes));
                const to = JSON.stringify(new Time(toHours, toMinutes));
                yield this.localSettingsService.setQuietHoursStart(from);
                yield this.localSettingsService.setQuietHoursEnd(to);
            }
            return Promise.resolve();
        });
    }
    updateDeviceId() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield firebase.messaging()
                .getToken();
            console.log('GOT FCMTOKEN', token);
            let resp2 = {};
            const deviceId = yield Fetch.post(configuration.remoteApi.base + '/device-tokens/register', {}, response => { resp2 = response; return response._bodyText; });
            console.log('DEVICEID', deviceId);
            console.log('REGISTERED DEVICE WITH ID', deviceId);
            yield this.localSettingsService.saveValue('DEVICEID', deviceId);
            this.updateToken(token, deviceId);
        });
    }
    updateToken(token, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('UPDATING TOKEN FOR DEVICE ID ' + deviceId + ' WITH VALUE ' + token);
            return Fetch.postForm(configuration.remoteApi.base + '/device-tokens/update/' + deviceId, 'token=' + token, response => response);
        });
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], NotificationService.prototype, "profileService", void 0);
__decorate([
    lazy('MediaRequestService'),
    __metadata("design:type", MediaRequestService)
], NotificationService.prototype, "mediaRequestService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], NotificationService.prototype, "localSettingsService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], NotificationService.prototype, "accountService", void 0);
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], NotificationService.prototype, "rabbitCredentialService", void 0);
__decorate([
    onEvent(EVENTS.login),
    onEvent(EVENTS.newAccount),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationService.prototype, "subscribeToNotifications", null);
__decorate([
    onEvent(EVENTS.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationService.prototype, "updateDeviceId", null);
NotificationService = __decorate([
    injectable(),
    listener('Notification'),
    mixin([LogoutClearable])
], NotificationService);
export { NotificationService };
const notificationService = new NotificationService(NotificationModel);
export default notificationService;
//# sourceMappingURL=notification.js.map