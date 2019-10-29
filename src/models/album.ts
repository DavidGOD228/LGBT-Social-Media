import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName
} from '../annotations/model'

export type AlbumType = 'IMAGE' | 'VIDEO'

@modelName('Album')
class AlbumModel extends DefaultModel {

  @attr('int')
  id: number

  @attr('string')
  type: AlbumType

  @attr()
  profileId: number
}

export default AlbumModel
