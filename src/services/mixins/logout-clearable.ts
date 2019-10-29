import {onEvent} from '../../annotations/event'
import {EVENTS} from '../../configs/dicts'
import DefaultBaseService from '../base/impl/default'

export class LogoutClearable extends DefaultBaseService<any, any> {

  @onEvent(EVENTS.logout)
  clearOnLogout() {
    return this.getRepo()
               .removeAll()
  }

}
