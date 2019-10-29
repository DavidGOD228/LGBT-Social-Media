import DefaultBaseService from './base/impl/default'
import AccountModel from '../models/account'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import configuration from '../configs/index'
import Fetch from '../utils/fetch'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import {EVENTS} from '../configs/dicts'
import {
  listener,
  onEvent,
  promiseEmit
} from '../annotations/event'
import Cookie from 'react-native-cookie'
import {lazy} from '../annotations/inversify'
import {LocalSettingsService} from './local-settings'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {ProfileService} from './profile'
import Restrictions from '../lib/smart-criteria/restrictions'
import SafeForWork from '../utils/safe-for-work'
import {
  NativeModules,
  PermissionsAndroid,
  Platform
} from 'react-native'
import serviceRegistry from './base/-registry'

const SettingsLinkModule = NativeModules.SettingsLinkModule

@injectable()
@listener('Account')
@mixin([LogoutClearable])
export class AccountService extends DefaultBaseService<AccountModel, PeekableRecordManager<AccountModel, Query>> {

  static geoLocationReport({coords}: Position) {
    return Fetch.put(configuration.remoteApi.base + '/geo-locations', coords)
  }

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('ProfileService')
  private profileService: ProfileService

  @promiseEmit(EVENTS.newAccount)
  createNew(email: string, password: string): Promise<AccountModel> {
    return this.getRepo()
      .createRecord()
      .set('email', email)
      .set('password', password)
      .save()
      .catch(async error => {
        error = await error.json()
        throw {email: [error.errors.Error]}
      })
  }

  @promiseEmit(EVENTS.login)
  login(username, password): Promise<Response> {
    return Fetch.post(configuration.remoteApi.common + '/login', {
      username,
      password
    })
      .then(async res => {
        // await this.profileService.restoreActive()
        // await Promise.all(serviceRegistry.values()
        //   .map(it => it.preload()))
        return res
      })
      .catch(async error => {
        const parsed = await error.json()
        throw {server: [parsed.message]}
      })
  }

  async saveLoginData() {
    await this.profileService.restoreActive()
    await Promise.all(serviceRegistry.values()
      .map(it => it.preload()))
  }

  @promiseEmit(EVENTS.logout)
  logout(): Promise<Response> {
    return Fetch.get(configuration.remoteApi.common + '/logout')
      .catch(() => Promise.resolve())
  }

  @promiseEmit(EVENTS.resendConfirmation)
  resendConfirmation(email) {
    return Fetch.post(configuration.remoteApi.base + '/accounts/resend', {
      email
    })
      .catch(error => console.log(error))
  }

  getCurrent() {
    return this.getRepo()
      .findByPrimary('me')
  }

  deleteCurrent() {
    return Fetch.delete(configuration.remoteApi.base + '/accounts/me')
      .catch(error => console.log(error))
  }

  @onEvent(EVENTS.login)
  saveAuthToken() {
    return Cookie.get(configuration.remoteApi.common, 'SESSION')
      .then(session => this.localSettingsService.saveSession(session))
  }

  restoreAuthToken() {
    return this.localSettingsService.getSession()
      .then(session => Cookie.set(configuration.remoteApi.common, 'SESSION', session))
  }

  isLogged() {
    return this.getCurrent()
      .catch(() => false)
  }

