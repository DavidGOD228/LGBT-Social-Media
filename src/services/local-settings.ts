import DefaultBaseService from './base/impl/default'
import LocalSettingsModel from '../models/local-settings'
import CacheRepository from '../repositories/base/impl/cache'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {
  listener,
  onEvent
} from '../annotations/event'
import {EVENTS} from '../configs/dicts'
import eventEmitter from '../utils/event-emitter'
import PreferencesUtil from '../utils/preferences-util'

const IS_TERMS_ACCEPTED = 'IS_TERMS_ACCEPTED'
const IS_ANY_ACCOUNT_EXIST = 'IS_ANY_ACCOUNT_EXIST'
const SESSION_TOKEN = 'SESSION_TOKEN'
const GETTING_STARTED = 'GETTING_STARTED'
const CURRENT_PROFILE_ID = 'CURRENT_PROFILE_ID'
const USER_METRICS = 'USER_METRICS'
const ALERTS_ALL_TURNED_ON = 'ALERTS_ALL_TURNED_ON'
const ALERTS_NOTIFICATIONS_TURNED_ON = 'ALERTS_NOTIFICATIONS_TURNED_ON'
const ALERTS_SOUND_TURNED_ON = 'ALERTS_SOUND_TURNED_ON'
const ALERTS_VIBRATE_TURNED_ON = 'ALERTS_VIBRATE_TURNED_ON'
const QUIET_HOURS_TURNED_ON = 'QUIET_HOURS_TURNED_ON'
const QUIET_HOURS_START = 'QUIET_HOURS_START'
const QUIET_HOURS_END = 'QUIET_HOURS_END'
const TIME_LIMIT_TURNED_ON = 'TIME_LIMIT_TURNED_ON'
const TIME_LIMIT_DAILY_WEEKLY = 'TIME_LIMIT_DAILY_WEEKLY'
const TIME_LIMIT_HOURS = 'TIME_LIMIT_HOURS'
const TIME_LEFT_IN_MS = 'TIME_LEFT_IN_MS'
const LAST_TRACKED_DATE = 'LAST_TRACKED_DATE'
const TIME_LIMIT_PREWARNING_SHOWN = 'TIME_LIMIT_PREWARNING_SHOWN'
const TIME_LIMIT_FINALWARNING_SHOWN = 'TIME_LIMIT_FINALWARNING_SHOWN'
const PHOTOS_IN_SWITCHER_TURNED_ON = 'PHOTOS_IN_SWITCHER_TURNED_ON'
const SAFE_FOR_WORK_ON = 'SAFE_FOR_WORK_ON'
const SAFE_FOR_WORK_TIME_START = 'SAFE_FOR_WORK_TIME_START'
const SAFE_FOR_WORK_TIME_END = 'SAFE_FOR_WORK_TIME_END'
const SAFE_FOR_WORK_LOCATION = 'LOCATION_SAFE_FOR_WORK'
const LOCATION_PERMISSION_DENIED = 'LOCATION_PERMISSION_DENIED'
const EXPLORE_ENABLED = 'EXPLORE_ENABLED'
const EXPLORE_LOCATION = 'EXPLORE_LOCATION'

