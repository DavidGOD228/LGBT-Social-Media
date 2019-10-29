import React from 'react'
import {
  Alert,
  ListView,
  ListViewDataSource,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockBottomPanel from '../components/ui/block/bottom-panel'
import UiProfileHubRow from '../components/ui/profile-hub/row'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import {lazy} from '../annotations/inversify'
import ActionListButton from '../components/action-list-button'
import ProfileSwitcher from '../components/profile-switcher'
import routeConfig from '../router'
import {
  EVENTS,
  PROFILE_TYPES,
  PROFILE_TYPES_MODAL,
  ProfileTypeDict,
  ProfileTypeModalDict
} from '../configs/dicts'
import {NavigationScreenProp} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import ScaledList from '../components/ui/profile-hub/scaled-to-fill-list'
import ModalWindow from '../components/modal/modal-window'
import UiBlockSpace from '../components/ui/block/space'
import ModalCloseBtn from '../components/modal/modal-close-btn'
import ModalWindowContent from '../components/modal/modal-window-content'
import ModalWindowTitle from '../components/modal/modal-window-title'
import i18n from '../locales/i18n'
import ModalLeftBtn from '../components/modal/modal-left-btn'
import UiProfileHubModalRow from '../components/ui/profile-hub/profile-hub-modal-row'
import ProfileHubModalList from '../components/ui/profile-hub/profile-hub-modal-list'
import ModalWindowSubtext from '../components/modal/modal-window-subtext'
import {LocalSettingsService} from '../services/local-settings'
import {ProfileService} from '../services/profile'
import ProfileModel from '../models/profile'
import UiProfileHubEmptyRow from '../components/ui/profile-hub/empty-row'
import NavigateWithResetToProfileHub from './base/navigate-with-reset-to-profile-hub'
import {mixin} from '../annotations/common'
import {CounterStats} from '../dto/conter-stats'
import eventEmitter from '../utils/event-emitter'
// import {RabbitCredentialService} from '../services/rabbit-credential'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {AccountService} from "../services/account";

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  dataSource: ListViewDataSource
  modalDataSource: ListViewDataSource
  showGuideModal: boolean
  haveAnyProfile: boolean
  FLIRT?: CounterStats
  FRIEND?: CounterStats
  FUN?: CounterStats
  profiles?: ProfileModel[]
  subscription?: { unsubscribe() }
}

