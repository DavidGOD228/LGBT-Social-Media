import React from 'react'
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import BaseScreenDefault from './base/base-scene'
import DefaultHeader from '../components/global/default-header'
import ActionListButton from '../components/action-list-button'
import ProfileSwitcher from '../components/profile-switcher'
import UiBlockBottomPanel from '../components/ui/block/bottom-panel'
import UiBlockBasic from '../components/ui/block/basic'
import LineFullWidth from '../components/global/line-full-width'
import UiBlockSpace from '../components/ui/block/space'
import TextLight from '../components/global/text/basic/text-light'
import TextBold from '../components/global/text/basic/text-bold'
import NotificationItem from '../components/notifications/notification-item'
import {NotificationService} from '../services/notification'
import {lazy} from '../annotations/inversify'
import {MediaRequestService} from '../services/media-request'
import NavigateWithResetToProfileHub from './base/navigate-with-reset-to-profile-hub'
import {mixin} from '../annotations/common'
import routeConfig from '../router'
import NewItemsLabel from '../components/notifications/new-items-label'
import ProfileModel from '../models/profile'
import {ProfileService} from '../services/profile'
import {CounterStats} from '../dto/conter-stats'
import {RabbitCredentialService} from '../services/rabbit-credential'
import configuration from '../configs/index'
import Fetch from '../utils/fetch'

export const enum NotificationType {
  all = 'all',
  message = 'MESSAGE',
  mediaRequest = 'MEDIA_REQUEST',
  permission = 'PERMISSION',
  profileViewed = 'PROFILE_WAS_VIEWED',
  profileFavorited = 'PROFILE_WAS_FAVORITE',
  profileFlexed = 'PROFILE_WAS_FLEXED',
  linkRequest = 'LINK_REQUEST'
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  notificationType: NotificationType
  notifications?: any
  refreshing: boolean
  stats?: CounterStats
  subscription?: { unsubscribe() }
}

