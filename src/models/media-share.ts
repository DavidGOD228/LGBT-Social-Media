import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../annotations/model'
import AlbumModel from './album'
import MediaRequestModel from './media-request'
import ProfileInteractionModel from './base/profile-interaction'

@modelName('MediaShare')
class MediaShareModel extends ProfileInteractionModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  sourceProfileId: number

  @attr()
  targetProfileId: number

  @attr()
  @toOne('Album')
  album: AlbumModel

  @attr()
  @toOne('MediaRequest')
  mediaRequest: MediaRequestModel
}

export default MediaShareModel
