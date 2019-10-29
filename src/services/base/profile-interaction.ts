import {injectable} from 'inversify'
import DefaultBaseService from './impl/default'
import PeekableRecordManager from '../../repositories/base/peekable-record-manager'
import Query from '../../lib/smart-criteria/query'
import {ProfileService} from '../profile'
import Restrictions from '../../lib/smart-criteria/restrictions'
import ProfileInteractionModel from '../../models/base/profile-interaction'

@injectable()
export default class ProfileInteractionService<T extends ProfileInteractionModel>
  extends DefaultBaseService<T, PeekableRecordManager<T, Query>> {

  protected profileService: ProfileService

  protected async doAction(profileId: number, usePersisted: boolean = false) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const activeAction = usePersisted && await this.getActiveAction(profileId)

    return activeAction || this.getRepo()
                               .createRecord()
                               .set('sourceProfileId', activeProfileId)
                               .set('targetProfileId', profileId)
  }

  protected getActiveAction(profileId: number) {
    const query = this.getActiveActionQuery(profileId)

    return this.getRepo()
               .findRecord(query)
  }

  protected getActiveActionQuery(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()

    const query = new Query()
    query.add(Restrictions.equal('sourceProfileId', activeProfileId))
         .add(Restrictions.equal('targetProfileId', profileId))
         .setSort(Restrictions.desc('id'))
         .setLimit(1)

    return query
  }

}