@mixin([NavigateWithResetToProfileHub])
export default class ProfileHubScreen extends BaseScreenDefault <Props, State>
  implements NavigateWithResetToProfileHub {

  static navigationOptions = ({navigation}) => ({
    title: 'ProfileHubScreen',
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>,
    headerLeft: null
  })

  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('AccountService')
  private accountService: AccountService

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const modalDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      dataSource: ds.cloneWithRows(PROFILE_TYPES),
      modalDataSource: modalDs.cloneWithRows(PROFILE_TYPES_MODAL),
      showGuideModal: false,
      haveAnyProfile: false
    }
    this.accountService.saveLoginData();
    this.configurePushNotifications();
    this.handleGettingStarted()
      .catch(error => console.error(error))
    this.getProfiles()
        .then(profiles => {
            if (profiles.length) {
              this.setSpecState('haveAnyProfile', true)
            }
            this.setSpecState('dataSource', ds.cloneWithRows(
              PROFILE_TYPES.map(
                type => profiles.find(profile => profile.profileType.code === type.name) || type
              )
            ))
            this.setSpecState('profiles', profiles)
            this.syncCounters()
          }
        )
    eventEmitter.on(EVENTS.rabbitNewNotification, this.syncCounters)
  }

  configurePushNotifications() {
    console.log('configure NOTIFICATIONS')
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        Alert.alert(
          'Hi there,',
          token,
          [
            {
              text: 'ОК',
              onPress: () => console.log('Change date'),
              style: 'cancel',
            },
          ],
        );
        console.log("NOTIFICATIONS DEVICE TOKEN============:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log("NOTIFICATION:", notification);

        // process the notification
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: 104214201284,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    })
  }

  modalGuideClosePressed = () => {
    this.hideGuide()
  }

  profileNotificationsPressed = async (profile: ProfileModel) => {
    await this.profileService.activate(profile)
    this.navigateWithResetToProfileHub(routeConfig.notifications.name, {})
  }

  profileMessagesPressed = async (profile: ProfileModel) => {
    await this.profileService.activate(profile)
    this.navigateWithResetToProfileHub(routeConfig.messages.name, {})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <ScaledList
          dataSource={this.state.dataSource}
          renderRow={
            (data: ProfileTypeDict | ProfileModel) => data instanceof ProfileModel ? (
              <UiProfileHubRow onClick={() => this.profileClick(data)}
                               onNavigateTo={() => this.navigateToCommunityView(data)}
                               onCommunityPress={() => this.navigateToCommunityView(data)}
                               onMessagesPress={() => this.profileMessagesPressed(data)}
                               onNotificationsPress={() => this.profileNotificationsPressed(data)}
                               data={data}
                               newMessages={
                                 (this.state[data.profileType.code] as CounterStats || {totalUnreadMessages: 0})
                                   .totalUnreadMessages
                               }
                               newNotifications={
                                 (this.state[data.profileType.code] as CounterStats || {totalUnreadNotifications: 0})
                                   .totalUnreadNotifications
                               }
              />
            ) : (
              <UiProfileHubEmptyRow onClick={() => this.emptyProfileClick(data)} data={data}/>
            )
          }
        />

        <ModalWindow visible={this.state.showGuideModal}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.modalGuideClosePressed}/>
          <UiBlockSpace height={20}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              {i18n.t('profile.modal.hubTitle')}
            </ModalWindowTitle>
            <UiBlockSpace/>
            <ModalWindowSubtext>
              {i18n.t('profile.modal.hubMessage')}
            </ModalWindowSubtext>
            <UiBlockSpace/>
            <View style={styles.listView}>
              <ProfileHubModalList
                dataSource={this.state.modalDataSource}
                renderRow={
                  (data: ProfileTypeModalDict) => <UiProfileHubModalRow data={data}/>
                }
              />
            </View>
            <UiBlockSpace height={30}/>
            <ModalLeftBtn onPress={this.modalGuideClosePressed}>
              {i18n.t('profile.modal.hubButton')}
            </ModalLeftBtn>
          </ModalWindowContent>
        </ModalWindow>

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                {this.state.haveAnyProfile ? (
                  <ProfileSwitcher navigation={this.props.navigation}/>
                ) : (
                  <View/>
                )}
                <ActionListButton navigation={this.props.navigation}/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </View>
    )
  }

  private getProfiles = () => {
    return this.profileService.getForCurrent()
  }

  private profileClick = async (profile: ProfileModel) => {
    await this.profileService.activate(profile)
    this.navigateWithResetToProfileHub(routeConfig.setupProfileDetails.name, {profile})
  }

  private navigateToCommunityView = async (profile: ProfileModel) => {
    await this.profileService.activate(profile)
    this.navigateWithResetToProfileHub(routeConfig.community.name)
  }

  private emptyProfileClick = (profileType: ProfileTypeDict) => {
    this.navigateWithResetToProfileHub(routeConfig.setupProfile.name, {type: profileType.name})
  }

  private handleGettingStarted = async () => {
    const alreadyShowed = await this.localSettingsService.isGettingStartedShowed()
    this.setSpecState('showGuideModal', !alreadyShowed)

    console.log(alreadyShowed, 'showGuideModal========================')
    if (!alreadyShowed) {
      this.localSettingsService.gettingStartedShow()
          .catch(error => console.error('showGuideModal=======', error))
    }
  }

  private syncCounters = () => {
    if (!this.state.profiles) {
      return
    }
    console.log('PROFILE HUB SYNCING')
    this.state.profiles.forEach(async it => {
      const counterStats = await this.profileService.getStats(it.id)
      console.log('PROFILE HUB NEW STATS', counterStats)
      this.setSpecState(it.profileType.code as keyof State, counterStats)
    })
  }

  private hideGuide = () => {
    this.setSpecState('showGuideModal', false)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  listView: {
    height: '40%'
  }
})
