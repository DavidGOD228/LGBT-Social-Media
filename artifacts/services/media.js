var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import DefaultBaseService from './base/impl/default';
import MediaModel from '../models/media';
import { injectable } from 'inversify';
import Fetch from '../utils/fetch';
import configuration from '../configs/index';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
let MediaService = class MediaService extends DefaultBaseService {
    // createNew(file): Promise<undefined | MediaModel> {
    //   return Fetch.upload(configuration.remoteApi.base + '/medias/upload', file)
    //               .then(({response}) => this.getRepo()
    //                                         .findByPrimary(response.objects[0].id))
    // }
    createNew(file, isAlbum) {
        console.log('fileeee');
        console.log(file);
        const fetcher = Fetch.upload(`${configuration.remoteApi.base}/medias/upload${isAlbum ? '?album=true' : ''}`, file)
            .then(({ response }) => {
            let res = this.getRepo().findByPrimary(response.objects[0].id);
            console.log('UPLOAD PHOTO', isAlbum);
            console.log(res);
            console.log('ooooobj');
            console.log(response);
            console.log(response.objects[0]);
            return res;
        });
        return fetcher;
    }
    createNewVideo(file) {
        return Fetch.uploadVideo(configuration.uploadApi.base + '/medias/upload', file)
            .then(({ response }) => this.getRepo()
            .findByPrimary(response.objects[0].id));
    }
};
MediaService = __decorate([
    injectable(),
    listener('Media'),
    mixin([LogoutClearable])
], MediaService);
export { MediaService };
const profileMediaService = new MediaService(MediaModel);
export default profileMediaService;
//# sourceMappingURL=media.js.map