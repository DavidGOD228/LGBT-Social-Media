import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../annotations/model'
import configuration from '../configs/index'
import AlbumModel from './album'

@modelName('AlbumMedia')
class AlbumMediaModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  mediaId: number

  @attr()
  sort: number

  @attr()
  @toOne('Album')
  album: AlbumModel

  get mediaUrl() {
    return `${configuration.uploadApi.base}/medias/download/${this.mediaId}?type=SMALL`
  }
}

export default AlbumMediaModel
