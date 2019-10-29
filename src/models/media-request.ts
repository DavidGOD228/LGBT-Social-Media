import {
  attr,
  modelName,
  primaryKey,
  toOne
} from '../annotations/model'
import AlbumModel from './album'
import ProfileInteractionModel from './base/profile-interaction'

export type MediaRequestStatus = 'AWAITING' | 'APPROVED' | 'EXPIRED' | 'REJECTED' | 'CANCELED'

export type MediaRequestType = 'INBOUND' | 'OUTBOUND'

@modelName('MediaRequest')
class MediaRequestModel extends ProfileInteractionModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  sourceProfileId: number

  @attr()
  targetProfileId: number

  @attr('string')
  status: MediaRequestStatus

  @attr('string')
  type: MediaRequestType

  @attr()
  @toOne('Album')
  album: AlbumModel
}

export default MediaRequestModel
