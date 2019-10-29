import DefaultBaseService from './base/impl/default'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import AlbumMediaModel from '../models/album-media'
import AlbumModel from '../models/album'
import Restrictions from '../lib/smart-criteria/restrictions'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('AlbumMedia')
@mixin([LogoutClearable])
export class AlbumMediaService
  extends DefaultBaseService<AlbumMediaModel, PeekableRecordManager<AlbumMediaModel, Query>> {

  createNew(mediaId: number, album: AlbumModel) {
    return this.getRepo()
               .createRecord()
               .set('mediaId', mediaId)
               .set('album', album)
               .save()
  }

  getForAlbum(album: AlbumModel): Promise<AlbumMediaModel[]> {
    const query = new Query()
    query.add(Restrictions.equal('album.id', album.id))
    return this.getRepo()
               .find(query)
  }

}

const albumMediaService = new AlbumMediaService(AlbumMediaModel)

export default albumMediaService
