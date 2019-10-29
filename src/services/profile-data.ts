import DefaultBaseService from './base/impl/default'
import ProfileDataModel from '../models/field-data/profile-data'
import Query from '../lib/smart-criteria/query'
import {injectable} from 'inversify'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import ProfileModel from '../models/profile'
import Restrictions from '../lib/smart-criteria/restrictions'
import SectionModel from '../models/section'
import FieldModel from '../models/field'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {LocalSettingsService} from './local-settings'
import {lazy} from '../annotations/inversify'


const FEET_IN_METER = 0.3048
const FEET_IN_MILE = 5280
const METERS_IN_KM = 1000

@injectable()
@listener('ProfileData')
@mixin([LogoutClearable])
export class ProfileDataService
  extends DefaultBaseService<ProfileDataModel, PeekableRecordManager<ProfileDataModel, Query>> {

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  getAllByProfile(profile: ProfileModel): Promise<ProfileDataModel[]> {
    return this.getAllByProfileId(profile.id)
  }

  getAllByProfileId(profileId: number): Promise<ProfileDataModel[]> {
    const query = new Query()
    query.add(Restrictions.equal('profileId', profileId))

    return this.getRepo()
               .find(query)
  }

  /**
   * Sync profile data with sections map.
   * Returns only new saved data records
   * @param {ProfileModel} profile
   * @param {SectionModel[]} sectionList
   * @returns {Promise<ProfileDataModel>}
   */
  async prepareProfile(profile: ProfileModel, sectionList: SectionModel[]): Promise<ProfileDataModel[]> {
    const profileDataList = await this.getAllByProfile(profile)
    const profileDataListPromise: Array<Promise<ProfileDataModel>> =
      sectionList.reduce((acc, it: SectionModel) =>
                   acc.concat(it.subSections.map(ss => ss.fields)), [] as any[]
                 )
                 .filter((f: FieldModel) => !profileDataList.find(pd => pd.field === f))
                 .map((it: FieldModel) => this.createNew(it, profile))
                 .map((it: ProfileDataModel) => it.save())

    return Promise.all(profileDataListPromise)
  }

  preloadForProfile(profile: ProfileModel) {
    return this.getAllByProfile(profile)
  }

  async getForField(field: FieldModel, profile: ProfileModel): Promise<ProfileDataModel> {
    return (await this.getRepo()
                      .peekRecord(`field.id = ${field.id} AND profileId = ${profile.id}`))
      || this.createNew(field, profile)
  }

  createNew(field: FieldModel, profile: ProfileModel): ProfileDataModel {
    return this.getRepo()
               .createRecord()
               .set('field', field)
               .set('profileId', profile.id)
               .set('fieldValues', [])
  }

  getDistanceToDisplay = async (distance: number) => {
    const metrics = await this.localSettingsService.getUserMetrics()
    return this.getDistanceToDisplaySync(distance, metrics)
  }

  getDistanceToDisplaySync = (distance: number, metrics: string) => {
    if (distance >= 0) {
      if (metrics === 'Metric') {
        return this.getDistanceMetric(distance)
      }
      return this.getDistanceImperial(distance)
    }
    return null
  }

  private getDistanceMetric = (distance: number) => {
    const meters = distance
    if (meters < 100) {
      return '<100 meters'
    }

    if (meters < METERS_IN_KM) {
      return Math.round(meters) + ' meters'
    }

    return Math.round(meters / METERS_IN_KM) + ' km'
  }

  private getDistanceImperial = (distance: number) => {
    const feet = distance / FEET_IN_METER
    if (feet < 250) {
      return '<250 feet'
    }

    if (feet < FEET_IN_MILE) {
      return Math.round(feet) + ' feet'
    }

    if (feet < (FEET_IN_MILE * 10)) {
      return this.round((feet / FEET_IN_MILE), 1) + ' miles'
    }

    return Math.round(feet / FEET_IN_MILE) + 'mi'
  }

  round = (val: number, precision: number) => {
    const factor = Math.pow(10, precision)
    const tempNumber = val * factor
    const roundedTempNumber = Math.round(tempNumber)
    return roundedTempNumber / factor
  }
}

const profileDataService = new ProfileDataService(ProfileDataModel)

export default profileDataService
