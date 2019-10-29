import DefaultBaseService from './base/impl/default'
import ProfileViewSectionModel from '../models/profile-view/profile-view-section'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Query from '../lib/smart-criteria/query'
import Restrictions from '../lib/smart-criteria/restrictions'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {injectable} from 'inversify'
import {memo} from '../annotations/eval'

@injectable()
@listener('ProfileViewSection')
@mixin([LogoutClearable])
export class ProfileViewSectionService
  extends DefaultBaseService<ProfileViewSectionModel, PeekableRecordManager<ProfileViewSectionModel, Query>> {

  @memo()
  getAllByProfileTypeCode(profileTypeCode: string): Promise<ProfileViewSectionModel[]> {
    const query = new Query()
    query.add(Restrictions.equal('profileType', profileTypeCode))
    return this.getRepo()
               .find(query)
  }
}

const profileViewSectionService = new ProfileViewSectionService(ProfileViewSectionModel)

export default profileViewSectionService
