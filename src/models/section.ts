import DefaultModel from './base/impl/default-model'
import {
  attr,
  modelName,
  primaryKey,
  toMany
} from '../annotations/model'
import SubSectionModel from './sub-section'
import {ProfileType} from './profile'

@modelName('Section')
class SectionModel extends DefaultModel {

  @attr('int')
  @primaryKey()
  id: number

  @attr('string')
  profileType: ProfileType

  @attr()
  name: string

  @attr()
  sort: number

  @attr()
  @toMany('SubSection')
  subSections: SubSectionModel[]
}

export default SectionModel
