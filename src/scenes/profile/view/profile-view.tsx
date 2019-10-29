import React from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ListView,
  ListViewDataSource,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import DefaultHeader from '../../../components/global/default-header'
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center'
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges'
import ActionListButton from '../../../components/action-list-button'
import ProfileSwitcher from '../../../components/profile-switcher'
import BaseScreenDefault from '../../base/base-scene'
import AdBannerCommunityHorizontal from '../../../components/ad/banner-community-horisontal'
import {NavigationScreenProp} from 'react-navigation'
import {
  PROFILE_INTERACTIONS,
  PROFILE_VIEW_GENERAL_INFO,
  PROFILE_VIEW_PHOTOS,
  ProfileInteractionButton,
  ProfileTypeDict
} from '../../../configs/dicts'
import ProfileViewPhoto from '../../../components/profile-view/profile-view-photo'
import {globalParams} from '../../../assets/styles/style'
import ProfileViewGeneralInfo from '../../../components/profile-view/profile-view-general-info'
import UiBlockBasic from '../../../components/ui/block/basic'
import ProfileViewSeparator from '../../../components/profile-view/profile-view-separator'
import TextNormal from '../../../components/global/text/basic/text-normal'
import ProfileViewTools from '../../../components/profile-view/profile-view-tools'
import ProfileViewSection from './profile-view-section'
import {lazy} from '../../../annotations/inversify'
import {BlockService} from '../../../services/block'
import {FavoriteService} from '../../../services/favorite'
import {FlexService} from '../../../services/flex'
import ModalWindowTransparent from '../../../components/modal/modal-window-transparent'
import TextBold from '../../../components/global/text/basic/text-bold'
import ModalCloseBtn from '../../../components/modal/modal-close-btn'
import {ProfileVisitService} from '../../../services/profile-visit'
import ProfileViewTextInputLimited from '../../../components/profile-view/text-limited'
import ProfileViewMessage from '../../../components/profile-view/message-view'
import {ChatService} from '../../../services/chat'
import {MessageService} from '../../../services/message'
import {NoteService} from '../../../services/note'
import {ProfileViewSectionService} from '../../../services/profile-view-section'
import ProfileViewSectionModel from '../../../models/profile-view/profile-view-section'
import {ProfileDataService} from '../../../services/profile-data'
import ProfileDataModel from '../../../models/field-data/profile-data'
import configuration from '../../../configs/index'
import ProfileViewSubSectionModel from '../../../models/profile-view/profile-view-sub-section'
import ProfileViewFieldModel from '../../../models/profile-view/profile-view-field'
import {ChatMemberService} from '../../../services/chat-member'
import {AlbumService} from '../../../services/album'
import ProfileViewRequestAccess from '../../../components/profile-view/profile-view-request-access'
import {ProfileService} from '../../../services/profile'
import {MediaRequestService} from '../../../services/media-request'
import ProfileModel from '../../../models/profile'
import routeConfig from '../../../router'
import {comparator} from '../../../utils/number'
import UiBlockSpace from '../../../components/ui/block/space'
import PopupSlideBottom from '../../../components/global/popup/popup-slide-bottom'
import {SelectableItem} from '../../../components/button-selectable'
import KeyboardAvoidingWrapper from '../../../components/keyboard-avoiding-wrapper'
import ReportUserComponent from '../../../components/profile-view/report-user'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  dataSource: ListViewDataSource
  sections: ProfileViewSectionModel[]
  profileData: ProfileDataModel[]
  galleryPhotos: ProfileTypeDict[]
  tools: ProfileInteractionButton[]
  profile: any
  showNoteModal: boolean,
  showMessageModal: boolean,
  note: string,
  photoIndex: number,
  isSwiping: boolean
  shareVisible: boolean
  otherProfiles: ProfileModel[]
  share: { FRIEND: boolean, FLIRT: boolean, FUN: boolean }
  distance: string | null
  report: {
    showModal: boolean
  }
}

const syncToggle = (component, toggleName, toggleValue) =>
  component.setSpecState('tools', component.state.tools.map(it => it.name === toggleName ? {
    ...it,
    isSelected: toggleSelected(toggleName, toggleValue)
  } : it))

const toggleSelected = (toggleName, toggleValue) => {
  if (toggleName === 'Note') {
    return !!toggleValue && !!toggleValue.description
  }
  return !!toggleValue
}

export default class ProfileView extends BaseScreenDefault <Props, State> {

