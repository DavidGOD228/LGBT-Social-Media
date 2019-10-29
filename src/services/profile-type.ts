import DefaultBaseService from './base/impl/default'
import ProfileTypeModel from '../models/profile-type'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Restrictions from '../lib/smart-criteria/restrictions'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'

@injectable()
@listener('ProfileType')
@mixin([LogoutClearable])
export class ProfileTypeService
  extends DefaultBaseService<ProfileTypeModel, PeekableRecordManager<ProfileTypeModel, Query>> {

  getByCode(name) {
    const query = new Query()
    query.add(Restrictions.equal('code', name.toUpperCase()))
    // console.log(query.generate())
    return this.getRepo()
               .findRecord(query)
  }
}

const profileTypeService = new ProfileTypeService(ProfileTypeModel)

export default profileTypeService
