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
import { injectable } from 'inversify';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import { ProfileService } from './profile';
import { lazy } from '../annotations/inversify';
import ProfileInteractionToggleService from './base/profile-interaction-toggle';
import LinkedProfileModel from '../models/linked-profile';
import { AccountService } from './account';
import Restrictions from '../lib/smart-criteria/restrictions';
import Query from '../lib/smart-criteria/query';
let LinkedProfileService = class LinkedProfileService extends ProfileInteractionToggleService {
    linkProfileByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfile = this.profileService.getActive();
            if (!activeProfile) {
                throw new Error('there is no active profile');
            }
            const account = yield this.accountService.getByEmail(email);
            if (!account) {
                throw new Error('there is no such account for email');
            }
            const profile = account.profiles.find(it => it.profileType.code === activeProfile.profileType.code);
            if (!profile) {
                throw new Error('there is no suitable profile for email');
            }
            return this.linkProfile(profile.id);
        });
    }
    linkProfile(profileId) {
        return this.doAction(profileId)
            .then(it => it.save());
    }
    getProfileLink() {
        return this.getActiveAction();
    }
    unLinkProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.undoAction(0);
        });
    }
    activeRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAction(true);
        });
    }
    getOppositeProfileId(linkedProfile) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return linkedProfile.sourceProfileId === activeProfileId ?
            linkedProfile.targetProfileId : linkedProfile.sourceProfileId;
    }
    getActiveAction() {
        return this.getAction();
    }
    getAction(requested = false) {
        const activeProfileId = this.profileService.getActiveProfileId();
        const query = new Query();
        const criterion = Restrictions.disjunction(Restrictions.equal('sourceProfileId', activeProfileId), Restrictions.equal('targetProfileId', activeProfileId));
        query.add(criterion)
            .add(Restrictions.isNull('endDate'))
            .add(Restrictions[requested ? 'isNull' : 'isNotNull']('startDate'))
            .setSort(Restrictions.desc('id'))
            .setLimit(1);
        return this.getRepo()
            .findRecord(query);
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], LinkedProfileService.prototype, "profileService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], LinkedProfileService.prototype, "accountService", void 0);
LinkedProfileService = __decorate([
    injectable(),
    listener('LinkedProfile'),
    mixin([LogoutClearable])
], LinkedProfileService);
export { LinkedProfileService };
const linkedProfileService = new LinkedProfileService(LinkedProfileModel);
export default linkedProfileService;
//# sourceMappingURL=linked-profile.js.map