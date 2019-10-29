import DefaultModel from './base/impl/default-model'
import FieldModel from './field'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../annotations/model'

@modelName('SubSection')
class SubSectionModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr()
  name: string

  @attr()
  sort: number

  @attr()
  @toMany('Field')
  fields: FieldModel[]
}

export default SubSectionModel
