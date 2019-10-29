import React from 'react'
import bootstrap from '../initializers/bootstrap'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'
import {LocalSettingsService} from '../services/local-settings'
import {lazy} from '../annotations/inversify'
import {AccountService} from '../services/account'
import {
  NavigationActions,
  NavigationScreenProp
} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import serviceRegistry from '../services/base/-registry'
// import {ProfileService} from "../services/profile";
// import {ProfileTypeService} from "../services/profile-type";
// import {ProfileService} from "../services/profile";

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class HomeScreen extends BaseScreenDefault<Props, {}> {

  static navigationOptions = {
    header: null
  }

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('AccountService')
  private accountService: AccountService

  componentDidMount() {
    this.onMount()
  }

  onMount = async () => {
    await bootstrap()

    if (!await this.localSettingsService.isTermsAccepted()) {
      this.navigateBlank('terms')
      return
    }

    await this.checkForLoggedAccount()
  }

  checkForLoggedAccount = async () => {
    await this.accountService.restoreAuthToken()
    // console.log(await this.accountService.isLogged(), 'this.accountService.isLogged()')
    // await this.accountService.isLogged().then(profile => {
    //   if (profile) {
    //     console.log(profile, "PROFILE========================")
    //     this.accountService.createAccountInRepo(profile)
    //     // this.localSettingsService.saveCurrentProfile(profile).then(profileNew => {
    //     //   console.log(this.accountService.isLogged(), 'this.accountService.isLogged() 22222-2-2-2-2-2--2')
    //     //
    //     // })
    //   }
    // })
    if (await this.accountService.isLogged()) {
      this.checkForLocationPermission()
      return
    }

    this.checkForAccountExist()
  }

  checkForLocationPermission = async () => {
    await Promise.all(serviceRegistry.values().map(it => it.preload()))
    if (await this.localSettingsService.getLocationPermissionDenied()) {
      this.navigateToSettings('locationPermission')
    } else {
      this.navigateBlank('profileHub')
    }
  }

  checkForAccountExist() {
    if (this.localSettingsService.isAnyAccountExist()) {
      this.navigateBlank('login')
    } else {
      this.navigateBlank('registration')
    }
  }

  navigateToSettings = async (routeName: string) => {
    const locationStatus = await this.accountService.isLocationPermissionDenied()

    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName,
        params: {status: locationStatus}
      })],
      key: null
    }))
  }

  navigateBlank(routeName: string) {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
      key: null
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.splash} resizeMode={'cover'} source={require('Musl/images/splash.png')}>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  splash: {
    flex: 1,
    height: undefined,
    width: undefined
  }
})
