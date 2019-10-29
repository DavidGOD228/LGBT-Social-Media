import moment from 'moment'
import {injectable} from 'inversify'
import DefaultBaseService from './impl/default'
import PeekableRecordManager from '../../repositories/base/peekable-record-manager'
import Query from '../../lib/smart-criteria/query'
import {ProfileService} from '../profile'
import Restrictions from '../../lib/smart-criteria/restrictions'
import ProfileInteractionToggleModel from '../../models/base/profile-interaction-toggle'

@injectable()
export default class ProfileInteractionToggleService<T extends ProfileInteractionToggleModel>
  extends DefaultBaseService<T, PeekableRecordManager<T, Query>> {

  protected profileService: ProfileService

  protected async doAction(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const alreadyHasAction = await this.getActiveAction(profileId)

    return alreadyHasAction || this.getRepo()
                                   .createRecord()
                                   .set('sourceProfileId', activeProfileId)
                                   .set('targetProfileId', profileId)
  }

  protected getActiveAction(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const query = new Query()
    query.add(Restrictions.equal('sourceProfileId', activeProfileId))
         .add(Restrictions.equal('targetProfileId', profileId))
         .add(Restrictions.isNull('endDate'))
         .setSort(Restrictions.desc('id'))
         .setLimit(1)

    return this.getRepo()
               .findRecord(query)
  }

  protected getActiveActions() {
    const activeProfileId = this.profileService.getActiveProfileId()

    const query = new Query()
    query.add(Restrictions.equal('sourceProfileId', activeProfileId))
         .add(Restrictions.isNull('endDate'))
         .setSort(Restrictions.desc('id'))

    return this.getRepo()
               .find(query)
  }

  protected async undoAction(profileId: number) {
    const activeAction = await this.getActiveAction(profileId)
    if (!activeAction) {
      throw new Error('there is no active action')
    }

    const now = moment()
      .format()
    activeAction.set('endDate', now)
    return activeAction.save()
  }

}
