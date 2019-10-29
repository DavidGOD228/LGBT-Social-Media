import DefaultBaseService from './base/impl/default'
import MediaModel from '../models/media'
import Query from '../lib/smart-criteria/query'
import { injectable } from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Fetch from '../utils/fetch'
import configuration from '../configs/index'
import { LogoutClearable } from './mixins/logout-clearable'
import { mixin } from '../annotations/common'
import { listener } from '../annotations/event'

@injectable()
@listener('Media')
@mixin([LogoutClearable])
export class MediaService
  extends DefaultBaseService<MediaModel, PeekableRecordManager<MediaModel, Query>> {

  // createNew(file): Promise<undefined | MediaModel> {
  //   return Fetch.upload(configuration.remoteApi.base + '/medias/upload', file)
  //               .then(({response}) => this.getRepo()
  //                                         .findByPrimary(response.objects[0].id))
  // }

  createNew(file, isAlbum?: boolean): Promise<undefined | MediaModel> {
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
        .findByPrimary(response.objects[0].id))
  }

}

const profileMediaService = new MediaService(MediaModel)

export default profileMediaService
