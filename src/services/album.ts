import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import AlbumModel, {AlbumType} from '../models/album'
import Restrictions from '../lib/smart-criteria/restrictions'
import MediaModel from '../models/media'
import {lazy} from '../annotations/inversify'
import {AlbumMediaService} from './album-media'
import AlbumMediaModel from '../models/album-media'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('Album')
@mixin([LogoutClearable])
export class AlbumService
  extends DefaultBaseService<AlbumModel, PeekableRecordManager<AlbumModel, Query>> {

  @lazy('AlbumMediaService')
  private albumMediaService: AlbumMediaService

  getPhotoForProfile(profileId): Promise<AlbumModel> {
    return this.getByTypeForProfile('IMAGE', profileId)
  }

  getVideoForProfile(profileId): Promise<AlbumModel> {
    return this.getByTypeForProfile('VIDEO', profileId)
  }

  addMediaTo(album: AlbumModel, media: MediaModel) {
    return this.albumMediaService.createNew(media.id, album)
  }

  getMediasFrom(album: AlbumModel): Promise<AlbumMediaModel[]> {
    return this.albumMediaService.getForAlbum(album)
  }

  private async getByTypeForProfile(type: AlbumType, profileId: number): Promise<AlbumModel> {
    const query = new Query()

    query.add(Restrictions.equal('profileId', profileId))
         .add(Restrictions.equal('type', type))
         .setLimit(1)

    const mayBeAlbum = await this.getRepo()
                                 .findRecord(query)

    if (mayBeAlbum) {
      return mayBeAlbum
    }

    return await this.getRepo()
                     .createRecord()
                     .set('type', type)
                     .set('profileId', profileId)
                     .save()
  }
}

const albumService = new AlbumService(AlbumModel)

export default albumService