@mixin([NavigateWithResetToProfileHub])
export default class NotificationsScreen
  extends BaseScreenDefault<Props, State>
  implements NavigateWithResetToProfileHub {

  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  @lazy('NotificationService')
  private notificationService: NotificationService

  @lazy('MediaRequestService')
  private mediaRequestService: MediaRequestService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  constructor(props) {
    super(props)

    this.state = {
      notificationType: NotificationType.all,
      refreshing: false
    }

    this.syncNotifications()
    this.syncNotificationsCounters()
        .then(() => this.markAllNotificationsRead())
  }

  private get notifications() {
    return this.state.notifications ? this.state.notifications.filter(notification => {
      return this.state.notificationType === NotificationType.all || this.state.notificationType === notification.type
    }) : []
  }

  componentDidMount() {
    Fetch.post(configuration.remoteApi.base + '/notifications/mark-read',
      {
        profileId: this.profileService.getActiveProfileId(),
        types: [
          NotificationType.mediaRequest,
          NotificationType.profileFlexed,
          NotificationType.profileFavorited,
          NotificationType.profileViewed,
          NotificationType.permission,
          NotificationType.linkRequest
        ]
      })

    this.rabbitCredentialService.onReady(
      service => service.subscribe('NEW_NOTIFICATION', this.syncNotificationsCounters)
                        .then(it => this.setSpecState('subscription', it))
    )
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe()
    }
  }

  notificationNickNamePressed = (profile: ProfileModel) => {
    return this.goToProfile(profile)
  }

  requestApprovePressed = async (item) => {
    const mediaRequest = await this.mediaRequestService.getByPrimary(item.mediaRequestId)

    if (mediaRequest && mediaRequest.status === 'AWAITING') {
      mediaRequest.status = 'APPROVED'
      await mediaRequest.save()
      item.state = 'approved'
      this.syncNotifications()
    }
  }

  requestDenyPressed = async (item) => {
    const mediaRequest = await this.mediaRequestService.getByPrimary(item.mediaRequestId)

    if (mediaRequest && mediaRequest.status === 'AWAITING') {
      mediaRequest.status = 'REJECTED'
      await mediaRequest.save()
      item.state = 'denied'
      this.syncNotifications()
    }
  }

  tabAllPressed = () => {
    this.setSpecState('notificationType', NotificationType.all)
  }

  tabViewPressed = () => {
    this.setSpecState('notificationType', NotificationType.profileViewed)
  }

  tabFavoritePressed = () => {
    this.setSpecState('notificationType', NotificationType.profileFavorited)
  }

  tabFlexPressed = () => {
    this.setSpecState('notificationType', NotificationType.profileFlexed)
  }

  tabMessagePressed = () => {
    this.setSpecState('notificationType', NotificationType.message)
    this.navigateWithResetToProfileHub(routeConfig.messages.name)
  }

  tabRequestPressed = () => {
    this.setSpecState('notificationType', NotificationType.mediaRequest)
  }

  itemActions = (itemType: string): () => void => {
    if (itemType === NotificationType.profileFavorited) {
      return this.tabFavoritePressed
    }
    if (itemType === NotificationType.profileFlexed) {
      return this.tabFlexPressed
    }
    if (itemType === NotificationType.message) {
      return this.tabMessagePressed
    }
    return () => null
  }

  render() {
    const stats = this.state.stats || {
      totalUnreadMessages: 0,
      totalUnreadNotifications: 0,
      totalUnreadPreferMessages: 0,
      totalUnreadNeutralMessages: 0,
      totalUnreadUnpreferedMessages: 0,
      totalUnreadViewedNotifications: 0,
      totalUnreadFlexedNotifications: 0,
      totalUnreadMediaRequestedNotifications: 0,
      totalUnreadMessagesNotifications: 0,
      totalUnreadFavoriteNotifications: 0
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <UiBlockBasic style={styles.content}>
          <UiBlockBasic>
            <UiBlockSpace height={30}/>
            <TextLight style={styles.title}>Notifications</TextLight>
            <UiBlockSpace height={8}/>
            <LineFullWidth style={styles.titleBottomBorder}/>
            <UiBlockSpace height={5}/>

            <View style={{
              flexDirection: 'row',
              left: -19,
              width: '108%'
            }}>
              <TouchableOpacity onPress={this.tabAllPressed}
                                style={styles.tab}>
                <TextBold style={styles.allTab}>All</TextBold>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.tabViewPressed}
                                style={styles.tab}>
                <View>
                  <Image style={styles.tabIcon} source={require('Musl/images/notifications/icon-views.png')}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.tabFavoritePressed}
                                style={styles.tab}>
                <View>
                  <Image style={styles.tabIcon} source={require('Musl/images/notifications/icon-favorites.png')}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.tabFlexPressed}
                                style={styles.tab}>
                <View>
                  <Image style={styles.tabIcon} source={require('Musl/images/notifications/icon-flex.png')}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.tabRequestPressed}
                                style={styles.tab}>
                <View>
                  <Image style={styles.tabIcon} source={require('Musl/images/notifications/icon-request-approve.png')}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.tabMessagePressed}
                                style={styles.tab}>
                <View>
                  <Image style={styles.tabIcon} source={require('Musl/images/notifications/icon-message.png')}/>
                </View>
                {stats.totalUnreadMessages ? (
                  <NewItemsLabel style={{left: 30}}>{stats.totalUnreadMessages}</NewItemsLabel>
                ) : (
                  null
                )}
              </TouchableOpacity>
            </View>

            <UiBlockSpace height={5}/>
            <LineFullWidth style={styles.tabsBottomBorder}/>
          </UiBlockBasic>

          <FlatList
            onRefresh={this.syncNotifications}
            refreshing={this.state.refreshing}
            data={this.notifications}
            renderItem={this.renderChatItem}
            keyExtractor={item => item.id}
          />
        </UiBlockBasic>

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <ProfileSwitcher navigation={this.props.navigation}/>
                <ActionListButton navigation={this.props.navigation}/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </View>
    )
  }

  private syncNotifications = async () => {
    this.setSpecState('refreshing', true)
    const notifications = await this.notificationService.getForNotificationScene()
    this.setSpecState('notifications', notifications)
    this.setSpecState('refreshing', false)
  }

  private syncNotificationsCounters = async () => {
    const counterStats = await this.profileService.getStats()
    console.log('COUNTER STATS', counterStats)
    this.setSpecState('stats', counterStats)
  }

  private markAllNotificationsRead = () => {
    return this.notificationService.markAllReadForProfile()
  }

  private renderChatItem = ({item}) => {
    return (
      <NotificationItem
        type={item.type}
        userPicture={item.userPicture}
        nickName={item.nickName}
        action={item.action}
        state={item.state}
        onNickNamePress={() => this.notificationNickNamePressed(item.author)}
        onPress={this.itemActions(item.type)}
        requestApprovePress={() => {
          this.requestApprovePressed(item)
        }}
        requestDenyPress={() => {
          this.requestDenyPressed(item)
        }}
      />
    )
  }

  private async goToProfile(profile: ProfileModel) {
    const communityDto = await this.profileService.getCommunityDtoByProfileId(profile.id)
    if (communityDto === null) {
      return this.props.navigation.navigate(routeConfig.profileBlocked.name)
    }
    if (communityDto === -1) {
      return
    }
    return this.props.navigation.navigate(routeConfig.profileView.name, {profile: {item: communityDto}})
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 24
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  allTab: {
    width: 21,
    height: 21,
    fontSize: 14,
    paddingTop: 1
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tabIcon: {
    width: 21,
    height: 21,
    marginRight: 10
  },
  tabsBottomBorder: {
    backgroundColor: '#E3E3E3'
  }
})
