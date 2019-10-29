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
import ProfileModel from '../models/profile';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import { AccountService } from './account';
import { lazy } from '../annotations/inversify';
import { listener, onEvent, postEmit, promiseEmit } from '../annotations/event';
import { EVENTS } from '../configs/dicts';
import MediaModel from '../models/media';
import { ProfileTypeService } from './profile-type';
import { mixin } from '../annotations/common';
import { LogoutClearable } from './mixins/logout-clearable';
import { LocalSettingsService } from './local-settings';
import Fetch from '../utils/fetch';
import configuration from '../configs/index';
import Restrictions from '../lib/smart-criteria/restrictions';
let ProfileService = class ProfileService extends DefaultBaseService {
    constructor() {
        super(...arguments);
        this.updateStealthModeStatus = (enabled) => __awaiter(this, void 0, void 0, function* () {
            const response = yield Fetch.customRequest(`${configuration.remoteApi.base}/profiles/stealth-mode?invisible=${enabled}`, { method: 'put' });
            console.log('STEALTHMODE', response);
            const profiles = yield this.getForCurrent();
            profiles.forEach(profile => profile.update());
        });
        this.reportUser = (myProfileId, targetProfileId, harassingMe, wrongUniverse, inappropriateBehavior, otherReason) => {
            return Fetch.post(`${configuration.remoteApi.base}/user_reports/register`, {
                sourceProfileId: myProfileId,
                targetProfileId: targetProfileId,
                harassingMe: harassingMe,
                wrongUniverse: wrongUniverse,
                inappropriateBehavior: inappropriateBehavior,
                otherReason: otherReason
            });
        };
    }
    getForCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accountService.getCurrent();
            return account ? [...account.profiles] : [];
        });
    }
    createNew(name, media, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileType = yield this.profileTypeService.getByCode(type);
            if (!profileType) {
                throw new Error(`there is no such profile type: ${type}`);
            }
            return this.getRepo()
                .createRecord()
                .set('nickname', name)
                .set('mediaId', media.id)
                .set('profileType', profileType)
                .save();
        });
    }
    activateNewProfile(profile) {
        this.activate(profile);
    }
    activate(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeProfile = profile;
            yield Fetch.customRequest(`${configuration.remoteApi.base}/profiles/${profile.id}/activate`, { method: 'put' });
            yield this.getForCurrent();
        });
    }
    activateByType(profileType) {
        return __awaiter(this, void 0, void 0, function* () {
            const profiles = yield this.getForCurrent();
            const newActive = profiles.find(it => it.profileType.code === profileType) || profiles.pop();
            if (newActive) {
                yield this.activate(newActive);
            }
            return Promise.resolve();
        });
    }
    getActive() {
        return this.activeProfile;
    }
    getActiveProfileId() {
        const activeProfile = this.activeProfile;
        if (!activeProfile) {
            throw new Error('no active profile');
        }
        return activeProfile.id;
    }
    persistActive() {
        const active = this.getActive();
        if (!active) {
            return;
        }
        const value = JSON.stringify(active.id);
        return this.localSettingsService.saveValue('activeProfiles', value);
    }
    getByPrimary(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getRepo()
                .peekByPrimary(profileId)) || (yield this.getRepo()
                .findByPrimary(profileId));
        });
    }
    getByPrimaryList(profileIds) {
        const query = new Query();
        query.add(Restrictions.contain('id', profileIds));
        return this.getRepo()
            .find(query);
    }
    getDefaultActive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profiles = yield this.getForCurrent();
            return profiles.find(it => it.id === id) || profiles.pop();
        });
    }
    restoreActive() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield this.localSettingsService.getValue('activeProfiles');
            const value = text ? JSON.parse(text) : 0;
            const activeProfile = yield this.getDefaultActive(value);
            if (activeProfile) {
                this.activate(activeProfile);
            }
        });
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.restoreActive();
        });
    }
    // todo: extract to separate entity
    getStatistics() {
        const activeProfileId = this.getActiveProfileId();
        return Fetch.get(configuration.remoteApi.base + `/statistics/${activeProfileId}`)
            .then(res => res.response.objects.pop());
    }
    share(profileId, body) {
        const activeProfileId = this.getActiveProfileId();
        return Promise.all([
            Fetch.put(configuration.remoteApi.base + `/profile-shares/${activeProfileId}/${profileId}`, body),
            Fetch.put(configuration.remoteApi.base + `/profile-shares/${profileId}/${activeProfileId}`, body)
        ]);
    }
    getShare(profileId) {
        const activeProfileId = this.getActiveProfileId();
        return Fetch.get(configuration.remoteApi.base + `/profile-shares/${activeProfileId}/${profileId}`)
            .then(res => res.response.objects.pop());
    }
    getCommunityDtoByProfileId(profileId, blocked) {
        return __awaiter(this, void 0, void 0, function* () {
            const trueLocation = JSON.parse(yield this.localSettingsService.getValue('LOCATION'));
            const isExploreEnabled = yield this.localSettingsService.getExploreEnabled();
            const exploreLocation = yield this.localSettingsService.getExploreLocation();
            let latitude = trueLocation.latitude;
            let longitude = trueLocation.longitude;
            if (isExploreEnabled && exploreLocation) {
                latitude = exploreLocation.latitude;
                longitude = exploreLocation.longitude;
            }
            const params = {
                'ignore-blocks': !!blocked,
                'lat': latitude,
                'lon': longitude
            };
            return Fetch.get(configuration.remoteApi.base + `/community-views/${profileId}`, params)
                .then(res => res.response.objects.pop())
                .catch(res => res.status === 403 ? null : -1);
        });
    }
    getCommunityDtoByProfileIdList(profileIdList, blocked) {
        const communityDtoPromiseList = profileIdList.map(it => this.getCommunityDtoByProfileId(it, blocked));
        return Promise.all(communityDtoPromiseList);
    }
    getStats(profileId) {
        return this.getStatsByProfileId(profileId || this.getActiveProfileId());
    }
    getStatsByProfileId(profileId) {
        return Fetch.get(configuration.remoteApi.base + `/profiles/${profileId}/unread-stat`)
            .then(res => res.response.objects.pop());
    }
};
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], ProfileService.prototype, "accountService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], ProfileService.prototype, "localSettingsService", void 0);
__decorate([
    lazy('ProfileTypeService'),
    __metadata("design:type", ProfileTypeService)
], ProfileService.prototype, "profileTypeService", void 0);
__decorate([
    promiseEmit(EVENTS.newProfile),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, MediaModel, String]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "createNew", null);
__decorate([
    onEvent(EVENTS.newProfile),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfileModel]),
    __metadata("design:returntype", void 0)
], ProfileService.prototype, "activateNewProfile", null);
__decorate([
    postEmit(EVENTS.activeProfilesChanged),
    promiseEmit(EVENTS.activeProfileSelected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfileModel]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "activate", null);
__decorate([
    postEmit(EVENTS.activeProfilesChanged),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "activateByType", null);
__decorate([
    onEvent(EVENTS.activeProfilesChanged),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileService.prototype, "persistActive", null);
__decorate([
    onEvent(EVENTS.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "restoreActive", null);
ProfileService = __decorate([
    injectable(),
    listener('Profile'),
    mixin([LogoutClearable])
], ProfileService);
export { ProfileService };
const profileService = new ProfileService(ProfileModel);
export default profileService;
//# sourceMappingURL=profile.js.map