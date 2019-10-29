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
import { listener, onEvent } from '../annotations/event';
import FavoriteModel from '../models/favorite';
import { ProfileService } from './profile';
import { lazy } from '../annotations/inversify';
import ProfileInteractionToggleService from './base/profile-interaction-toggle';
import { EVENTS } from '../configs/dicts';
import { RabbitCredentialService } from './rabbit-credential';
let FavoriteService = class FavoriteService extends ProfileInteractionToggleService {
    prepareConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            try {
                this.subscription = yield this.rabbitCredentialService.subscribe('PROFILE_WAS_FAVORITE', message => this.handleNewFavorite(message));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    favoriteProfile(profileId) {
        return this.doAction(profileId)
            .then(it => it.save());
    }
    getProfileFavorite(profileId) {
        return this.getActiveAction(profileId);
    }
    unFavoriteProfile(profileId) {
        return this.undoAction(profileId);
    }
    handleNewFavorite(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileId = JSON.parse(JSON.parse(message.body).payload).targetProfileId;
            const profile = yield this.profileService.getByPrimary(profileId);
            if (profile) {
                // stub. was replaced by FCM push notifications
                // but we may need this callback to notify IN APP
            }
        });
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], FavoriteService.prototype, "profileService", void 0);
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], FavoriteService.prototype, "rabbitCredentialService", void 0);
__decorate([
    onEvent(EVENTS.rabbitConnectionEstablished),
    onEvent(EVENTS.activeProfilesChanged),
    onEvent(EVENTS.newProfile),
    onEvent(EVENTS.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FavoriteService.prototype, "prepareConnection", null);
FavoriteService = __decorate([
    injectable(),
    listener('Favorite'),
    mixin([LogoutClearable])
], FavoriteService);
export { FavoriteService };
const favoriteService = new FavoriteService(FavoriteModel);
export default favoriteService;
//# sourceMappingURL=favorite.js.map