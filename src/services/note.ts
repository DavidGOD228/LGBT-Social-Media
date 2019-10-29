import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import NoteModel from '../models/note'
import ProfileInteractionService from './base/profile-interaction'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'

@injectable()
@listener('Note')
@mixin([LogoutClearable])
export class NoteService
  extends ProfileInteractionService<NoteModel> {

  @lazy('ProfileService')
  protected profileService: ProfileService

  async addToProfile(profileId: number, text: string) {
    const note = await this.doAction(profileId, true)
    return note.set('description', text)
               .save()
  }

  getForProfile(profileId) {
    return this.getActiveAction(profileId)
  }

}

const noteService = new NoteService(NoteModel)

export default noteService
