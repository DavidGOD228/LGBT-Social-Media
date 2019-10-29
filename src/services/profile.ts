import DefaultBaseService from './base/impl/default'
import ProfileModel, {ProfileType} from '../models/profile'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {AccountService} from './account'
import {lazy} from '../annotations/inversify'
import {
  listener,
  onEvent,
  postEmit,
  promiseEmit
} from '../annotations/event'
import {EVENTS} from '../configs/dicts'
import MediaModel from '../models/media'
import {ProfileTypeService} from './profile-type'
import {mixin} from '../annotations/common'
import {LogoutClearable} from './mixins/logout-clearable'
import {LocalSettingsService} from './local-settings'
import Fetch from '../utils/fetch'
import configuration from '../configs/index'
import Restrictions from '../lib/smart-criteria/restrictions'
import {CounterStats} from '../dto/conter-stats'

@injectable()
@listener('Profile')
@mixin([LogoutClearable])
export class ProfileService extends DefaultBaseService<ProfileModel, PeekableRecordManager<ProfileModel, Query>> {

  private activeProfile?: ProfileModel

  @lazy('AccountService')
  private accountService: AccountService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('ProfileTypeService')
  private profileTypeService: ProfileTypeService

  async getForCurrent(): Promise<ProfileModel[]> {
    const account = await this.accountService.getCurrent()
    return account ? [...account.profiles] : []
  }

  @promiseEmit(EVENTS.newProfile)
  async createNew(name: string, media: MediaModel, type: string): Promise<ProfileModel> {
    const profileType = await this.profileTypeService.getByCode(type)

    if (!profileType) {
      throw new Error(`there is no such profile type: ${type}`)
    }

    return this.getRepo()
               .createRecord()
               .set('nickname', name)
               .set('mediaId', media.id)
               .set('profileType', profileType)
               .save()
  }

  @onEvent(EVENTS.newProfile)
  activateNewProfile(profile: ProfileModel) {
    this.activate(profile)
  }

  @postEmit(EVENTS.activeProfilesChanged)
  @promiseEmit(EVENTS.activeProfileSelected)
  async activate(profile: ProfileModel) {
    this.activeProfile = profile

    await Fetch.customRequest(
      `${configuration.remoteApi.base}/profiles/${profile.id}/activate`,
      {method: 'put'}
    )
    await this.getForCurrent()
  }

  @postEmit(EVENTS.activeProfilesChanged)
  async activateByType(profileType: ProfileType) {
    const profiles = await this.getForCurrent()
    const newActive = profiles.find(it => it.profileType.code === profileType) || profiles.pop()
    if (newActive) {
      await this.activate(newActive)
    }
    return Promise.resolve()
  }

  getActive(): ProfileModel | undefined {
    return this.activeProfile
  }

  getActiveProfileId(): number {
    const activeProfile = this.activeProfile
    if (!activeProfile) {
      throw new Error('no active profile')
    }

    return activeProfile.id
  }

  @onEvent(EVENTS.activeProfilesChanged)
  persistActive() {
    const active = this.getActive()
    if (!active) {
      return
    }
    const value = JSON.stringify(active.id)
    return this.localSettingsService.saveValue('activeProfiles', value)
  }

  async getByPrimary(profileId) {
    return await this.getRepo()
                     .peekByPrimary(profileId) || await this.getRepo()
                                                            .findByPrimary(profileId)
  }

  getByPrimaryList(profileIds: number[]) {
    const query = new Query()
    query.add(Restrictions.contain('id', profileIds))

    return this.getRepo()
               .find(query)
  }

  async getDefaultActive(id?: number): Promise<ProfileModel | undefined> {
    const profiles = await this.getForCurrent()
    return profiles.find(it => it.id === id) || profiles.pop()
  }

  @onEvent(EVENTS.login)
  async restoreActive() {
    const text = await this.localSettingsService.getValue('activeProfiles')
    const value: number = text ? JSON.parse(text) : 0
    const activeProfile = await this.getDefaultActive(value)
    if (activeProfile) {
      this.activate(activeProfile)
    }
  }

  async preload() {
    return this.restoreActive()
  }

  // todo: extract to separate entity
  getStatistics() {
    const activeProfileId = this.getActiveProfileId()

    return Fetch.get(configuration.remoteApi.base + `/statistics/${activeProfileId}`)
                .then(res => res.response.objects.pop())
  }

  share(profileId: number, body: { FRIEND: boolean, FLIRT: boolean, FUN: boolean }) {
    const activeProfileId = this.getActiveProfileId()
    return Promise.all([
      Fetch.put(configuration.remoteApi.base + `/profile-shares/${activeProfileId}/${profileId}`, body),
      Fetch.put(configuration.remoteApi.base + `/profile-shares/${profileId}/${activeProfileId}`, body)
    ])
  }

  getShare(profileId): Promise<{ FRIEND: boolean, FLIRT: boolean, FUN: boolean }> {
    const activeProfileId = this.getActiveProfileId()
    return Fetch.get(configuration.remoteApi.base + `/profile-shares/${activeProfileId}/${profileId}`)
                .then(res => res.response.objects.pop())
  }

  async getCommunityDtoByProfileId(profileId: number, blocked?: boolean) {

    const trueLocation = JSON.parse(await this.localSettingsService.getValue('LOCATION'))
    const isExploreEnabled = await this.localSettingsService.getExploreEnabled()
    const exploreLocation = await this.localSettingsService.getExploreLocation()

    let latitude = trueLocation.latitude
    let longitude = trueLocation.longitude
    if (isExploreEnabled && exploreLocation) {
      latitude = exploreLocation.latitude
      longitude = exploreLocation.longitude
    }

    const params = {
      'ignore-blocks': !!blocked,
      'lat': latitude,
      'lon': longitude
    }

    return Fetch.get(configuration.remoteApi.base + `/community-views/${profileId}`, params)
                .then(res => res.response.objects.pop())
                .catch(res => res.status === 403 ? null : -1)
  }

  getCommunityDtoByProfileIdList(profileIdList: number[], blocked?: boolean) {
    const communityDtoPromiseList = profileIdList.map(it => this.getCommunityDtoByProfileId(it, blocked))
    return Promise.all(communityDtoPromiseList)
  }

  getStats(profileId?: number): Promise<CounterStats> {
    return this.getStatsByProfileId(profileId || this.getActiveProfileId())
  }

  updateStealthModeStatus = async (enabled: boolean) => {
    const response = await Fetch.customRequest(
      `${configuration.remoteApi.base}/profiles/stealth-mode?invisible=${enabled}`, {method: 'put'}
    )
    console.log('STEALTHMODE', response)
    const profiles = await this.getForCurrent()
    profiles.forEach(profile => profile.update())
  }

  reportUser = (myProfileId: number,
                targetProfileId: number,
                harassingMe: boolean,
                wrongUniverse: boolean,
                inappropriateBehavior: boolean,
                otherReason: string) => {
    return Fetch.post(`${configuration.remoteApi.base}/user_reports/register`, {
      sourceProfileId: myProfileId,
      targetProfileId: targetProfileId,
      harassingMe: harassingMe,
      wrongUniverse: wrongUniverse,
      inappropriateBehavior: inappropriateBehavior,
      otherReason: otherReason
    })
  }

  private getStatsByProfileId(profileId: number): Promise<CounterStats> {
    return Fetch.get(configuration.remoteApi.base + `/profiles/${profileId}/unread-stat`)
                .then(res => res.response.objects.pop())
  }

}

const profileService = new ProfileService(ProfileModel)

export default profileService
