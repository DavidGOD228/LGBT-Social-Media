import {injectable} from 'inversify'
import {LogoutClearable} from './mixins/logout-clearable'
import {mixin} from '../annotations/common'
import {listener} from '../annotations/event'
import {ProfileService} from './profile'
import {lazy} from '../annotations/inversify'
import MediaRequestModel, {MediaRequestType} from '../models/media-request'
import DefaultBaseService from './base/impl/default'
import PeekableRecordManager from '../repositories/base/peekable-record-manager'
import Query from '../lib/smart-criteria/query'
import Restrictions from '../lib/smart-criteria/restrictions'
import AlbumModel from '../models/album'
import {AlbumService} from './album'
import Fetch from '../utils/fetch'
import configuration from '../configs/index'

@injectable()
@listener('MediaRequest')
@mixin([LogoutClearable])
export class MediaRequestService
  extends DefaultBaseService<MediaRequestModel, PeekableRecordManager<MediaRequestModel, Query>> {

  @lazy('ProfileService')
  protected profileService: ProfileService

  @lazy('AlbumService')
  protected albumService: AlbumService

  async getByPrimary(key: number) {
    // return await this.getRepo()
    //                  .peekByPrimary(key) || await this.getRepo()
    //                                                   .findByPrimary(key)
    return await this.getRepo()
                     .findByPrimary(key)
  }

  getOutboundActiveRequest(profileId: number, album: AlbumModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.getActiveRequest(activeProfileId, profileId, album)
  }

  newOutboundRequest(profileId: number, album: AlbumModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.newRequest(activeProfileId, profileId, album)
  }

  async getInboundPhotoActiveRequest(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()
    const album = await this.albumService.getPhotoForProfile(activeProfileId)
    return this.getInboundActiveRequest(profileId, album)
  }

  async getInboundVideoActiveRequest(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()
    const album = await this.albumService.getVideoForProfile(activeProfileId)
    return this.getInboundActiveRequest(profileId, album)
  }

  async newInboundPhotoRequest(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()
    const album = await this.albumService.getPhotoForProfile(activeProfileId)
    return this.newInboundRequest(profileId, album)
  }

  async newInboundVideoRequest(profileId: number) {
    const activeProfileId = this.profileService.getActiveProfileId()
    const album = await this.albumService.getVideoForProfile(activeProfileId)
    return this.newInboundRequest(profileId, album)
  }

  getInboundActiveRequestReverse(profileId: number, album: AlbumModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.getActiveRequest(profileId, activeProfileId, album, 'INBOUND')
  }

  cancel(mediaRequestId) {
    return Fetch.post(configuration.remoteApi.base + `/media-requests/${mediaRequestId}/cancel`, {})
  }

  private getInboundActiveRequest(profileId: number, album: AlbumModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.getActiveRequest(activeProfileId, profileId, album, 'INBOUND')
  }

  private newInboundRequest(profileId: number, album: AlbumModel) {
    const activeProfileId = this.profileService.getActiveProfileId()

    return this.newRequest(activeProfileId, profileId, album, 'INBOUND')
  }

  private newRequest(
    sourceProfileId,
    targetProfileId,
    album: AlbumModel,
    direction: MediaRequestType = 'OUTBOUND'
  ) {
    return this.getRepo()
               .createRecord()
               .set('sourceProfileId', sourceProfileId)
               .set('targetProfileId', targetProfileId)
               .set('album', album)
               .set('type', direction)
               .set('status', 'AWAITING')
               .save()
  }

  private getActiveRequest(
    sourceProfileId,
    targetProfileId,
    album: AlbumModel,
    direction: MediaRequestType = 'OUTBOUND'
  ) {
    const query = new Query()

    query.add(Restrictions.equal('sourceProfileId', sourceProfileId))
         .add(Restrictions.equal('targetProfileId', targetProfileId))
         .add(Restrictions.equal('album.id', album.id))
         .add(Restrictions.equal('type', direction))
         .add(Restrictions.notEqual('status', 'CANCELED'))
         .setSort(Restrictions.desc('id'))

    return this.getRepo()
               .findRecord(query)
  }

}

const mediaRequestService = new MediaRequestService(MediaRequestModel)

export default mediaRequestService
