import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockHorizontalCenter from '../ui/block/horizontal-center'
import UiBlockBottom from '../ui/block/bottom'
import UiBlockSpace from '../ui/block/space'
import {ProfileService} from '../../services/profile'
import {lazy} from '../../annotations/inversify'
import routeConfig from '../../router'
// import {NavigationScreenProp} from 'react-navigation'
import NavigateWithResetToProfileHub from '../../scenes/base/navigate-with-reset-to-profile-hub'
import {mixin} from '../../annotations/common'

interface State {
  profileTypeCode: string
}

interface Props {
  navigation?: any
  showCommunityButton?: boolean // should refactor. not good to explicitly toggle it
}

const HEADERS = {
  FRIEND: require('Musl/images/global/header-bg.png'),
  FLIRT: require('Musl/images/global/header-bg-flirt.png'),
  FUN: require('Musl/images/global/header-bg-fun.png')
}

@mixin([NavigateWithResetToProfileHub])
export default class DefaultHeader
  extends Component<Props, State> implements NavigateWithResetToProfileHub {

  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  @lazy('ProfileService')
  private profileService: ProfileService

  constructor(props) {
    super(props)

    const profile = this.profileService.getActive()
    const profileTypeCode = (profile && profile.profileType.code) || "FRIEND"

    this.state = {
      profileTypeCode
    }
  }

  render() {
    return <UiBlockHorizontalCenter>
      <Image style={styles.container} source={HEADERS[this.state.profileTypeCode]} resizeMode='cover'>
        <UiBlockBottom>
          <UiBlockHorizontalCenter>
            {this.props.showCommunityButton && this.profileService.getActive() ?
              this.renderCommunityButton()
              : null
            }
            <Image source={require('Musl/images/global/musl-logo-header.png')}/>
          </UiBlockHorizontalCenter>
          <UiBlockSpace height={10}/>
        </UiBlockBottom>
      </Image>
    </UiBlockHorizontalCenter>
  }

  private navigateToCommunityView = () => {
    if (this.props.navigation) {
      this.navigateWithResetToProfileHub(routeConfig.community.name)
    }
  }

  private renderCommunityButton = () => (
    <TouchableOpacity style={{
      position: 'absolute',
      left: 10
    }} onPress={this.navigateToCommunityView}
    >
      <Image source={require('Musl/images/global/icon-btn-community.png')}/>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 65
  }
})
