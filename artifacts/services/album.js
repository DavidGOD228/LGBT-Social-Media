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
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import AlbumModel from '../models/album';
import Restrictions from '../lib/smart-criteria/restrictions';
import { lazy } from '../annotations/inversify';
import { AlbumMediaService } from './album-media';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
let AlbumService = class AlbumService extends DefaultBaseService {
    getPhotoForProfile(profileId) {
        return this.getByTypeForProfile('IMAGE', profileId);
    }
    getVideoForProfile(profileId) {
        return this.getByTypeForProfile('VIDEO', profileId);
    }
    addMediaTo(album, media) {
        return this.albumMediaService.createNew(media.id, album);
    }
    getMediasFrom(album) {
        return this.albumMediaService.getForAlbum(album);
    }
    getByTypeForProfile(type, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new Query();
            query.add(Restrictions.equal('profileId', profileId))
                .add(Restrictions.equal('type', type))
                .setLimit(1);
            const mayBeAlbum = yield this.getRepo()
                .findRecord(query);
            if (mayBeAlbum) {
                return mayBeAlbum;
            }
            return yield this.getRepo()
                .createRecord()
                .set('type', type)
                .set('profileId', profileId)
                .save();
        });
    }
};
__decorate([
    lazy('AlbumMediaService'),
    __metadata("design:type", AlbumMediaService)
], AlbumService.prototype, "albumMediaService", void 0);
AlbumService = __decorate([
    injectable(),
    listener('Album'),
    mixin([LogoutClearable])
], AlbumService);
export { AlbumService };
const albumService = new AlbumService(AlbumModel);
export default albumService;
//# sourceMappingURL=album.js.map