import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import IOSCLearIcon from 'react-native-vector-icons/EvilIcons';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import UiBlockSpace from '../components/ui/block/space'
import Input from '../components/input'
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue'
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white'
import i18n from '../locales/i18n'
import {AccountService} from '../services/account'
import {lazy} from '../annotations/inversify'
import routeConfig from '../router'
import {
  NavigationActions,
  NavigationScreenProp
} from 'react-navigation'
import {LOGIN_VALIDATION} from '../validation/login'
import {validation} from '../utils/validation'
import BaseScreenDefault from './base/base-scene'
import NavigateToProfileHub from './base/navigate-to-profile-hub'
import {mixin} from '../annotations/common'
import ModalWindowTitle from '../components/modal/modal-window-title'
import ModalWindowContent from '../components/modal/modal-window-content'
import ModalCloseBtn from '../components/modal/modal-close-btn'
import ModalWindow from '../components/modal/modal-window'
import ButtonBlue from '../components/global/button-blue'
import ModalWindowText from '../components/modal/modal-window-text'


interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  email: string
  password: string
  error: {
    server?: string[],
    email?: string[],
    resetEmail?: string[],
    password?: string[],
  }
  showResetPassword: boolean,
  resetEmail: string,
  reset: boolean,
}

@mixin([NavigateToProfileHub])
export default class LoginScreen extends BaseScreenDefault<Props, State> implements NavigateToProfileHub {

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
      email: '',
      password: '',
      error: {},
      showResetPassword: false,
      reset: false,
      resetEmail: ''
    }
  }

  componentDidMount() {
    this.checkForLocationPermission();
  }

  emailChanged = (email: string) => {
    this.saveEmail(email)
  }

  resetPasswordChanged = (email: string) => {
    this.saveResetEmail(email)
  }

  passwordChanged = (password: string) => {
    this.savePassword(password)
  }

  loginButtonPressed = async () => {
    try {
      this.validateForm()
      await this.login(this.state.email, this.state.password)
      this.hideKeyboard()
      // this.checkForLocationPermission()
      this.navigateToProfileHub()
    } catch (error) {
      this.setErrors(error)
    }
  }

  checkForLocationPermission = async () => {
    const locationStatus = await this.accountService.isLocationPermissionDenied()

    if (locationStatus === 'denied' || locationStatus === 'serviceTurnedOff') {
      this.navigateToSettings('locationPermission', locationStatus)
    }

    // this.navigateToProfileHub()
  }

  navigateToSettings(routeName: string, locationStatus: string) {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName,
        params: {status: locationStatus}
      })],
      key: null
    }))
  }

  backButtonPressed = () => {
    this.navigateToRegistration()
  }

  resetButtonPressed = async () => {
    try {
      await this.resetPassword(this.state.resetEmail)
      this.setSpecState('reset', true)
    } catch (error) {
      const parsedError = await error.json()
      this.setSpecState('error', {
        ...this.state.error,
        resetEmail: parsedError.errors.Error
      })
    }
  }

  render() {

    const {email, password, error} = this.state

    const formFilled = email || password

    const anyError = error.email || error.password || error.server

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <KeyboardAvoidingView style={styles.content}
                              behavior="position"
                              keyboardVerticalOffset={-40}>
          <UiBlockSpace height={20}/>
          <Text style={styles.title}>Login</Text>
          <UiBlockSpace height={10}/>
          <View style={{position: 'relative'}}>
            <Input
              placeholder={i18n.t('common.placeholder.email')}
              keyboardType='email-address'
              autoCapitalize='none'
              value={this.state.email}
              textColor={error.email ? 'rgb(213, 0, 0)' : undefined}
              baseColor={error.email ? 'rgb(213, 0, 0)' : undefined}
              onChangeText={this.emailChanged}
            />
            {
              this.state.email.length !== 0 ?
                <TouchableOpacity style={styles.clearIconWrapper}  onPress={() => {
                  this.emailChanged('')
                }}>
                  <IOSCLearIcon style={{fontSize: 30}} name="close-o"/>
                </TouchableOpacity>
                : null
            }
          </View>
          <View>
            <Input
              placeholder={i18n.t('common.placeholder.password')}
              secureTextEntry={true}
              value={this.state.password}
              textColor={error.password ? 'rgb(213, 0, 0)' : undefined}
              baseColor={error.password ? 'rgb(213, 0, 0)' : undefined}
              onChangeText={this.passwordChanged}
            />
            {
              this.state.password.length !== 0 ?
                <TouchableOpacity style={styles.clearIconWrapper}  onPress={() => {
                  this.passwordChanged('')
                }}>
                  <IOSCLearIcon style={{fontSize: 30}} name="close-o"/>
                </TouchableOpacity>
                : null
            }
          </View>

          <View>
            <Text style={[styles.forgotPasswordText]} onPress={this.toggleShowResetPassword}>
              {i18n.t('login.resetPassword.caption')}
            </Text>
            <UiBlockSpace height={20}/>
          </View>

        </KeyboardAvoidingView>

        {anyError ? (
          <View style={styles.bottom}>
            <Text style={[styles.messageContainer, styles.errorText]}>
              {formFilled ? anyError.join('\n') : i18n.t('registration.error.form')}
            </Text>
            <UiBlockSpace height={20}/>
          </View>
        ) : null}

        <View style={styles.bottom}>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <NavigationTextButtonBlue
                  onPress={this.backButtonPressed}>
                  {i18n.t('common.buttons.registration')}
                </NavigationTextButtonBlue>
                <NavigationTextButtonWhite
                  onPress={this.loginButtonPressed}>
                  {i18n.t('common.buttons.login')}
                </NavigationTextButtonWhite>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </View>

        <ModalWindow visible={this.state.showResetPassword}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.toggleShowResetPassword}/>
          <UiBlockSpace height={80}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              {i18n.t('login.resetPassword.modal.title')}
            </ModalWindowTitle>
            <UiBlockSpace/>

            {this.state.reset ? (
              <View>
                <ModalWindowText>
                  {i18n.t('login.resetPassword.modal.successDesc')}
                </ModalWindowText>

                <UiBlockSpace/>

                <ButtonBlue onPress={this.toggleShowResetPassword}>
                  {i18n.t('login.resetPassword.modal.closeButton')}
                </ButtonBlue>
              </View>
            ) : (
              <View>
                <ModalWindowText>
                  {i18n.t('login.resetPassword.modal.desc')}
                </ModalWindowText>

                {error.resetEmail && (
                  <Text style={{
                    color: 'red',
                    fontSize: 18
                  }}>
                    {error.resetEmail}
                  </Text>
                )}
                <View>
                  <Input
                    placeholder={i18n.t('common.placeholder.email')}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.resetEmail}
                    textColor={error.resetEmail ? 'rgb(213, 0, 0)' : 'rgb(255, 255, 255)'}
                    baseColor={error.resetEmail ? 'rgb(213, 0, 0)' : 'rgb(255, 255, 255)'}
                    onChangeText={this.resetPasswordChanged}
                  />
                  {
                    this.state.resetEmail.length !== 0 ?
                      <TouchableOpacity style={styles.clearIconWrapper}  onPress={() => {
                        this.resetPasswordChanged('')
                      }}>
                        <IOSCLearIcon style={{fontSize: 30, color: '#fff'}} name="close-o"/>
                      </TouchableOpacity>
                      : null
                  }
                </View>

                <UiBlockSpace/>

                <ButtonBlue onPress={this.resetButtonPressed}>
                  {i18n.t('login.resetPassword.modal.button')}
                </ButtonBlue>
              </View>
            )}

          </ModalWindowContent>
        </ModalWindow>

      </View>
    )
  }

  private navigateToRegistration = () => {
    this.props.navigation.navigate(routeConfig.registration.name)
  }

  private hideKeyboard = () => {
    Keyboard.dismiss()
  }

  private login = (email, password) => {
    return this.accountService.login(email, password)
  }

  private validateForm = () => {
    const errors = validation(this.state, LOGIN_VALIDATION)
    if (errors) {
      throw errors
    }
  }

  private saveEmail = (email) => {
    this.setSpecState('email', email)
  }

  private saveResetEmail = (email) => {
    const errors = validation({emailReset: email}, {
      emailReset: {
        email: {
          message: `^${i18n.t('registration.error.emailText')}`
        },
        presence: true
      }
    })
    if (errors) {
      this.setSpecState('error', errors)
    }
    this.setSpecState('resetEmail', email)
  }

  private resetPassword = (email) => {
    return this.accountService.resetPassword(email)
  }

  private savePassword = (password) => {
    this.setSpecState('password', password)
  }

  private setErrors = (errors) => {
    this.setSpecState('error', errors)
  }

  private toggleShowResetPassword = () => {
    this.setSpecState('reset', false)
    this.setSpecState('showResetPassword', !this.state.showResetPassword)
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
  errorText: {
    color: 'rgb(213, 0, 0)',
    fontWeight: 'bold'
  },
  forgotPasswordText: {
    color: 'rgb(93, 164, 229)',
    fontSize: 19,
    marginTop: 5
  },
  clearIconWrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 5,
    bottom: 12
  }
})
