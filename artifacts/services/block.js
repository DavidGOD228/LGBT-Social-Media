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
import BlockModel from '../models/block';
import { ProfileService } from './profile';
import { lazy } from '../annotations/inversify';
import ProfileInteractionToggleService from './base/profile-interaction-toggle';
import Query from '../lib/smart-criteria/query';
import Restrictions from '../lib/smart-criteria/restrictions';
let BlockService = class BlockService extends ProfileInteractionToggleService {
    blockProfile(profileId) {
        return this.doAction(profileId)
            .then(it => it.save());
    }
    getProfileBlock(profileId) {
        return this.getActiveAction(profileId);
    }
    getReverseProfileBlock(profileId) {
        const activeProfileId = this.profileService.getActiveProfileId();
        const query = new Query();
        query.add(Restrictions.equal('sourceProfileId', profileId))
            .add(Restrictions.equal('targetProfileId', activeProfileId))
            .add(Restrictions.isNull('endDate'))
            .setSort(Restrictions.desc('id'))
            .setLimit(1);
        return this.getRepo()
            .findRecord(query);
    }
    unBlockProfile(profileId) {
        return this.undoAction(profileId);
    }
    getBlockedProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const actions = yield this.getActiveActions();
            const targetsIds = actions.map(it => it.targetProfileId);
            return this.profileService.getCommunityDtoByProfileIdList(targetsIds, true);
        });
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], BlockService.prototype, "profileService", void 0);
BlockService = __decorate([
    injectable(),
    listener('Block'),
    mixin([LogoutClearable])
], BlockService);
export { BlockService };
const blockService = new BlockService(BlockModel);
export default blockService;
//# sourceMappingURL=block.js.map