import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import BlockModel from '../models/block'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'
import ProfileInteractionToggleService from './base/profile-interaction-toggle'
import Query from '../lib/smart-criteria/query'
import Restrictions from '../lib/smart-criteria/restrictions'

@injectable()
@listener('Block')
@mixin([LogoutClearable])
export class BlockService
  extends ProfileInteractionToggleService<BlockModel> {

  @lazy('ProfileService')
  protected profileService: ProfileService

  blockProfile(profileId: number) {
    return this.doAction(profileId)
               .then(it => it.save())
  }

  getProfileBlock(profileId: number) {
    return this.getActiveAction(profileId)
  }

  getReverseProfileBlock(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const query = new Query()
    query.add(Restrictions.equal('sourceProfileId', profileId))
         .add(Restrictions.equal('targetProfileId', activeProfileId))
         .add(Restrictions.isNull('endDate'))
         .setSort(Restrictions.desc('id'))
         .setLimit(1)

    return this.getRepo()
               .findRecord(query)
  }

  unBlockProfile(profileId: number) {
    return this.undoAction(profileId)
  }

  async getBlockedProfiles() {
    const actions = await this.getActiveActions()
    const targetsIds = actions.map(it => it.targetProfileId)
    return this.profileService.getCommunityDtoByProfileIdList(targetsIds, true)
  }
}

const blockService = new BlockService(BlockModel)

export default blockService
