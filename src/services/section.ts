import DefaultBaseService from './base/impl/default'
import SectionModel from '../models/section'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Restrictions from '../lib/smart-criteria/restrictions'
import {memo} from '../annotations/eval'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('Section')
@mixin([LogoutClearable])
export class SectionService
  extends DefaultBaseService<SectionModel, PeekableRecordManager<SectionModel, Query>> {

  @memo()
  getAllByProfileTypeCode(profileTypeCode: string): Promise<SectionModel[]> {
    const query = new Query()
    query.add(Restrictions.equal('profileType', profileTypeCode))
    // todo: add sort condition here
    return this.getRepo()
               .find(query)
  }

}

const sectionService = new SectionService(SectionModel)

export default sectionService
