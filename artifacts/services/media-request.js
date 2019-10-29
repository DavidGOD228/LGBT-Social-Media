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
import MediaRequestModel from '../models/media-request';
import DefaultBaseService from './base/impl/default';
import Query from '../lib/smart-criteria/query';
import Restrictions from '../lib/smart-criteria/restrictions';
import { AlbumService } from './album';
import Fetch from '../utils/fetch';
import configuration from '../configs/index';
let MediaRequestService = class MediaRequestService extends DefaultBaseService {
    getByPrimary(key) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await this.getRepo()
            //                  .peekByPrimary(key) || await this.getRepo()
            //                                                   .findByPrimary(key)
            return yield this.getRepo()
                .findByPrimary(key);
        });
    }
    getOutboundActiveRequest(profileId, album) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getActiveRequest(activeProfileId, profileId, album);
    }
    newOutboundRequest(profileId, album) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.newRequest(activeProfileId, profileId, album);
    }
    getInboundPhotoActiveRequest(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const album = yield this.albumService.getPhotoForProfile(activeProfileId);
            return this.getInboundActiveRequest(profileId, album);
        });
    }
    getInboundVideoActiveRequest(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const album = yield this.albumService.getVideoForProfile(activeProfileId);
            return this.getInboundActiveRequest(profileId, album);
        });
    }
    newInboundPhotoRequest(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const album = yield this.albumService.getPhotoForProfile(activeProfileId);
            return this.newInboundRequest(profileId, album);
        });
    }
    newInboundVideoRequest(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const album = yield this.albumService.getVideoForProfile(activeProfileId);
            return this.newInboundRequest(profileId, album);
        });
    }
    getInboundActiveRequestReverse(profileId, album) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getActiveRequest(profileId, activeProfileId, album, 'INBOUND');
    }
    cancel(mediaRequestId) {
        return Fetch.post(configuration.remoteApi.base + `/media-requests/${mediaRequestId}/cancel`, {});
    }
    getInboundActiveRequest(profileId, album) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getActiveRequest(activeProfileId, profileId, album, 'INBOUND');
    }
    newInboundRequest(profileId, album) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.newRequest(activeProfileId, profileId, album, 'INBOUND');
    }
    newRequest(sourceProfileId, targetProfileId, album, direction = 'OUTBOUND') {
        return this.getRepo()
            .createRecord()
            .set('sourceProfileId', sourceProfileId)
            .set('targetProfileId', targetProfileId)
            .set('album', album)
            .set('type', direction)
            .set('status', 'AWAITING')
            .save();
    }
    getActiveRequest(sourceProfileId, targetProfileId, album, direction = 'OUTBOUND') {
        const query = new Query();
        query.add(Restrictions.equal('sourceProfileId', sourceProfileId))
            .add(Restrictions.equal('targetProfileId', targetProfileId))
            .add(Restrictions.equal('album.id', album.id))
            .add(Restrictions.equal('type', direction))
            .add(Restrictions.notEqual('status', 'CANCELED'))
            .setSort(Restrictions.desc('id'));
        return this.getRepo()
            .findRecord(query);
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], MediaRequestService.prototype, "profileService", void 0);
__decorate([
    lazy('AlbumService'),
    __metadata("design:type", AlbumService)
], MediaRequestService.prototype, "albumService", void 0);
MediaRequestService = __decorate([
    injectable(),
    listener('MediaRequest'),
    mixin([LogoutClearable])
], MediaRequestService);
export { MediaRequestService };
const mediaRequestService = new MediaRequestService(MediaRequestModel);
export default mediaRequestService;
//# sourceMappingURL=media-request.js.map