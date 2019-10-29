import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'
import ProfileInteractionToggleService from './base/profile-interaction-toggle'
import LinkedProfileModel from '../models/linked-profile'
import {AccountService} from './account'
import Restrictions from '../lib/smart-criteria/restrictions'
import Query from '../lib/smart-criteria/query'

@injectable()
@listener('LinkedProfile')
@mixin([LogoutClearable])
export class LinkedProfileService
  extends ProfileInteractionToggleService<LinkedProfileModel> {

  @lazy('ProfileService')
  protected profileService: ProfileService

  @lazy('AccountService')
  protected accountService: AccountService

  async linkProfileByEmail(email: string) {
    const activeProfile = this.profileService.getActive()
    if (!activeProfile) {
      throw new Error('there is no active profile')
    }

    const account = await this.accountService.getByEmail(email)
    if (!account) {
      throw new Error('there is no such account for email')
    }

    const profile = account.profiles.find(it => it.profileType.code === activeProfile.profileType.code)
    if (!profile) {
      throw new Error('there is no suitable profile for email')
    }

    return this.linkProfile(profile.id)
  }

  linkProfile(profileId: number) {
    return this.doAction(profileId)
               .then(it => it.save())
  }

  getProfileLink() {
    return this.getActiveAction()
  }

  async unLinkProfile() {
    return this.undoAction(0)
  }

  async activeRequest() {
    return await this.getAction(true)
  }

  getOppositeProfileId(linkedProfile: LinkedProfileModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return linkedProfile.sourceProfileId === activeProfileId ?
      linkedProfile.targetProfileId : linkedProfile.sourceProfileId
  }

  protected getActiveAction() {
    return this.getAction()
  }

  private getAction(requested = false) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const query = new Query()
    const criterion = Restrictions.disjunction(
      Restrictions.equal('sourceProfileId', activeProfileId),
      Restrictions.equal('targetProfileId', activeProfileId)
    )
    query.add(criterion)
         .add(Restrictions.isNull('endDate'))
         .add(Restrictions[requested ? 'isNull' : 'isNotNull']('startDate'))
         .setSort(Restrictions.desc('id'))
         .setLimit(1)

    return this.getRepo()
               .findRecord(query)
  }
}

const linkedProfileService = new LinkedProfileService(LinkedProfileModel)

export default linkedProfileService
