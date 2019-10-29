import {
  attr,
  modelName,
  primaryKey
} from '../annotations/model'
import ProfileInteractionModel from './base/profile-interaction'

@modelName('Note')
class NoteModel extends ProfileInteractionModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  sourceProfileId: number

  @attr()
  targetProfileId: number

  @attr()
  description: string

}

export default NoteModel