  static navigationOptions = ({navigation}) => ({
    title: 'ProfileView',
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>,
    headerLeft: null
  })

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('ChatService')
  private chatService: ChatService

  @lazy('ChatMemberService')
  private chatMemberService: ChatMemberService

  @lazy('NoteService')
  private noteService: NoteService

  @lazy('MessageService')
  private messageService: MessageService

  @lazy('BlockService')
  private blockService: BlockService

  @lazy('FavoriteService')
  private favoriteService: FavoriteService

  @lazy('FlexService')
  private flexService: FlexService

  @lazy('ProfileVisitService')
  private profileVisitService: ProfileVisitService

  @lazy('ProfileViewSectionService')
  private profileViewSectionService: ProfileViewSectionService

  @lazy('ProfileDataService')
  private profileDataService: ProfileDataService

  @lazy('MediaRequestService')
  private mediaRequestService: MediaRequestService

  @lazy('AlbumService')
  private albumService: AlbumService

  private keyboardBehavior: 'height' | 'position' | 'padding' = Platform.OS === 'ios' ? 'position' : 'padding'

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const {profile} = this.props.navigation.state.params

    const profilePhoto = {
      name: 'photo',
      photo: {uri: `${configuration.remoteApi.common}/api/medias/download/${profile.item.mediaId}?type=LARGE`}
    }

    const requestMediaAccess = {
      name: 'request',
      photo: require('Musl/images/profile/profile-view/profile-view-bg.png')
    }

    this.state = {
      ...this.state,
      dataSource: ds.cloneWithRows(PROFILE_VIEW_PHOTOS),
      tools: PROFILE_INTERACTIONS,
      profile: profile.item,
      galleryPhotos: [profilePhoto],
      showNoteModal: false,
      showMessageModal: false,
      note: '',
      photoIndex: 0,
      isSwiping: false,
      shareVisible: false,
      report: {
        showModal: false,
      }
    }

    this.profileViewSectionService.getAllByProfileTypeCode(profile.item.profileTypeCode)
        .then(sections => this.setSpecState('sections', sections))

    const profileId = profile.item.profileId

    this.profileDataService.getAllByProfileId(profileId)
        .then(profileData => {
          this.setSpecState('profileData', profileData)
        })

    this.profileDataService.getDistanceToDisplay(this.state.profile.distance)
        .then(val => this.setSpecState('distance', val))

    this.noteService.getForProfile(profileId)
        .then(note => this.setSpecState('note', note ? note.description : ''))

    this.isAccessToPhotosGranted()
        .then(granted => {
          if (granted) {
            this.getPhotos(profileId)
                .then(photos => {
                  this.state.galleryPhotos.push(...photos)
                  this.state.galleryPhotos.push(requestMediaAccess)
                  this.setState(this.state)
                })
          } else {
            this.state.galleryPhotos.push(requestMediaAccess)
            this.setState(this.state)
          }
        })
    this.visit(profileId)

    this.syncProfileInteractions()