  async preload() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'MUSL needs location permission',
            message: 'MUSL needs access to your location to provide best experience'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.subscribeForGeoLocationChanges()
        } else {
          throw new Error('Location not available')
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      this.subscribeForGeoLocationChanges()
    }
    setInterval(this.initCheck, 15000)
  }

  forceLocationUpdate = () => {
    this.reportCurrentPosition(true)
  }

  initCheck = async () => {
    this.forceLocationUpdate()
  }

  getByEmail(email: string) {
    const query = new Query()
    query.add(Restrictions.equal('email', email))
    return this.getRepo()
      .findRecord(query)
  }

  async getByProfile(profileId: number) {
    const maybeProfile = await this.getRepo()
      .peekRecord(`profiles.id = ${profileId}`)
    if (maybeProfile) {
      return maybeProfile
    }

    const query = new Query()
    query.add(Restrictions.contain('profiles.id', profileId))
    return this.getRepo()
      .findRecord(query)
  }

  async onPositionUpdated(position: Position, forceUpdate?: boolean) {
    const REPORTING_DISTANCE_THRESHOLD = 50 // meters
    let location
    try {
      location = JSON.parse(await this.localSettingsService.getValue('LOCATION'))
    } catch (err) {
      console.log('location', err)
    }

    const lastKnownLatitude = (location && location.latitude) || 0
    const lastKnownLongitude = (location && location.longitude) || 0

    const distance = this.distanceInMetersBetweenEarthCoordinates(
      lastKnownLatitude, lastKnownLongitude,
      position.coords.latitude, position.coords.longitude
    )
    this.saveLocation(position)

    const isSFWEnabled = await SafeForWork.isFakeLocationEnabled()

    if (isSFWEnabled) {

      const fakeLocation = await this.localSettingsService.getSafeForWorkLocation()

      if (fakeLocation) {
        AccountService.geoLocationReport({
          ...position,
          coords: {
            ...position.coords,
            latitude: fakeLocation.latitude,
            longitude: fakeLocation.longitude
          }
        })
        return
      }
    }

    if (distance > REPORTING_DISTANCE_THRESHOLD || forceUpdate) {
      AccountService.geoLocationReport(position)
    }

  }

  resetPassword(email: string) {
    return Fetch.post(configuration.remoteApi.base + '/accounts/reset-password-email', {
      email
    })
  }

  async reportCurrentPosition(forceUpdate?: boolean) {
    if (Platform.OS === 'android') {
      const locationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (!locationGranted) {
        return
      }
    }

    try {
      navigator.geolocation.getCurrentPosition(
        pos => this.onPositionUpdated(pos, forceUpdate),
        this.onFailedToUpdatePosition,
        {
          enableHighAccuracy: false
        }
      )
    } catch (error) {
      console.log('geolocation.getCurrentPosition', error)
    }
  }

  onFailedToUpdatePosition = (error: PositionError) => {
    console.log('onFailedToUpdatePosition', error)
    if (error.code === error.PERMISSION_DENIED) {
      return
    }
  }

  isLocationPermissionDenied = async (): Promise<'approved' | 'denied' | 'serviceTurnedOff'> => {
    if (Platform.OS === 'android') {
      return await this.isLocationPermissionDeniedAndroid()
    }
    return this.isLocationPermissionDeniedIOS()
  }

  private async subscribeForGeoLocationChanges() {
    if (Platform.OS === 'android') {
      const locationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (!locationGranted) {
        return
      }
    }

    navigator.geolocation.watchPosition(
      pos => this.onPositionUpdated(pos),
      this.onFailedToUpdatePosition,
      {
        enableHighAccuracy: false
      }
    )
  }

  private isLocationPermissionDeniedIOS = (): Promise<'approved' | 'denied' | 'serviceTurnedOff'> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve('approved')
          console.log(pos)
        },
        error => {
          if (error.code === error.PERMISSION_DENIED) {
            resolve('denied')
            return
          }
          if (error.code === error.POSITION_UNAVAILABLE) {
            resolve('serviceTurnedOff')
            return
          }
          resolve('approved')
        },
        {
          enableHighAccuracy: false
        }
      )
    })
  }

  private isLocationPermissionDeniedAndroid = async (): Promise<'approved' | 'denied' | 'serviceTurnedOff'> => {
    let serviceAvailable = false
    try {
      serviceAvailable = await SettingsLinkModule.isLocationServicesEnabled();
    } catch (e) {
      console.log('Failed to obtain location service', e.getMessage())
    }

    if (!serviceAvailable) {
      return 'serviceTurnedOff'
    }

    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    return granted ? 'approved' : 'denied'
  }

  private degreesToRadians(degrees) {
    return degrees * Math.PI / 180
  }

  private distanceInMetersBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371

    const dLat = this.degreesToRadians(lat2 - lat1)
    const dLon = this.degreesToRadians(lon2 - lon1)

    lat1 = this.degreesToRadians(lat1)
    lat2 = this.degreesToRadians(lat2)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (earthRadiusKm * c) * 1000
  }

  private saveLocation(position: Position) {
    this.localSettingsService.saveValue('LOCATION', JSON.stringify(position.coords))
  }
}

const accountService = new AccountService(AccountModel)

export default accountService
