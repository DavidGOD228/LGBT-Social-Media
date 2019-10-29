import React from 'react'
import {
  Animated,
  Dimensions,
  ImageURISource,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native'
import DefaultHeader from '../../../components/global/default-header'
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges'
import NavigationTextButtonBlue from '../../../components/global/bottom-navigation/text-button-blue'
import i18n from '../../../locales/i18n'
import NavigationTextButtonWhite from '../../../components/global/bottom-navigation/text-button-white'
import {NavigationScreenProp} from 'react-navigation'
import SetupProfileScreenValues from '../../../components/profile/setup/profile-values'
import SetupFriendProfileValues from '../../../components/profile/setup/profile-friend-values'
import SetupFunProfileValues from '../../../components/profile/setup/profile-fun-values'
import SetupFlirtProfileValues from '../../../components/profile/setup/profile-flirt-values'
import UiBlockBasic from '../../../components/ui/block/basic'
import UiBlockSpace from '../../../components/ui/block/space'
import CollapsingSection from '../../../components/collapsing-section'
import TextNormal from '../../../components/global/text/basic/text-normal'
import MuslImagePicker from '../../../utils/musl-image-picker'
import BaseScreenDefault from '../../base/base-scene'
import {lazy} from '../../../annotations/inversify'
import {SectionService} from '../../../services/section'
import ProfileModel from '../../../models/profile'
import SectionModel from '../../../models/section'
import SectionComponent from './setup-profile-details-screen/section'
import {comparator} from '../../../utils/number'
import {AlbumService} from '../../../services/album'
import {PickerImage} from '../../../utils/media-picker'
import {MediaService} from '../../../services/media'
import ProfileImages from '../../../components/profile/setup/profile-images'
import AlbumMediaModel from '../../../models/album-media'
import AlbumModel from '../../../models/album'
import {ProfileDataService} from '../../../services/profile-data'
import NavigateToProfileHub from '../../base/navigate-to-profile-hub'
import {mixin} from '../../../annotations/common'
import ProfileDataModel from '../../../models/field-data/profile-data'
import ProfileSetupProcessIndicator from '../../../components/profile/setup/process-indicator'
import ProfileHeader from '../../../components/profile/edit/profile-header'
import SubSectionModel from '../../../models/sub-section'
import FieldModel from '../../../models/field'
import PopupSlideTop from '../../../components/global/popup/popup-slide-top'
import PopupContent from '../../../components/global/popup/content'
import PopupButton from '../../../components/global/popup/button'
import PopupTwoButtonsContainer from '../../../components/global/popup/two-buttons-container'
import routeConfig from '../../../router'
import {ProfileService} from '../../../services/profile'
import NavigateWithResetToProfileHub from '../../base/navigate-with-reset-to-profile-hub'
import LinkProfileSection from './setup-profile-details-screen/link-profile-section'
import PopupHeader from '../../../components/global/popup/header'
import PopupSlideBottom from '../../../components/global/popup/popup-slide-bottom'
import {LinkedProfileService} from '../../../services/linked-profile'
import {AccountService} from '../../../services/account'
// import ProfileVideo from '../../../components/profile/setup/profile-video'
import VideoClipper from '../../../components/video/video-clipper'
import UiBlockHorizontal from '../../../components/ui/block/horizontal'
import UiBlockSpaceHorizontal from '../../../components/ui/block/space-horizontal'
import {EVENTS} from '../../../configs/dicts'
import eventEmitter from '../../../utils/event-emitter'
import KeyboardAvoidingWrapper from '../../../components/keyboard-avoiding-wrapper'
import {RabbitCredentialService} from '../../../services/rabbit-credential'
import Image = Animated.Image
import {LocalSettingsService} from "../../../services/local-settings";

// const YEARS_18 = 568036800000;


interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  profileComplete: number
  firstLaunch: boolean
  profile: ProfileModel
  profileData: ProfileDataModel[]
  sections: SectionModel[]
  photoMedia: AlbumMediaModel[]
  videoMedia: AlbumMediaModel[]
  albumMedia: AlbumMediaModel
  photoAlbum: AlbumModel
  videoAlbum: AlbumModel
  metricsType: string
  mediaIsForbidden: boolean
  nickNameIsEditing: boolean
  nickNameIsEmpty: boolean
  showDeletePhotoPopup: boolean
  messages: number
  notifications: number
  showVideoTrimmer: boolean
  videoSource: any
  showSpinner: boolean;
  isPhotoLoaded: boolean;
  spinnerText: string;
  link: {
    requestSent: boolean
    requestAccepted: boolean
    partnerEmail: string
    partnerNickname: string
    error: any
    unlinkPopupVisible: boolean
    avatar?: ImageURISource
    profileId?: number
  }
  keyboardOffset: number
  subscription?: { unsubscribe() }
}

