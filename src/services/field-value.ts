import DefaultBaseService from './base/impl/default'
import FieldValueModel from '../models/field-value'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import FieldModel from '../models/field'
import SectionModel from '../models/section'
import SubSectionModel from '../models/sub-section'
import Restrictions from '../lib/smart-criteria/restrictions'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('FieldValue')
@mixin([LogoutClearable])
export class FieldValueService
  extends DefaultBaseService<FieldValueModel, PeekableRecordManager<FieldValueModel, Query>> {

  createNew(
    section: SectionModel,
    subSection: SubSectionModel,
    field: FieldModel,
    value: any
  ): Promise<FieldValueModel> {

    const path = `${section.profileType}.${section.name}.${subSection.name}.${field.name}`
    const repo = this.getRepo()
    const query = new Query().add(Restrictions.equal('path', path))
                             .add(Restrictions.equal('value', value.toString()))

    try {
      return repo.peekRecord(`path = "${path}" AND value = "${value.toString()}"`)
                 .then(fieldValue => fieldValue || repo.findRecord(query))
                 .then(fieldValue => fieldValue || repo.createRecord()
                                                       .set('path', path)
                                                       .set('value', value.toString())
                                                       .save())
    } catch (error) {
      return repo.findRecord(query)
                 .then(fieldValue => fieldValue || repo.createRecord()
                                                       .set('path', path)
                                                       .set('value', value.toString())
                                                       .save())
    }
  }
}

const fieldValueService = new FieldValueService(FieldValueModel)

export default fieldValueService
