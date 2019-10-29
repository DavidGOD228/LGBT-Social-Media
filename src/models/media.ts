import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  remotePathUrl
} from '../annotations/model'
import configuration from '../configs/index'

@modelName('Media')
@remotePathUrl('medias')
class MediaModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  get mediaUrl() {
    return `${configuration.remoteApi.base}/medias/download/${this.id}?type=SMALL`
  }
}

export default MediaModel