@mixin([NavigateToProfileHub])
@mixin([NavigateWithResetToProfileHub])
export default class SetupProfileDetailsScreen extends BaseScreenDefault<Props, State>
  implements NavigateToProfileHub, NavigateWithResetToProfileHub {
  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  navigateToProfileHub: () => void
  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  muslImagePicker: MuslImagePicker
  profileScreenValues: SetupProfileScreenValues
  oldName: string

  @lazy('SectionService')
  private sectionService: SectionService

  @lazy('AlbumService')
  private albumService: AlbumService

  @lazy('MediaService')
  private mediaService: MediaService

  @lazy('ProfileDataService')
  private profileDataService: ProfileDataService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('AccountService')
  private accountService: AccountService

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  @lazy('LinkedProfileService')
  private linkedProfileService: LinkedProfileService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)

    const params = this.props.navigation.state.params
    const profile: ProfileModel = params.profile

    this.state = {
      ...this.state,
      profileComplete: 0.5,
      profile,
      firstLaunch: params.firstLaunch || false,
      mediaIsForbidden: false,
      nickNameIsEditing: false,
      nickNameIsEmpty: false,
      showDeletePhotoPopup: false,
      messages: 0,
      notifications: 0,
      showSpinner: false,
      isPhotoLoaded: false,
      spinnerText: 'Upload Photo',
      link: {
        requestSent: false,
        requestAccepted: false,
        partnerNickname: 'mike',
        partnerEmail: 'mike@gmail.com',
        error: null,
        unlinkPopupVisible: false
      },
      keyboardOffset: 0
    }

    this.getSections(profile)
        .then(sections => {
          this.setSpecState('sections', sections);
          this.setSpecState('isPhotoLoaded', true);
        })

    this.getPhotos(profile)
        .then(photoMedia => this.setSpecState('photoMedia', photoMedia))

    this.getVideos(profile)
        .then(videoMedia => this.setSpecState('videoMedia', videoMedia))

    this.prepareProfileData()
        .then(profileData => {
          this.setSpecState('profileData', profileData)
        })

    this.syncCounters()

    this.syncLinkedProfile()

    this.getMetricsType();

    this.muslImagePicker = new MuslImagePicker()
    this.oldName = profile.nickname

    // todo: refactor in favor of strategy
    if (profile.profileType.code === 'FLIRT') {
      this.profileScreenValues = new SetupFlirtProfileValues()
    }
    if (profile.profileType.code === 'FUN') {
      this.profileScreenValues = new SetupFunProfileValues()
    }
    if (profile.profileType.code === 'FRIEND') {
      this.profileScreenValues = new SetupFriendProfileValues()
    }
  }

  private get profileLabel() {
    return this.profileScreenValues.getProfileLabel()
  }

  private get screenTitle() {
    return i18n.t('profile.details.screenTitle')
  }

  componentDidMount() {
    this.rabbitCredentialService.onReady(
      service => service.subscribe('NEW_NOTIFICATION', this.syncCounters)
                        .then(it => this.setSpecState('subscription', it))
    )
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe()
    }
  }

  deleteUserPictureButtonPressed = (albumMedia: AlbumMediaModel) => {
    this.setSpecState('showDeletePhotoPopup', true)
    this.setSpecState('albumMedia', albumMedia)
  }

  dismissDeleteUserPictureButtonPressed = () => {
    this.setSpecState('showDeletePhotoPopup', false)
  }

  confirmDeleteUserPictureButtonPressed = () => {
    this.setSpecState('showDeletePhotoPopup', false)
    this.setSpecState('photoMedia', this.state.photoMedia.filter(it => it !== this.state.albumMedia))
    this.setSpecState('videoMedia', this.state.videoMedia.filter(it => it !== this.state.albumMedia))
    return this.state.albumMedia.deleteRecord()
  }

  backButtonPress = () => {
    eventEmitter.emitAsync(EVENTS.editProfileScreenClosed)
                .then(() => this.props.navigation.goBack())
                .catch((error) => {
                  console.log(error)
                  this.props.navigation.goBack()
                })
  }

  nextButtonPress = () => {
    eventEmitter.emitAsync(EVENTS.editProfileScreenClosed)
                .then(() => this.navigateToProfileHub())
                .catch((error) => {
                  console.log(error)
                  this.navigateToProfileHub()
                })
  }

  completeProfile = async () => {
      this.state.profile.set('completed', true)
      await this.state.profile.save()

      // navigate anyway
      this.navigateToCommunityView()
  }

  userImageSelected = (images: PickerImage[]) => {
    return this.uploadPhoto(images, true)
  }

  userVideoSelected = (video) => {
    if (Platform.OS === 'android') {
      this.setState({
        ...this.state,
        videoSource: video,
        showVideoTrimmer: true
      })
    } else {
      return this.uploadVideo(video.path)
                 .then(() => {
                   this.updateVideoMedia()
                 })
    }
    return
  }

  updateVideoMedia = () => {
    this.getVideos(this.state.profile)
        .then(videoMedia => this.setSpecState('videoMedia', videoMedia))
  }

  linkProfileSubmitPressed = async (email: string, nickname: string) => {
    console.log('nickname: ' + nickname)

    if (email.length === 0 && nickname.length === 0) {
      return
    }

    try {
      if (email) {
        return await this.showLinkRequestSent((email || '').toLowerCase())
      }
    } catch (error) {
      console.log('some error during linking')
    }

    return this.showLinkProfileError()

  }

  unlinkProfilePressed = () => {
    this.showUnlinkPopup()
  }

  confirmUnlinkProfile = () => {
    this.unlinkProfile()
  }

  onLinkedProfilePress = () => {
    this.goToProfile()
  }

  onTextInputPressed = () => {
    this.enableTextInput()
  }

  onMetricChanged = (type: string) => {
    this.localSettingsService.setUserMetrics(type)
    this.setSpecState('metricsType', type)
    console.log(type, "METRIC TYPE!!!!!!!")
  }

  async goToProfile() {
    const communityDto = await this.profileService.getCommunityDtoByProfileId(this.state.link.profileId!)
    if (communityDto === -1) {
      return
    }
    return this.props.navigation.navigate(routeConfig.profileView.name, {profile: {item: communityDto}})
  }

  render() {
    console.log(this.state.sections, 'this.state.sectionsthis.state.sections =====')
    return (
      <View style={styles.container}>
        <UiBlockBasic style={styles.navigationHeader}>
          <UiBlockSpace height={10}/>
          <UiBlockHorizontalEdges>
            <TouchableOpacity onPress={this.nextButtonPress}>
              <UiBlockHorizontal>
                <Image style={styles.navigationArrow} source={require('Musl/images/messages/back-arrow.png')}/>
                <UiBlockSpaceHorizontal width={8}/>
                <UiBlockBasic>
                  <UiBlockVerticalCenter>
                    <TextNormal style={styles.navigationTitle}>My Profiles</TextNormal>
                  </UiBlockVerticalCenter>
                </UiBlockBasic>
              </UiBlockHorizontal>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.completeProfile} disabled={this.state.nickNameIsEmpty}>
              <UiBlockHorizontal>
                <UiBlockBasic>
                  <UiBlockVerticalCenter>
                    <TextNormal style={
                      [styles.navigationTitle, this.state.nickNameIsEmpty && styles.navTitleDisabled]}>Save</TextNormal>
                  </UiBlockVerticalCenter>
                </UiBlockBasic>
                <UiBlockSpaceHorizontal width={8}/>
                <Image style={styles.navigationArrow}
                       source={require('Musl/images/profile/icon-checkmark-save.png')}/>
              </UiBlockHorizontal>
            </TouchableOpacity>
          </UiBlockHorizontalEdges>
          <UiBlockSpace height={10}/>
        </UiBlockBasic>

        <KeyboardAvoidingWrapper style={styles.container}
                                 behavior="position"
                                 keyboardVerticalOffset={this.state.keyboardOffset}>
          <ScrollView>
            <StatusBar barStyle="light-content"/>
            {this.renderProfileHeader()}
            <UiBlockBasic style={styles.content}>
              {this.renderProcessComponent()}
              <CollapsingSection title={i18n.t('profile.details.sections.Media.name')}
                                 completed={this.getMediaSectionCompleted()}>
                <UiBlockSpace height={10}/>
                {this.state.photoAlbum && this.state.isPhotoLoaded && !this.state.showSpinner ? (
                  <ProfileImages images={this.state.photoMedia}
                                 containerWidth={this.photosContainerWidth}
                                 imageSelected={this.userImageSelected}
                                 onDeleteBtnPress={this.deleteUserPictureButtonPressed}
                                 muslImagePicker={this.muslImagePicker}/>
                ) : null}
                {
                  this.state.showSpinner ?
                    <ActivityIndicator size="large" color="#0000ff" /> : null
                }
                <UiBlockSpace height={10}/>
                <TextNormal style={{textAlign: 'center'}}>
                  {i18n.t('profile.details.sections.Media.description')}
                </TextNormal>
                <UiBlockSpace height={10}/>

                {/*{this.state.videoAlbum ? (
                 <ProfileVideo video={this.state.videoMedia}
                 containerWidth={this.photosContainerWidth}
                 videoSelected={this.userVideoSelected}/>
                 ) : null}*/}

              </CollapsingSection>
              {/*section list*/}
              {this.sectionDataValid ? this.state.sections
                                           .sort(comparator)
                                           .map(section => <SectionComponent
                                             profile={this.state.profile}
                                             section={section}
                                             key={section.id}
                                             metricsType={this.state.metricsType}
                                             onDataChanged={this.updateProfileData}
                                             sectionCompleted={
                                               this.getSectionCompleted(
                                                 section.subSections,
                                                 this.state.profileData)
                                             }
                                             onMetricChanged={this.onMetricChanged}
                                           />) : null
              }
              <LinkProfileSection
                profileType={this.state.profile.profileType.code}
                requestSent={this.state.link.requestSent}
                requestAccepted={this.state.link.requestAccepted}
                partnerEmail={this.state.link.partnerEmail}
                partnerNickname={this.state.link.partnerNickname}
                error={this.state.link.error}
                onSubmitPress={this.linkProfileSubmitPressed}
                onUnlinkPress={this.unlinkProfilePressed}
                onProfilePress={this.onLinkedProfilePress}
                avatar={this.state.link.avatar}
              />
            </UiBlockBasic>

          </ScrollView>
        </KeyboardAvoidingWrapper>

        <PopupSlideTop visible={this.state.showDeletePhotoPopup}>
          <UiBlockSpace height={15}/>
          <PopupContent>
            {i18n.t('profile.setup.deletePhotoRequest')}
          </PopupContent>
          <UiBlockSpace height={15}/>
          <PopupTwoButtonsContainer>
            <PopupButton onPress={this.dismissDeleteUserPictureButtonPressed}>Dismiss</PopupButton>
            <PopupButton onPress={this.confirmDeleteUserPictureButtonPressed}>Confirm</PopupButton>
          </PopupTwoButtonsContainer>
          <UiBlockSpace height={15}/>
        </PopupSlideTop>

        <PopupSlideBottom visible={this.state.link.unlinkPopupVisible}>
          <PopupHeader>{i18n.t('profile.details.sections.LinkProfile.modal.title')}</PopupHeader>
          <UiBlockSpace height={20}/>
          <PopupContent>
            {i18n.t('profile.details.sections.LinkProfile.modal.text') + ` ${this.state.profile.nickname}`}
          </PopupContent>
          <UiBlockSpace height={20}/>
          <PopupTwoButtonsContainer>
            <PopupButton onPress={this.hideUnlinkPopup}>{i18n.t('common.buttons.cancel')}</PopupButton>
            <PopupButton onPress={this.confirmUnlinkProfile}>{i18n.t('common.buttons.unlink')}</PopupButton>
          </PopupTwoButtonsContainer>
          <UiBlockSpace height={20}/>
        </PopupSlideBottom>

        <BottomNavigationPanel>
          <UiBlockVerticalCenter>
            <UiBlockHorizontalEdges>
              <NavigationTextButtonBlue
                onPress={this.backButtonPress}>
                {i18n.t('common.buttons.back')}
              </NavigationTextButtonBlue>
              <NavigationTextButtonWhite
                onPress={this.completeProfile}
                disabled={this.state.nickNameIsEmpty}
              >
                {i18n.t('common.buttons.finish')}
              </NavigationTextButtonWhite>
            </UiBlockHorizontalEdges>
          </UiBlockVerticalCenter>
        </BottomNavigationPanel>

        {this.state.showVideoTrimmer && <View style={{
          flex: 1,
          backgroundColor: '#aaff55',
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        }}>
          <VideoClipper
            videoUri={this.state.videoSource.path}
            maxDuration={30}
            onVideoCompressed={this.uploadVideo}
            onVideoCancelled={() => this.setState({
              ...this.state,
              showVideoTrimmer: false
            })}
            onVideoFinished={() => {
              this.setState({
                ...this.state,
                showVideoTrimmer: false
              })
              this.updateVideoMedia()
            }}
          />
        </View>}
      </View>
    )
  }

  private get sectionDataValid() {
    return this.state.sections && this.state.sections.length && this.state.profileData
  }

  private renderProcessComponent = () => {
    if (this.state.firstLaunch) {
      return (
        <UiBlockBasic>
          <UiBlockSpace height={30}/>
          <ProfileSetupProcessIndicator
            profileComplete={this.state.profileComplete}
            profileLabel={this.profileLabel}
            profileText={this.screenTitle}/>
          <UiBlockSpace height={30}/>
        </UiBlockBasic>
      )
    }
    return null
  }

  private renderProfileHeader = () => {
    if (!this.state.firstLaunch) {
      return (
        <UiBlockBasic>
          <ProfileHeader avatar={this.state.profile.avatar}
                         nickName={this.state.profile.nickname}
                         oldName={this.oldName}
                         setTextInputOnFocus={this.onTextInputPressed}
                         nickNameIsEditing={(this.state.nickNameIsEditing)}
                         nickNameOnFocus={() => this.setSpecState('keyboardOffset', -140)}
                         nickNameChanged={this.setNickName}
                         nickNameOnEndEditing={() => this.unableTextInput()}
                         profileLabel={this.profileScreenValues.getProfileLabel()}
                         avatarPicked={this.setUserImage}
                         mediaIsForbidden={this.state.mediaIsForbidden}
                         onCommunityPress={() => this.navigateToCommunityView()}
                         onMessagesPress={() => this.profileMessagesPressed()}
                         onNotificationsPress={() => this.profileNotificationsPressed()}
                         newMessages={this.state.messages}
                         newNotifications={this.state.notifications}
          />
          <UiBlockSpace height={20}/>
        </UiBlockBasic>
      )
    }
    return null
  }

  private getMetricsType() {
    this.localSettingsService.getUserMetrics()
      .then(value => {
        this.setState({
          ...this.state,
          metricsType: value
        })
      })
  }

  private navigateToCommunityView = async () => {
    await this.profileService.activate(this.state.profile)
    eventEmitter.emitAsync(EVENTS.editProfileScreenClosed)
                .then(() => this.navigateWithResetToProfileHub(routeConfig.community.name))
                .catch((error) => {
                  console.log(error)
                  this.navigateWithResetToProfileHub(routeConfig.community.name)
                })
  }

  private profileNotificationsPressed = async () => {
    await this.profileService.activate(this.state.profile)
    this.navigateWithResetToProfileHub(routeConfig.notifications.name, {})
  }

  private profileMessagesPressed = async () => {
    await this.profileService.activate(this.state.profile)
    this.navigateWithResetToProfileHub(routeConfig.messages.name, {})
  }

  private syncCounters = async () => {
    const counterStats = await this.profileService.getStats(this.state.profile.id)
    this.setSpecState('messages', counterStats.totalUnreadMessages)
    this.setSpecState('notifications', counterStats.totalUnreadNotifications)
  }

  private syncLinkedProfile = async () => {

    const requestLinkedProfile = await this.linkedProfileService.activeRequest()
    if (requestLinkedProfile) {

      const target = this.linkedProfileService.getOppositeProfileId(requestLinkedProfile)

      const profile = await this.profileService.getByPrimary(target)

      if (!profile) {
        throw new Error('no such profile')
      }

      const account = await this.accountService.getByProfile(profile.id)

      if (!account) {
        throw new Error('no such account')
      }

      return this.setSpecState('link', {
        ...this.state.link,
        requestSent: true,
        partnerNickname: profile.nickname,
        partnerEmail: account.email,
        avatar: profile.avatar,
        profileId: profile.id
      })
    }

    const linkedProfileModel = await this.linkedProfileService.getProfileLink()

    if (linkedProfileModel) {

      const target = this.linkedProfileService.getOppositeProfileId(linkedProfileModel)

      const profile = await this.profileService.getByPrimary(target)

      if (!profile) {
        throw new Error('no such profile')
      }

      return this.setSpecState('link', {
        ...this.state.link,
        requestAccepted: true,
        partnerNickname: profile.nickname,
        avatar: profile.avatar,
        profileId: profile.id
      })
    }

    return this.setSpecState('link', {
      ...this.state.link,
      requestAccepted: false,
      requestSent: false
    })
  }

  private updateProfileData = (fieldProfileData: ProfileDataModel) => {
    const profileData = this.state.profileData.find((item) => item.id === fieldProfileData.id)
    if (!profileData) {
      this.state.profileData.push(fieldProfileData)
    }
    this.setSpecState('profileData', this.state.profileData.map(item => {
      return item.id === fieldProfileData.id ? fieldProfileData : item
    }))
  }

  private extractSectionFieldIds = (subSections: SubSectionModel[]): number[] => {
    const fields: FieldModel[] = subSections.reduce((f: FieldModel[], subSection: SubSectionModel): FieldModel[] => {
      return f.concat(subSection.fields)
    }, [])
    return fields.map(field => field.id)
  }

  private extractProfileFieldIds = (data: ProfileDataModel[]): number[] => {
    return data.filter(profileData => profileData.fieldValues && profileData.fieldValues.length > 0)
               .reduce((ids: number[], profileData: ProfileDataModel): number[] => {
                 ids.push(profileData.field.id)
                 return ids
               }, [])
  }

  private getMediaSectionCompleted = (): boolean => {
    return (this.state.photoMedia && this.state.photoMedia.length > 0) ||
      (this.state.videoMedia && this.state.videoMedia.length > 0)
  }

  private getSectionCompleted = (subSections: SubSectionModel[], profileDataItems: ProfileDataModel[]): boolean => {
    const profileFieldsIds = this.extractProfileFieldIds(profileDataItems)
    const sectionFields = this.extractSectionFieldIds(subSections)
    if (profileFieldsIds.length === 0) {
      return false
    }

    return sectionFields.some((id) => {
      return this.fieldHasPositiveValue(profileDataItems, profileFieldsIds, id)
    })
  }

  private fieldHasPositiveValue =
    (profileDataItems: ProfileDataModel[], profileFieldIds: number[], fieldId: number): boolean => {
      const valExists = profileFieldIds.indexOf(fieldId) >= 0
      if (!valExists) {
        return false
      }

      if (this.textIsEmpty(profileDataItems, fieldId)) {
        return false
      }

      if (!this.radioButtonTurnedOn(profileDataItems, fieldId)) {
        return false
      }
      return true
    }

  private textIsEmpty = (profileDataItems: ProfileDataModel[], fieldId: number): boolean => {
    const profileDataItem = profileDataItems.find(item => item.field.id === fieldId)
    if (profileDataItem && !profileDataItem.fieldValues[0].value.trim().length) {
      return true
    }
    return false
  }

  private radioButtonTurnedOn = (profileDataItems: ProfileDataModel[], fieldId: number): boolean => {
    const profileDataItem = profileDataItems.find(item => item.field.id === fieldId)
    if (profileDataItem && ['false', 'true'].indexOf(profileDataItem.fieldValues[0].value) !== -1) {
      return false
    }
    return true

    // IGNORING PRE-FILLED RADIOBUTTONS. (CURRENTLY ALL)

    // const profileDataItem = profileDataItems.find(item => item.field.id === fieldId)
    // if (profileDataItem && profileDataItem.fieldValues[0].value === 'false') {
    //   return false
    // }
    // return true
  }

  private uploadPhoto = async (images: PickerImage[], isAlbum: boolean) => {
    const image = images[0]
    this.setState({showSpinner: true});
    const media = await this.mediaUpload(image.path, isAlbum)
    if (media) {
      const albumMedia = await this.albumService.addMediaTo(this.state.photoAlbum, media)
      this.setSpecState('photoMedia', [...this.state.photoMedia, albumMedia])
      this.setState({showSpinner: false});
    }
  }

  private uploadVideo = async (videoUri: string) => {
    const media = await this.mediaService.createNewVideo(videoUri)
    if (media) {
      const albumMedia = await this.albumService.addMediaTo(this.state.videoAlbum, media)
      this.setSpecState('photoMedia', [...this.state.photoMedia, albumMedia])
    }
    return videoUri
  }

  private get photosContainerWidth(): number {
    const window = Dimensions.get('window')
    return window.width - 2 * contentPadding - 10
  }

  private mediaUpload = (file, isAlbum) => {
    return this.mediaService.createNew(file, isAlbum)
  }

  private getSections = (profile: ProfileModel) => {
    return this.sectionService.getAllByProfileTypeCode(profile.profileType.code)
  }

  private getPhotos = (profile: ProfileModel): Promise<AlbumMediaModel[]> => {
    return this.albumService.getPhotoForProfile(profile.id)
               .then(album => {
                 this.setSpecState('photoAlbum', album)
                 return this.albumService.getMediasFrom(album)
               })
  }

  private getVideos = (profile: ProfileModel) => {
    return this.albumService.getVideoForProfile(profile.id)
               .then(album => {
                 this.setSpecState('videoAlbum', album)
                 return this.albumService.getMediasFrom(album)
               })
  }

  private prepareProfileData() {
    return this.profileDataService.preloadForProfile(this.state.profile)
  }

  private setNickName = async (name: string) => {
    this.state.profile.set('nickname', name)
    this.setState(this.state)
    {name.trim().length === 0 ? this.setSpecState('nickNameIsEmpty', true) : this.setSpecState('nickNameIsEmpty', false)
    }
  }

  private setUserImage = async (images: PickerImage[]) => {
    const image = images[0]
    try {
      const media = await this.mediaUpload(image.path, false)

      if (media) {
        const oldMediaId = this.state.profile.mediaId
        this.state.profile.set('mediaId', media.id)
        this.state.profile.update()
            .then(() => this.setSpecState('mediaIsForbidden', false))
            .then(() => this.forceUpdate())
            .catch(() => {
              this.state.profile.set('mediaId', oldMediaId)
              this.setSpecState('mediaIsForbidden', true)
            })
      }
    } catch (error) {
      this.setSpecState('mediaIsForbidden', true)
    }
  }

  private showLinkProfileError = () => {
    this.state.link.error = {message: 'Email address and/or profile name is not in the database'}
    this.setState(this.state)
  }

  private showLinkRequestSent = async (email: string) => {
    await this.linkedProfileService.linkProfileByEmail(email)
    return this.syncLinkedProfile()
  }

  private showUnlinkPopup = () => {
    this.state.link.unlinkPopupVisible = true
    this.setState(this.state)
  }

  private hideUnlinkPopup = () => {
    this.state.link.unlinkPopupVisible = false
    this.setState(this.state)
  }

  private unlinkProfile = async () => {
    await this.linkedProfileService.unLinkProfile()
    await this.syncLinkedProfile()
    this.hideUnlinkPopup()
  }

  private enableTextInput = () => {
    this.setSpecState('nickNameIsEditing', true)
  }

  private unableTextInput = async () => {
    this.setSpecState('keyboardOffset', 0)
    this.setSpecState('nickNameIsEditing', false)
    await this.state.profile.update()
  }
}

const contentPadding = 25

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  content: {
    paddingLeft: contentPadding,
    paddingRight: contentPadding
  },
  navigationHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E7EBEF',
    backgroundColor: 'white',
    zIndex: 1
  },
  navigationArrow: {
    width: 27,
    height: 27
  },
  navigationTitle: {
    fontSize: 14,
    color: '#5DA4E5'
  },
  navTitleDisabled: {
    fontSize: 14,
    color: '#ABABAB'
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    zIndex: 1
  }
})
