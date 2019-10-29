import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white'
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue'
import UiBlockSpace from '../components/ui/block/space'
import UiBlockBasic from '../components/ui/block/basic'
import ButtonBlue from '../components/global/button-blue'
import i18n from '../locales/i18n'
import routeConfig from '../router'
import {NavigationScreenProp} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import {AccountService} from '../services/account'
import {lazy} from '../annotations/inversify'
import {debounce} from '../annotations/eval'
import NavigateToProfileHub from './base/navigate-to-profile-hub'
import {mixin} from '../annotations/common'

interface Props {
  navigation: NavigationScreenProp<any, any>
  email: string
  password: string
}

interface State {
  activeScreen: boolean
}

@mixin([NavigateToProfileHub])
export default class RegistrationConfirmationScreen
  extends BaseScreenDefault<Props, State>
  implements NavigateToProfileHub {

  static navigationOptions = {
    header: <DefaultHeader/>
  }

  navigateToProfileHub: () => void

  @lazy('AccountService')
  private accountService: AccountService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      activeScreen: true
    }

    this.tryLogin()
  }

  backButtonPressed = () => {
    this.navigateToBack()
  }

  continueButtonPressed = () => {
    this.navigateToLogin()
  }

  resendButtonPressed = () => {
    this.resendConfirmation()
  }

  render() {
    const {state} = this.props.navigation

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <UiBlockBasic style={styles.content}>
          <UiBlockSpace height={20}/>
          <Text style={styles.title}>
            {i18n.t('registrationConfirmation.title')}
          </Text>
          <UiBlockSpace height={40}/>
          <Text style={styles.text}>
            {i18n.t('registrationConfirmation.message', {email: state.params.email})}
          </Text>
          <UiBlockSpace height={50}/>
          <ButtonBlue onPress={this.resendButtonPressed}>
            {i18n.t('registrationConfirmation.resend')}
          </ButtonBlue>
        </UiBlockBasic>

        <BottomNavigationPanel>
          <UiBlockVerticalCenter>
            <UiBlockHorizontalEdges>
              <NavigationTextButtonBlue
                onPress={this.backButtonPressed}>
                {i18n.t('common.buttons.back')}
              </NavigationTextButtonBlue>
              <NavigationTextButtonWhite
                onPress={this.continueButtonPressed}>
                {i18n.t('common.buttons.continue_btn')}
              </NavigationTextButtonWhite>
            </UiBlockHorizontalEdges>
          </UiBlockVerticalCenter>
        </BottomNavigationPanel>
      </View>
    )
  }

  private navigateToBack = () => {
    this.setSpecState('activeScreen', false)
    this.props.navigation.goBack()
  }

  private navigateToLogin = () => {
    this.setSpecState('activeScreen', false)
    this.props.navigation.navigate(routeConfig.login.name)
  }

  @debounce(5000)
  private resendConfirmation() {
    this.accountService.resendConfirmation(this.props.navigation.state.params.email)
  }

  @debounce(5000)
  private tryLogin() {
    this.accountService.login(this.props.navigation.state.params.email, this.props.navigation.state.params.password)
        .then(() => this.setSpecState('activeScreen', false))
        .then(() => this.navigateToProfileHub())
        .catch(() => this.state.activeScreen ? this.tryLogin() : null)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    color: 'rgb(46, 46, 46)',
    fontSize: 30,
    fontWeight: '300'
  },
  text: {
    color: '#000000',
    fontSize: 17
  }
})