@listener('LocalSettings')
@injectable()
export class LocalSettingsService
  extends DefaultBaseService<LocalSettingsModel, PeekableRecordManager<LocalSettingsModel, string>> {

  isTermsAccepted(): Promise<boolean> {
    return this.isCheck(IS_TERMS_ACCEPTED)
  }

  acceptTerms(): Promise<LocalSettingsModel> {
    return this.setCheck(IS_TERMS_ACCEPTED)
  }

  isGettingStartedShowed(): Promise<boolean> {
    return this.isCheck(GETTING_STARTED)
  }

  gettingStartedShow(): Promise<LocalSettingsModel> {
    return this.setCheck(GETTING_STARTED)
  }

  isAnyAccountExist(): Promise<boolean> {
    return this.isCheck(IS_ANY_ACCOUNT_EXIST)
  }

  @onEvent(EVENTS.login)
  @onEvent(EVENTS.newAccount)
  accountExist(): Promise<LocalSettingsModel> {
    return this.setCheck(IS_ANY_ACCOUNT_EXIST)
  }

  saveSession(session) {
    return this.setCheck(SESSION_TOKEN, session)
  }

  async getSession() {
    return (await this.getByPrimary(SESSION_TOKEN)).value
  }

  async getUserMetrics() {
    const metric = await this.getValue(USER_METRICS)
    return metric ? metric : 'Imperial'
  }

  setUserMetrics(metrics: string) {
    return this.saveValue(USER_METRICS, metrics)
  }

  isAlertsAllTurnedOn() {
    return this.isCheck(ALERTS_ALL_TURNED_ON)
  }

  setAlertsAllTurnedOn(val: boolean) {
    return this.setCheck(ALERTS_ALL_TURNED_ON, val === true ? 'yes' : 'no')
  }

  isAlertsNotificationsTurnedOn() {
    return this.isCheck(ALERTS_NOTIFICATIONS_TURNED_ON)
  }

  setAlertsNotificationsTurnedOn(val: boolean) {
    PreferencesUtil.putBoolean(ALERTS_NOTIFICATIONS_TURNED_ON, val)
    return this.setCheck(ALERTS_NOTIFICATIONS_TURNED_ON, val === true ? 'yes' : 'no')
  }

  isAlertsSoundTurnedOn() {
    return this.isCheck(ALERTS_SOUND_TURNED_ON)
  }

  setAlertsSoundTurnedOn(val: boolean) {
    PreferencesUtil.putBoolean(ALERTS_SOUND_TURNED_ON, val)
    return this.setCheck(ALERTS_SOUND_TURNED_ON, val === true ? 'yes' : 'no')
  }

  isAlertsVibrateTurnedOn() {
    return this.isCheck(ALERTS_VIBRATE_TURNED_ON)
  }

  setAlertsVibrateTurnedOn(val: boolean) {
    return this.setCheck(ALERTS_VIBRATE_TURNED_ON, val === true ? 'yes' : 'no')
  }

  async isQuietHoursTurnedOn() {
    return await this.getValue(QUIET_HOURS_TURNED_ON) === 'yes'
  }

  setQuietHoursTurnedOn(val: boolean) {
    PreferencesUtil.putBoolean(QUIET_HOURS_TURNED_ON, val)
    return this.setCheck(QUIET_HOURS_TURNED_ON, val === true ? 'yes' : 'no')
  }

  setQuietHoursStart(time: string) {
    const timeObj = JSON.parse(time)
    PreferencesUtil.putInt('QUIET_HOURS_START_HOURS', timeObj.hours)
    PreferencesUtil.putInt('QUIET_HOURS_START_MINUTES', timeObj.minutes)
    return this.saveValue(QUIET_HOURS_START, time)
  }

  getQuietHoursStart() {
    return this.getValue(QUIET_HOURS_START)
  }

  setQuietHoursEnd(time: string) {
    const timeObj = JSON.parse(time)
    PreferencesUtil.putInt('QUIET_HOURS_END_HOURS', timeObj.hours)
    PreferencesUtil.putInt('QUIET_HOURS_END_MINUTES', timeObj.minutes)
    return this.saveValue(QUIET_HOURS_END, time)
  }

  getQuietHoursEnd() {
    return this.getValue(QUIET_HOURS_END)
  }

  isTimeLimitTurnedOn() {
    return this.isCheck(TIME_LIMIT_TURNED_ON)
  }

  setTimeLimitTurnedOn(val: boolean) {
    if (val) {
      eventEmitter.emit(EVENTS.shouldStartTracking)
    }
    return this.setCheck(TIME_LIMIT_TURNED_ON, val === true ? 'yes' : 'no')
  }

  async getTimeLimitDailyWeekly() {
    const type = await this.getValue(TIME_LIMIT_DAILY_WEEKLY)
    return type ? type : 'Daily'
  }

  setTimeLimitDailyWeekly(val: string) {
    return this.saveValue(TIME_LIMIT_DAILY_WEEKLY, val)
  }

  async getTimeLimitHours(): Promise<number> {
    const hours = await this.getValue(TIME_LIMIT_HOURS)
    return hours ? +hours : 0
  }

  async setTimeLimitHours(hours: number) {
    await this.setTimeLeft(hours * 60 * 60 * 1000)
    await this.setTimeLimitFinalWarningShown(false)
    await this.setTimeLimitPrewarningShown(false)
    if (await this.isTimeLimitTurnedOn()) {
      eventEmitter.emit(EVENTS.shouldStartTracking)
    }
    return this.saveValue(TIME_LIMIT_HOURS, hours.toString())
  }

  getTimeLeft() {
    return this.getValue(TIME_LEFT_IN_MS)
  }

  setTimeLeft(time: number) {
    return this.saveValue(TIME_LEFT_IN_MS, time.toString())
  }

  getLastTrackedDate() {
    return this.getValue(LAST_TRACKED_DATE)
  }

  setLastTrackedDate(date: number) {
    return this.saveValue(LAST_TRACKED_DATE, date.toString())
  }

  async getTimeLimitPrewarningShown() {
    return await this.getValue(TIME_LIMIT_PREWARNING_SHOWN) === 'yes'
  }

  setTimeLimitPrewarningShown(val: boolean) {
    return this.saveValue(TIME_LIMIT_PREWARNING_SHOWN, val ? 'yes' : 'no')
  }

  async getTimeLimitFinalWarningShown() {
    return await this.getValue(TIME_LIMIT_FINALWARNING_SHOWN) === 'yes'
  }

  setTimeLimitFinalWarningShown(val: boolean) {
    return this.saveValue(TIME_LIMIT_FINALWARNING_SHOWN, val ? 'yes' : 'no')
  }

  isPhotosInSwitcherTurnedOn() {
    return this.isCheck(PHOTOS_IN_SWITCHER_TURNED_ON)
  }

  setPhotosInSwitcherTurnedOn(val: boolean) {
    return this.setCheck(PHOTOS_IN_SWITCHER_TURNED_ON, val === true ? 'yes' : 'no')
  }

  async getSafeForWorkTurnedOn() {
    const turndedOnString = await this.getValue(SAFE_FOR_WORK_ON)
    return turndedOnString === 'yes'
  }

  updateSafeForWorkTurnedOn(val: boolean) {
    const value = val ? 'yes' : 'no'
    this.saveValue(SAFE_FOR_WORK_ON, value)
  }

  getSafeForWorkTimeStart() {
    return this.getValue(SAFE_FOR_WORK_TIME_START)
  }

  updateSafeForWorkTimeStart(time: string) {
    this.saveValue(SAFE_FOR_WORK_TIME_START, time)
  }

  getSafeForWorkTimeEnd() {
    return this.getValue(SAFE_FOR_WORK_TIME_END)
  }

  updateSafeForWorkTimeEnd(time: string) {
    this.saveValue(SAFE_FOR_WORK_TIME_END, time)
  }

  async getSafeForWorkLocation() {
    const locationString = await this.getValue(SAFE_FOR_WORK_LOCATION)
    if (!!locationString) {
      return JSON.parse(locationString)
    }
    return null
  }

  updateSafeForWorkLocation = (location) => {
    return this.saveValue(SAFE_FOR_WORK_LOCATION, JSON.stringify(location))
  }

  async getExploreEnabled() {
    const turnedOnString = await this.getValue(EXPLORE_ENABLED)
    return turnedOnString === 'yes'
  }

  setExploreEnabled(val: boolean) {
    const value = val ? 'yes' : 'no'
    return this.saveValue(EXPLORE_ENABLED, value)
  }

  async getExploreLocation() {
    const locationString = await this.getValue(EXPLORE_LOCATION)
    if (!!locationString) {
      return JSON.parse(locationString)
    }
    return null
  }

  setExploreLocation = (location) => {
    return this.saveValue(EXPLORE_LOCATION, JSON.stringify(location))
  }

  updateLocationPermissionDenied = (denied: boolean) => {
    const value = denied ? 'yes' : 'no'
    return this.saveValue(LOCATION_PERMISSION_DENIED, value)
  }

  getLocationPermissionDenied = async () => {
    const val = await this.getValue(LOCATION_PERMISSION_DENIED)
    return val === 'yes'
  }

  saveValue(name: string, value: string) {
    return this.setCheck(name, value)
  }

  async getValue(name: string) {
    return (await this.getByPrimary(name)).value
  }

  saveCurrentProfileId(profileId) {
    return this.setCheck(CURRENT_PROFILE_ID, profileId)
  }

  async getCurrentProfileId() {
    return (await this.getByPrimary(CURRENT_PROFILE_ID)).value
  }

  async preload() {
    const TURNED_ON_BY_DEFAULT = [
      ALERTS_NOTIFICATIONS_TURNED_ON,
      ALERTS_SOUND_TURNED_ON,
      ALERTS_ALL_TURNED_ON,
      ALERTS_VIBRATE_TURNED_ON
    ]

    const TURNED_OFF_BY_DEFAULT = [
      PHOTOS_IN_SWITCHER_TURNED_ON,
      QUIET_HOURS_TURNED_ON,
      TIME_LIMIT_TURNED_ON
    ]

    const turn = (settings: string[], value = 'yes') => settings.map(async it => {
      const alertNotification = await this.getByPrimary(it)
      if (!alertNotification.value) {
        return alertNotification.set('value', value)
          .save()
      }
      return
    })

    return Promise.all(
      turn(TURNED_ON_BY_DEFAULT)
        .concat(turn(TURNED_OFF_BY_DEFAULT, 'no'))
    )
  }

  private findByPrimary(name): Promise<LocalSettingsModel | undefined> {
    return this.getRepo()
      .findRecord(`id = "${name}"`)
  }

  private createByPrimary(name): LocalSettingsModel {
    return this.getRepo()
      .createRecord()
      .set('id', name)
  }

  private async getByPrimary(name): Promise<LocalSettingsModel> {
    return (await this.findByPrimary(name)) || this.createByPrimary(name)
  }

  private async isCheck(name): Promise<boolean> {
    const check = await this.getByPrimary(name)
    return !!check && check.value === 'yes'
  }

  private async setCheck(name, value: string = 'yes'): Promise<LocalSettingsModel> {
    return await (await this.getByPrimary(name)).set('value', value)
      .save()
  }
}

const localSettingsService = new LocalSettingsService(LocalSettingsModel, CacheRepository)

export default localSettingsService
