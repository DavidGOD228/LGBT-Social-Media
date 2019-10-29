import React from 'react'
import {
  NativeModules,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import {NavigationScreenProp} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import TextBold from '../components/global/text/basic/text-bold'
import TextNormal from '../components/global/text/basic/text-normal'
import UiBlockSpace from '../components/ui/block/space'
import UiBlockHorizontalCenter from '../components/ui/block/horizontal-center'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
}

const SettingsLinkModule = NativeModules.SettingsLinkModule

export default class LocationPermissionScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = {
    header: <DefaultHeader/>
  }

  constructor(props) {
    super(props)

    this.state = {
      ...this.state
    }
  }

  settingsPressed = () => {
    this.openIosSettings()
    this.openAndroidSettings()
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <View style={styles.content}>
          <TextBold>Please, turn on location services, in order to use MUSL App</TextBold>

          <UiBlockSpace height={40}/>
          <TouchableOpacity onPress={this.settingsPressed}>
            <UiBlockHorizontalCenter>
              <TextNormal style={styles.settingsLink}>Settings</TextNormal>
            </UiBlockHorizontalCenter>
          </TouchableOpacity>
        </View>

        <View style={styles.bottom}>
          <BottomNavigationPanel>
          </BottomNavigationPanel>
        </View>
      </View>
    )
  }

  private openIosSettings() {
    if (Platform.OS !== 'ios') {
      return
    }

    const url = this.getSettingsUrl(this.props.navigation.state.params.status)

    Linking.canOpenURL(url)
           .then(supported => {
             if (!supported) {
               throw new Error('Cant handle settings url')
             } else {
               return Linking.openURL(url)
             }
           }).catch(err => console.error('An error occurred', err))
  }

  private getSettingsUrl(locationStatus: string) {
    if (locationStatus === 'serviceTurnedOff') {
      return 'App-Prefs:root=Privacy&path=LOCATION'
    }
    return 'app-settings:'
  }

  private openAndroidSettings() {
    if (Platform.OS !== 'android') {
      return
    }

    const locationStatus = this.props.navigation.state.params.status
    console.log('locationStatus: ', locationStatus)

    if (locationStatus === 'serviceTurnedOff') {
      SettingsLinkModule.openPhoneLocationSettings()
                        .then(success => console.log('success: ' + success))
                        .catch(e => console.log('error: ', e))
    }

    if (locationStatus === 'denied') {
      SettingsLinkModule.openSettings()
                        .then(success => console.log('success: ' + success))
                        .catch(e => console.log('error: ', e))
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    height: '75%'
  },
  title: {
    color: 'rgb(46, 46, 46)',
    fontSize: 30,
    fontWeight: '300'
  },
  messageContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  settingsLink: {
    fontSize: 20,
    color: '#1EAEE9'
  }
})
