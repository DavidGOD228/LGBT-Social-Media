import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockHorizontal from './ui/block/horizontal'
import {ProfileService} from '../services/profile'
import {lazy} from '../annotations/inversify'
import {NavigationScreenProp} from 'react-navigation'
import {mixin} from '../annotations/common'
import NavigateToProfileHub from '../scenes/base/navigate-to-profile-hub'
import {LocalSettingsService} from '../services/local-settings'
import {ProfileType} from '../models/profile'
import {EVENTS} from '../configs/dicts'
import eventEmitter from '../utils/event-emitter'

interface Props {
  navigation: NavigationScreenProp<any, any>
  usePhotos?: boolean
}

interface State {
  showAllProfiles: boolean
  activeProfile?: { type: string, icon: any }
  profileList: Array<{ type: string, icon: any }>
  useAvatars: boolean
}

const profilesTypes = [
  {
    type: 'FRIEND',
    icon: require('Musl/images/global/icon-friend.png')
  },
  {
    type: 'FLIRT',
    icon: require('Musl/images/global/icon-flirt.png')
  },
  {
    type: 'FUN',
    icon: require('Musl/images/global/icon-fun.png')
  }
]

@mixin([NavigateToProfileHub])
export default class ProfileSwitcher extends Component<Props, State> implements NavigateToProfileHub {

  navigateToProfileHub: () => void

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      showAllProfiles: false,
      profileList: [],
      useAvatars: false
    }

    this.getAllProfile()
        .then(profiles => {
          return profilesTypes.map(profileType => {
            const profile = profiles.find(it => it.profileType.code === profileType.type)
            if (profile) {
              profileType['avatar'] = profile.avatar
            }
            return profileType
          })
        })
        .then(profileList => this.setState(prevState => ({
          ...prevState,
          profileList
        })))
        .then(() => this.syncActiveProfile())
        .catch(error => console.error(error))

    this.localSettingsService.isPhotosInSwitcherTurnedOn()
        .then(value => {
          this.setState({
            ...this.state,
            useAvatars: value
          })
        })
  }

  profileSwitcherPressed = (profileType: ProfileType) => async () => {
    await this.switchProfile(profileType)
    this.syncActiveProfile()
    this.toggleList()
    eventEmitter.emit(EVENTS.activeProfileSelected, null)
    this.navigateToProfileHub()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.usePhotos !== this.state.useAvatars) {
      this.localSettingsService.isPhotosInSwitcherTurnedOn()
          .then(value => {
            this.setState({
              ...this.state,
              useAvatars: value
            })
          })
    }
  }

  render() {

    const content = this.state.showAllProfiles ? (

      <View style={{marginTop: 5}}>
        <UiBlockHorizontal>
          {/* ALL PROFILES */}
          {this.state.profileList.map(profile => (
            <TouchableOpacity
              onPress={this.profileSwitcherPressed(profile.type as ProfileType)}
              style={{paddingRight: 5}}
              key={profile.type}
            >
              {this.state.useAvatars ? (
                <Image style={[
                  styles.avatar,
                  (this.state.activeProfile && profile.type === this.state.activeProfile.type) ? styles.face : undefined
                ]}
                       source={profile['avatar']}/>
              ) : (
                <Image style={[
                  styles.avatar,
                  (this.state.activeProfile && profile.type === this.state.activeProfile.type) ? styles.face : undefined
                ]}
                       source={profile.icon}/>
              )}
            </TouchableOpacity>
          ))}
        </UiBlockHorizontal>
      </View>

    ) : (

      this.state.activeProfile ? (
        <TouchableOpacity
          onPress={this.toggleList}
          style={{marginTop: 5}}
        >
          <UiBlockHorizontal>
            {this.state.useAvatars ? (
              <Image style={styles.avatar} source={this.state.activeProfile['avatar']}/>
            ) : (
              <Image style={styles.avatar} source={this.state.activeProfile.icon}/>
            )}
            {this.state.profileList.length > 1 ? (
              <Image source={require('Musl/images/global/menu-lines-two.png')} style={styles.facesOverlay}/>
            ) : null}
          </UiBlockHorizontal>
        </TouchableOpacity>
      ) : null

    )

    return <View>
      {content}
    </View>
  }

  private getActiveProfile = () => {
    return this.profileService.getActive()
  }

  private getAllProfile = () => {
    return this.profileService.getForCurrent()
  }

  private switchProfile = (profileType: ProfileType) => {
    return this.profileService.activateByType(profileType)
  }

  private toggleList = () => {
    this.setState(prevState => ({
      ...prevState,
      showAllProfiles: !this.state.showAllProfiles
    }))
  }

  private syncActiveProfile = () => {
    const mayBeActiveProfile = this.getActiveProfile()
    const activeProfile = profilesTypes.find(
      it => mayBeActiveProfile ? it.type === mayBeActiveProfile.profileType.code : false
    )
    this.setState(prevState => ({
      ...prevState,
      activeProfile
    }))
  }
}

const styles = StyleSheet.create({
  facesOverlay: {
    right: 5
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27
  },
  face: {
    borderColor: '#AACFF8',
    borderWidth: 3
  }
})