    this.syncShare()
        .then(() => this.profileService.getForCurrent())
        .then(profiles => {
          const activeProfileId = this.profileService.getActiveProfileId()
          this.setSpecState('otherProfiles', profiles.filter(it => it.id !== activeProfileId))
        })
  }

  onInteractionPress = (item: ProfileInteractionButton) => {
    switch (item.name) {
      case 'Share':
        return this.onSharePress(item)
      case 'Block':
        return this.onBlockPress(item)
      case 'Note':
        return this.onNotePress(item)
      case 'Favorite':
        return this.onFavoritePress(item)
      case 'Flex':
        return this.onFlexPress(item)
      case 'Message':
        return this.onMessagePress()
      default:
        return console.log(item.name + ' pressed')
    }
  }

  onSharePress = (item: ProfileInteractionButton) => {
    this.setSpecState('shareVisible', !this.state.shareVisible)
    console.log(item.name + ' pressed')
  }

  onBlockPress = async (item: ProfileInteractionButton) => {
    console.log(item.name + ' pressed')
    const profileId = this.state.profile.profileId
    if (await this.blockService.getProfileBlock(profileId)) {
      return this.blockService.unBlockProfile(profileId)
    } else {
      return this.blockService.blockProfile(profileId)
    }
  }

  onNotePress = (item: ProfileInteractionButton) => {
    console.log(item.name + ' pressed')
    this.showNote()
  }

  onFavoritePress = async (item: ProfileInteractionButton) => {
    console.log(item.name + ' pressed')
    const profileId = this.state.profile.profileId
    if (await this.favoriteService.getProfileFavorite(profileId)) {
      await this.favoriteService.unFavoriteProfile(profileId)
    } else {
      await this.favoriteService.favoriteProfile(profileId)
    }
    await this.syncShare()
  }

  onFlexPress = async (item: ProfileInteractionButton) => {
    console.log(item.name + ' pressed')
    const profileId = this.state.profile.profileId
    if (await this.flexService.getProfileFlex(profileId)) {
      await this.flexService.unFlexProfile(profileId)
    } else {
      await this.flexService.flexProfile(profileId)
    }
    await this.syncShare()
  }

  onMessagePress = async () => {
    const profileId = this.state.profile.profileId
    const chat = await this.chatService.getConversation(profileId)

    if (chat && !chat.blocked) {
      const owner = await this.chatMemberService.getMeForChat(chat)
      return this.props.navigation.navigate(routeConfig.chat.name, {
        item: {
          chat,
          owner
        }
      })
    }

    return this.showMessage()
  }

  modalNoteClosePressed = () => {
    this.hideNote()
  }

  modalMessageClosePressed = () => {
    this.hideMessage()
  }

  reportUserPressed = () => {
    this.showReportPopup()
  }

  cancelReportPressed = () => {
    this.hideReportPoput()
    Keyboard.dismiss()
  }

  submitReportPressed = (message: string, categories: SelectableItem[]) => {
    this.submitReport(message, categories)
    Keyboard.dismiss()
  }

  closeReportPopupPressed = () => {
    this.state.report.showModal = false
    this.setState({...this.state})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.bannerContainer}>
          <AdBannerCommunityHorizontal/>
        </View>

        <KeyboardAvoidingView style={styles.container}
                              behavior="position"
                              keyboardVerticalOffset={50}>
          <ScrollView scrollEnabled={!this.state.isSwiping}>
            <View style={styles.photosContainer}>
              <ScrollView style={{flex: 1}} horizontal={true} pagingEnabled={true}>
                {this.state.galleryPhotos.map((it, index) => this.profileViewPhotoItem(it, index))}
              </ScrollView>
            </View>
            <ProfileViewGeneralInfo
              name={this.state.profile.nickname}
              safetyPractice={this.state.profile.safetyPractice}
              role={this.state.profile.role}
              hopingFor={this.state.profile.hopingFor}
              profileType={this.state.profile.profileTypeCode}
              distance={this.state.distance}
              dataSource={PROFILE_VIEW_GENERAL_INFO}/>
            <ProfileViewTools
              items={this.state.tools}
              shareVisible={this.state.shareVisible}
              onItemSelected={this.onInteractionPress}
              profiles={this.state.otherProfiles ? this.state.otherProfiles : []}
              share={this.state.share}
              sharePressed={this.changeShare}
            />
            <UiBlockBasic style={styles.content}>
              <ProfileViewSeparator/>
              {this.state.note && this.state.note.length > 0 ? (
                <UiBlockBasic>
                  <TextNormal style={styles.comment}>
                    {this.state.note}
                  </TextNormal>
                  <ProfileViewSeparator/>
                </UiBlockBasic>
              ) : (
                null
              )}

              {(this.state.profileData && this.state.sections)
              && this.state.sections
                     .sort(comparator)
                     .map(section =>
                       <ProfileViewSection
                         key={section.name}
                         title={section.name}
                         children={section.profileViewSubSections}
                         profileData={this.extractProfileDataForSection(section)}
                       />
                     )
              }

              <ProfileViewSeparator/>
              <UiBlockBasic>
                <TouchableOpacity onPress={this.reportUserPressed}>
                  <UiBlockSpace height={30}/>
                  <TextBold style={styles.startReport}>Report {this.state.profile.nickname}</TextBold>
                  <UiBlockSpace height={30}/>
                </TouchableOpacity>
              </UiBlockBasic>

            </UiBlockBasic>
          </ScrollView>
        </KeyboardAvoidingView>

        <ModalWindowTransparent visible={this.state.showNoteModal}>
          <KeyboardAvoidingView style={styles.modalContent}
                                behavior={this.keyboardBehavior}>
            <View style={styles.titleContainer}>
              <TextBold style={styles.noteTitle}>{this.state.profile.nickname}</TextBold>
              <ModalCloseBtn onPress={this.modalNoteClosePressed}/>
            </View>
            <View style={styles.textContainer}>
              <ProfileViewSeparator/>
              <ProfileViewTextInputLimited body={this.state.note}
                                           placeholder={'Enter your note'}
                                           onValueUpdated={(value) => this.saveNote(value)}/>
            </View>
          </KeyboardAvoidingView>
        </ModalWindowTransparent>

        <ModalWindowTransparent visible={this.state.showMessageModal}>
          <KeyboardAvoidingView style={styles.modalContent}
                                behavior={this.keyboardBehavior}>
            <View style={styles.titleContainer}>
              <TextBold style={styles.noteTitle}>{this.state.profile.nickname}</TextBold>
              <ModalCloseBtn onPress={this.modalMessageClosePressed}/>
            </View>
            <View style={styles.textContainer}>
              <ProfileViewSeparator/>
              <ProfileViewMessage body={''}
                                  placeholder={'Enter your message'}
                                  onValueUpdated={(value) => this.saveMessage(value)}/>
            </View>
          </KeyboardAvoidingView>
        </ModalWindowTransparent>


        <KeyboardAvoidingWrapper
          behavior="position"
          keyboardVerticalOffset={globalParams.bottomPanelHeight}>
          <PopupSlideBottom visible={this.state.report.showModal} countBottomPanel={false}>
            <ReportUserComponent
              onCancelReportPressed={this.cancelReportPressed}
              onSubmitReportPressed={this.submitReportPressed}
              onCloseReportPopupPressed={this.closeReportPopupPressed}/>
          </PopupSlideBottom>
        </KeyboardAvoidingWrapper>

        <View style={styles.bottom}>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <ProfileSwitcher navigation={this.props.navigation}/>

                <ActionListButton navigation={this.props.navigation}/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </View>
      </View>
    )
  }

  private extractProfileDataForSection = (section: ProfileViewSectionModel): ProfileDataModel[] => {
    return section.profileViewSubSections
                  .reduce(
                    (fields: ProfileViewFieldModel[], subSection: ProfileViewSubSectionModel) => {
                      // Refactoring required
                      const filteredFields = subSection.profileViewFields.filter(it => {
                        return it.name !== 'SafetyPractice' || this.state.profile.safetyPractice.length > 0
                      })
                      return fields.concat(filteredFields)
                    }, [])
                  .map(profileViewField => profileViewField.field.id)
                  .reduce((profileData: ProfileDataModel[], fieldId: number) => {
                    const result = this.state.profileData.filter((data) => {
                      if (['TEXT', 'TEXT_LIMITED'].indexOf(data.field.type) !== -1) {
                        if (!(data.fieldValues[0].value || '').trim()) {
                          return false
                        }
                      }
                      return data.field.id === fieldId
                    })
                    if (result.length > 0) {
                      profileData.push(result[0])
                    }
                    return profileData
                  }, [])
  }

  private syncProfileInteractions = () => {
    const profileId = this.state.profile.profileId

    this.blockService.getProfileBlock(profileId)
        .then(has => syncToggle(this, 'Block', has))

    this.flexService.getProfileFlex(profileId)
        .then(has => syncToggle(this, 'Flex', has))

    this.favoriteService.getProfileFavorite(profileId)
        .then(has => syncToggle(this, 'Favorite', has))

    this.noteService.getForProfile(profileId)
        .then(has => syncToggle(this, 'Note', has))

    this.chatService.getConversation(profileId)
        .then(has => syncToggle(this, 'Message', has))

  }

  private visit = (profileId) => {
    this.profileVisitService.addToProfile(profileId)
  }

  private showNote = () => {
    this.setSpecState('showNoteModal', true)
  }

  private saveNote = async (value) => {
    this.setSpecState('note', value)
    await this.noteService.addToProfile(this.state.profile.profileId, value)
    const noteVal = await this.noteService.getForProfile(this.state.profile.profileId)
    syncToggle(this, 'Note', noteVal)
    this.hideNote()
  }

  private hideNote = () => {
    this.setSpecState('showNoteModal', false)
  }

  private showMessage = () => {
    this.setSpecState('showMessageModal', true)
  }

  private saveMessage = async (value: string) => {

    if (value.length > 0) {
      this.setSpecState('tools', this.state.tools.map(it => it.name === 'Message' ? {
        ...it,
        isSelected: true
      } : it))
    }

    const profileId = this.state.profile.profileId

    // We have to consider both cases: 1. User blocked me; 2. I blocked the user
    const reverseBlock = await this.blockService.getReverseProfileBlock(profileId)
    const block = await this.blockService.getProfileBlock(profileId)

    if (reverseBlock || block) {
      return this.hideMessage()
    }

    const conversation = await this.chatService.newConversation(profileId)
    const message = await this.messageService.newMessage(conversation, value)
    this.hideMessage()
    const me = await this.chatMemberService.getMeForChat(conversation)
    me.set('lastViewedOrderNumber', message.orderNumber)
    await me.save()
    await this.syncShare()
  }

  private hideMessage = () => {
    this.setSpecState('showMessageModal', false)
  }

  private showReportPopup = () => {
    this.setSpecState('report', {
      ...this.state.report,
      showModal: true
    })
  }

  private hideReportPoput = () => {
    this.setSpecState('report', {
      ...this.state.report,
      showModal: false
    })
  }

  private submitReport = (message: string, categories: SelectableItem[]) => {
    const myProfileId = this.profileService.getActiveProfileId()
    const targetProfileId = this.state.profile.profileId
    const wrongUniverse = categories.find(it => it.value === 'wrongUniverse')
    const wrongUniverseFlag = wrongUniverse ? !!wrongUniverse.isSelected : false
    const inappropriateBehavior = categories.find(it => it.value === 'inappropriateBehavior')
    const inappropriateBehaviorFlag = inappropriateBehavior ? !!inappropriateBehavior.isSelected : false
    const harassingMe = categories.find(it => it.value === 'harassingMe')
    const harassingMeFlag = harassingMe ? !!harassingMe.isSelected : false

    this.profileService.reportUser(
      myProfileId,
      targetProfileId,
      harassingMeFlag,
      wrongUniverseFlag,
      inappropriateBehaviorFlag,
      message)
        .then(response => console.log('report user response', response))
        .catch(e => console.log('response user error', e))
  }

  private profileViewPhotoItem = (photo: ProfileTypeDict, index: number) => {
    return photo.name === 'photo' ? (
      <ProfileViewPhoto data={photo} position={index} key={index}/>
    ) : (
      <ProfileViewRequestAccess profileId={this.state.profile.profileId} key={index}/>
    )
  }

  private isAccessToPhotosGranted = async (): Promise<boolean> => {
    const photo = await this.albumService.getPhotoForProfile(this.state.profile.profileId)
    const mediaRequest = await this.mediaRequestService.getOutboundActiveRequest(this.state.profile.profileId, photo)
    const mediaInRequest =
      await this.mediaRequestService.getInboundActiveRequestReverse(this.state.profile.profileId, photo)

    return !!mediaRequest && mediaRequest.status === 'APPROVED' ||
      !!mediaInRequest && mediaInRequest.status === 'APPROVED'
  }

  private getPhotos = (profileId: number): Promise<ProfileTypeDict[]> => {
    return this.albumService.getPhotoForProfile(profileId)
               .then(album => {
                 return this.albumService.getMediasFrom(album)
               })
               .then(media => {
                 return media.map(item => {
                   return {
                     name: 'photo',
                     photo: {uri: item.mediaUrl}
                   }
                 })
               })
  }

  private syncShare = async () => {
    const share = await this.profileService.getShare(this.state.profile.profileId)
    this.setSpecState('share', share)
  }

  private changeShare = async (profile: ProfileModel) => {
    const share = await this.profileService.getShare(this.state.profile.profileId)
    const type = profile.profileType.code

    await this.profileService.share(this.state.profile.profileId, {
      ...share,
      [type]: !share[type]
    })

    return this.syncShare()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  photosContainer: {
    width: '100%',
    height: Dimensions.get('window').width * 9 / 10,
    backgroundColor: 'black'
  },
  content: {
    paddingLeft: 25,
    paddingRight: 25
  },
  comment: {
    paddingTop: 25,
    paddingBottom: 25,
    textAlign: 'center',
    color: 'rgb(174, 174, 174)'
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: 250
  },
  noteTitle: {
    paddingTop: 20,
    paddingBottom: 18,
    color: 'rgb(92, 92, 92)',
    fontSize: 28
  },
  titleContainer: {
    width: '100%',
    height: 70,
    paddingLeft: 25,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textContainer: {
    width: '100%',
    height: 180,
    paddingRight: 25,
    paddingLeft: 25,
    backgroundColor: 'white'
  },
  bottom: {
    height: globalParams.bottomPanelHeight,
    justifyContent: 'flex-end'
  },
  startReport: {
    color: '#5E9CD3',
    paddingLeft: 10
  }
})
