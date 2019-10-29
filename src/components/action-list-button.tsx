import React, {Component} from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import ActionItem from './action-item'
import {NavigationScreenProp} from 'react-navigation'
import routeConfig from '../router'
import NavigateToProfileHub from '../scenes/base/navigate-to-profile-hub'
import {mixin} from '../annotations/common'
import NavigateWithResetToProfileHub from '../scenes/base/navigate-with-reset-to-profile-hub'
import {lazy} from '../annotations/inversify'
import NCView from './global/non-clipping-view'
import {ProfileService} from '../services/profile'
import {CounterStats} from '../dto/conter-stats'
import {RabbitCredentialService} from '../services/rabbit-credential'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  showActionList: boolean
  hasProfiles: boolean
  stats?: CounterStats
  subscription?: { unsubscribe() }
}

@mixin([NavigateToProfileHub, NavigateWithResetToProfileHub])
export default class ActionListButton
  extends Component<Props, State>
  implements NavigateToProfileHub, NavigateWithResetToProfileHub {

  navigateToProfileHub: () => void
  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  constructor(props) {
    super(props)

    this.state = {
      showActionList: false,
      hasProfiles: false
    }

    this.initialize()
  }

  initialize = async () => {

    if (!await this.hasProfiles()) {
      this.setState({
        ...this.state,
        hasProfiles: false
      })
      return
    } else {
      this.setState({
        ...this.state,
        hasProfiles: true
      })
    }

    const counterStats = await this.profileService.getStats()

    this.setState(it => ({
      ...it,
      stats: counterStats
    }))
  }

  hasProfiles = async () => {
    const profiles = await this.profileService.getForCurrent()
    return profiles && profiles.length
  }

  toggleList = () => {
    this.setState({
      ...this.state,
      showActionList: !this.state.showActionList
    })
  }

  navigateTo = (route: string) => () => {
    this.toggleList()

    if (route === routeConfig.profileHub.name) {
      this.navigateToProfileHub()
    } else {
      this.navigateWithResetToProfileHub(route)
    }
  }

  componentDidMount() {
    this.rabbitCredentialService.onReady(
      service => service.subscribe('NEW_NOTIFICATION', this.syncCounters)
                        .then(it => this.setState({
                          ...this.state,
                          subscription: it
                        })))
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe()
    }
  }

  render() {
    return this.state.hasProfiles ? <View style={{marginTop: 4}}>
        <TouchableOpacity
          onPress={this.toggleList}
        >
          <Image source={require('Musl/images/global/btn-menu.png')}/>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={this.state.showActionList}
          onRequestClose={this.toggleList}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.overlay}
            onPress={this.toggleList}
          >
            <View style={styles.modalWindow}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={this.toggleList}
              >
                <Image source={require('Musl/images/global/btn-close.png')}/>
              </TouchableOpacity>
              <NCView style={styles.actionsContainer}>
                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.notifications.name)}
                  actionImage={require('Musl/images/global/icon-notifications.png')}
                  counter={this.state.stats ? this.state.stats.totalUnreadNotifications : 0}
                >
                  Notifications
                </ActionItem>

                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.messages.name)}
                  actionImage={require('Musl/images/global/icon-messages.png')}
                  counter={this.state.stats ? this.state.stats.totalUnreadMessages : 0}
                >
                  Messages
                </ActionItem>
                <View style={{
                  height: 1,
                  alignSelf: 'stretch',
                  backgroundColor: 'grey',
                  marginBottom: 20
                }}/>

                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.profileHub.name)}
                  actionImage={require('Musl/images/global/icon-profiles.png')}
                >
                  My Profiles
                </ActionItem>
                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.stats.name)}
                  actionImage={require('Musl/images/global/icon-stats.png')}
                >
                  My Stats
                </ActionItem>
                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.visibility.name)}
                  actionImage={require('Musl/images/global/icon-visibility.png')}
                >
                  Visibility
                </ActionItem>
                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.settings.name)}
                  actionImage={require('Musl/images/global/icon-settings.png')}
                >
                  Settings
                </ActionItem>
                <ActionItem
                  onItemClick={this.navigateTo(routeConfig.search.name)}
                  actionImage={require('Musl/images/global/icon-search.png')}
                >
                  Search
                </ActionItem>
              </NCView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      : null
  }

  private syncCounters = async () => {
    const counterStats = await this.profileService.getStats()
    this.setState(it => ({
      ...it,
      stats: counterStats
    }))
  }
}

const styles = StyleSheet.create({
  modalWindow: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowOpacity: 1.0,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'black' // TODO implement correct crossplatform shadow
  },
  overlay: {
    flex: 1
  },
  actionsContainer: {
    paddingBottom: 90,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    bottom: 8
  }
})
