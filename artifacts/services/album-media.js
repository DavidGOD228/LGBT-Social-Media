var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import DefaultBaseService from './base/impl/default';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import AlbumMediaModel from '../models/album-media';
import Restrictions from '../lib/smart-criteria/restrictions';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
let AlbumMediaService = class AlbumMediaService extends DefaultBaseService {
    createNew(mediaId, album) {
        return this.getRepo()
            .createRecord()
            .set('mediaId', mediaId)
            .set('album', album)
            .save();
    }
    getForAlbum(album) {
        const query = new Query();
        query.add(Restrictions.equal('album.id', album.id));
        return this.getRepo()
            .find(query);
    }
};
AlbumMediaService = __decorate([
    injectable(),
    listener('AlbumMedia'),
    mixin([LogoutClearable])
], AlbumMediaService);
export { AlbumMediaService };
const albumMediaService = new AlbumMediaService(AlbumMediaModel);
export default albumMediaService;
//# sourceMappingURL=album-media.js.map