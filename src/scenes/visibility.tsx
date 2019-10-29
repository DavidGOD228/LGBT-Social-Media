import React from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import {lazy} from '../annotations/inversify'
import {NavigationScreenProp} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import {LocalSettingsService} from '../services/local-settings'
import UiBlockBottomPanel from '../components/ui/block/bottom-panel'
import ProfileSwitcher from '../components/profile-switcher'
import ActionListButton from '../components/action-list-button'
import UiBlockSpace from '../components/ui/block/space'
import TextLight from '../components/global/text/basic/text-light'
import i18n from '../locales/i18n'
import LineFullWidth from '../components/global/line-full-width'
import NavigateWithResetToProfileHub from './base/navigate-with-reset-to-profile-hub'
import SafeForWork from './visibility/safe-for-work'
import {mixin} from '../annotations/common'
import StealthModeSwitch from './visibility/stealth-mode-switch'
import ExploreSection from './visibility/explore'
import PopupSlideBottom from '../components/global/popup/popup-slide-bottom'

interface State {
  switcher: {
    showPhotosInSwitcher: boolean
  }
  timeShowIosSelector: boolean
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}

@mixin([NavigateWithResetToProfileHub])
export default class VisibilityScreen extends BaseScreenDefault<Props, State>
  implements NavigateWithResetToProfileHub {

  static navigationOptions = ({navigation}) => ({
    title: 'VisibilityScreen',
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>,
    headerLeft: null
  })

  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  navigateToProfileHub: () => void

  safeForWorkSectionRef: any

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      switcher: {
        showPhotosInSwitcher: false
      }
    }

    this.drawProfileSwitcher()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <ScrollView style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>{i18n.t('visibility.screenTitle')}</TextLight>
          <UiBlockSpace height={8}/>
          <LineFullWidth style={{backgroundColor: '#979797'}}/>
          <UiBlockSpace height={10}/>

          <StealthModeSwitch/>

          <UiBlockSpace height={10}/>
          <LineFullWidth style={{backgroundColor: '#979797'}}/>
          <UiBlockSpace height={10}/>

          <SafeForWork
            ref={ref => this.safeForWorkSectionRef = ref}
            toggleIosSelector={enabled => this.setState({
              ...this.state,
              timeShowIosSelector: enabled
            })}
            updateUi={() => this.setState(this.state)}
          />

          <ExploreSection/>

        </ScrollView>

        {this.safeForWorkSectionRef &&
        <PopupSlideBottom
          visible={this.state.timeShowIosSelector}>
          {this.safeForWorkSectionRef.renderPopupContent()}
        </PopupSlideBottom>
        }

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <ProfileSwitcher navigation={this.props.navigation}
                                 usePhotos={this.state.switcher.showPhotosInSwitcher}/>
                <ActionListButton navigation={this.props.navigation}/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </View>
    )
  }

  private drawProfileSwitcher = () => {
    this.localSettingsService.isPhotosInSwitcherTurnedOn()
        .then(value => this.setState({
          ...this.state,
          switcher: {
            showPhotosInSwitcher: value
          }
        }))
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
  fieldsContainer: {
    paddingLeft: 15,
    paddingRight: 7
  },
  messageContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  infoIcon: {
    position: 'absolute',
    top: -7,
    right: -30
  }
})
