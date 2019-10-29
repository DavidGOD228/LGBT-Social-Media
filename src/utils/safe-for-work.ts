import {LocalSettingsService} from '../services/local-settings'
import {lazy} from '../annotations/inversify'

class SafeForWork {

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  async isFakeLocationEnabled() {
    const isTurnedOn = await this.localSettingsService.getSafeForWorkTurnedOn()
    if (!isTurnedOn) {
      return false
    }

    const timeStartJSON = await this.localSettingsService.getSafeForWorkTimeStart()
    const timeEndJSON = await this.localSettingsService.getSafeForWorkTimeEnd()
    if (!timeStartJSON || !timeEndJSON) {
      return false
    }

    const currentTime = new Date()
    const timeStart = JSON.parse(timeStartJSON)
    const timeEnd = JSON.parse(timeEndJSON)
    const startTimeMinutes = timeStart.hours * 60 + timeStart.minutes
    const endTimeMinutes = timeEnd.hours * 60 + timeEnd.minutes
    const currentTimeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()

    if (startTimeMinutes < endTimeMinutes) {
      return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes
    }
    if (startTimeMinutes > endTimeMinutes) {
      // TODO: test
      const inLeftInterval = currentTimeMinutes > startTimeMinutes && currentTimeMinutes <= 24 * 60
      const inRightInterval = currentTimeMinutes >= 24 * 60 && currentTimeMinutes < endTimeMinutes + 24 * 60
      return inLeftInterval || inRightInterval
    }

    return false
  }

}

const safeForWork = new SafeForWork()

export default safeForWork
