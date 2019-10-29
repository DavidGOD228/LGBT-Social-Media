import React from 'react'
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import IOSCLearIcon from 'react-native-vector-icons/EvilIcons';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockSpace from '../components/ui/block/space'
import Input from '../components/input'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import ModalWindow from '../components/modal/modal-window'
import ModalCloseBtn from '../components/modal/modal-close-btn'
import ModalWindowContent from '../components/modal/modal-window-content'
import ModalWindowTitle from '../components/modal/modal-window-title'
import ModalWindowText from '../components/modal/modal-window-text'
import ModalLeftBtn from '../components/modal/modal-left-btn'
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue'
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white'
import {AccountService} from '../services/account'
import i18n from '../locales/i18n'
import {validation} from '../utils/validation'
import {REGISTRATION_VALIDATION} from '../validation/registration'
import {lazy} from '../annotations/inversify'
import {NavigationScreenProp} from 'react-navigation'
import routeConfig from '../router'
import BaseScreenDefault from './base/base-scene'
import UiBlockBasic from '../components/ui/block/basic'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  email: string,
  password: string,
  repeatPassword: string,
  error: {
    email?: string[],
    password?: string[],
    repeatPassword?: string[]
  },
  showEmailInfoModal: boolean,
  showPasswordInfoModal: boolean
}

export default class RegistrationScreen extends BaseScreenDefault<Props, State> {
  static navigationOptions = {
    header: <DefaultHeader/>
  }

  @lazy('AccountService')
  private accountService: AccountService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      email: '',
      password: '',
      repeatPassword: '',
      error: {},
      showEmailInfoModal: false,
      showPasswordInfoModal: false
    }
  }

  emailChanged = (text: string) => {
    this.setErrors({})
    this.saveEmail(text)
  }

  passwordChanged = (text: string) => {
    this.setErrors({})
    this.savePassword(text)
  }

  repeatPasswordChanged = (text: string) => {
    this.setErrors({})
    this.saveRepeatPassword(text)
  }

  nextPressed = async () => {
    try {
      this.validateForm()
      await this.createAccount(this.state.email, this.state.password)
      this.navigateToConfirmation()
    } catch (error) {
      console.log(error)
      this.setErrors(error)
    }
  }

  emailInfoPressed = () => {
    this.showEmailInfo()
  }

  modalEmailClosePressed = () => {
    this.hideEmailInfo()
  }

  passwordInfoPressed = () => {
    this.showPasswordInfo()
  }

  modalPasswordClosePressed = () => {
    this.hidePasswordInfo()
  }

  toLoginPressed = () => {
    this.navigateToLogin()
  }

  render() {
    const {email, password, repeatPassword, error} = this.state

    const formFilled = email || password || repeatPassword

    const anyError = error.email || error.password || error.repeatPassword

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <UiBlockBasic style={styles.content}>
          <UiBlockSpace height={15}/>
          <KeyboardAvoidingView behavior="position"
                                keyboardVerticalOffset={43}>
            <Text style={styles.greeting}>{i18n.t('registration.greeting')}</Text>
            <View>
              <Input
                placeholder={i18n.t('common.placeholder.email')}
                keyboardType='email-address'
                autoCapitalize='none'
                value={this.state.email}
                onChangeText={this.emailChanged}
                showInfo={true}
                textColor={error.email ? 'rgb(213, 0, 0)' : undefined}
                baseColor={error.email ? 'rgb(213, 0, 0)' : undefined}
                onInfoPress={this.emailInfoPressed}
              />
              {
                this.state.email.length !== 0 ?
                  <TouchableOpacity style={[styles.clearIconWrapper, {right: 30}]}  onPress={() => {
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
                onChangeText={this.passwordChanged}
                showInfo={true}
                value={this.state.password}
                textColor={error.password ? 'rgb(213, 0, 0)' : undefined}
                baseColor={error.password ? 'rgb(213, 0, 0)' : undefined}
                onInfoPress={this.passwordInfoPressed}
              />
              {
                this.state.password.length !== 0 ?
                  <TouchableOpacity style={[styles.clearIconWrapper, {right: 30}]}  onPress={() => {
                    this.passwordChanged('')
                  }}>
                    <IOSCLearIcon style={{fontSize: 30}} name="close-o"/>
                  </TouchableOpacity>
                  : null
              }
            </View>
            <View>
              <Input
                placeholder={i18n.t('common.placeholder.passwordConfirm')}
                secureTextEntry={true}
                value={this.state.repeatPassword}
                textColor={error.repeatPassword ? 'rgb(213, 0, 0)' : undefined}
                baseColor={error.repeatPassword ? 'rgb(213, 0, 0)' : undefined}
                onChangeText={this.repeatPasswordChanged}
              />
              {
                this.state.repeatPassword.length !== 0 ?
                  <TouchableOpacity style={styles.clearIconWrapper}  onPress={() => {
                    this.repeatPasswordChanged('')
                  }}>
                    <IOSCLearIcon style={{fontSize: 30}} name="close-o"/>
                  </TouchableOpacity>
                  : null
              }
            </View>
          </KeyboardAvoidingView>
        </UiBlockBasic>

        {anyError ? (
          <View style={styles.bottom}>
            <Text style={[styles.messageContainer, styles.errorText]}>
              {formFilled ? anyError.join('\n') : i18n.t('registration.error.form')}
            </Text>
            <UiBlockSpace height={10}/>
          </View>
        ) : (
          <View style={styles.bottom}>
            <Text style={[styles.messageContainer, styles.messageText]}>
              {i18n.t('registration.passwordRequirements')}
            </Text>
            <UiBlockSpace height={10}/>
          </View>
        )}

        <ModalWindow visible={this.state.showEmailInfoModal}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.modalEmailClosePressed}/>
          <UiBlockSpace height={80}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              {i18n.t('registration.modal.email')}
            </ModalWindowTitle>
            <UiBlockSpace/>
            <ModalWindowText>
              {i18n.t('registration.modal.emailMessage')}
            </ModalWindowText>
            <UiBlockSpace height={30}/>
            <ModalLeftBtn onPress={this.modalEmailClosePressed}>
              {i18n.t('common.buttons.close')}
            </ModalLeftBtn>
          </ModalWindowContent>
        </ModalWindow>

        <ModalWindow visible={this.state.showPasswordInfoModal}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.modalPasswordClosePressed}/>
          <UiBlockSpace height={80}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              {i18n.t('registration.modal.password')}
            </ModalWindowTitle>
            <UiBlockSpace/>
            <ModalWindowText>
              {i18n.t('registration.modal.passwordMessage')}
            </ModalWindowText>
            <UiBlockSpace height={100}/>
            <ModalLeftBtn onPress={this.modalPasswordClosePressed}>
              {i18n.t('common.buttons.close')}
            </ModalLeftBtn>
          </ModalWindowContent>
        </ModalWindow>

        <View style={styles.bottom}>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <NavigationTextButtonBlue
                  onPress={this.toLoginPressed}>
                  {i18n.t('common.buttons.login')}
                </NavigationTextButtonBlue>
                <NavigationTextButtonWhite
                  onPress={this.nextPressed}>
                  {i18n.t('common.buttons.next')}
                </NavigationTextButtonWhite>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </View>
      </View>
    )
  }

  private showEmailInfo = () => {
    this.setSpecState('showEmailInfoModal', true)
  }

  private hideEmailInfo = () => {
    this.setSpecState('showEmailInfoModal', false)
  }

  private showPasswordInfo = () => {
    this.setSpecState('showPasswordInfoModal', true)
  }

  private hidePasswordInfo = () => {
    this.setSpecState('showPasswordInfoModal', false)
  }

  private validateForm = () => {
    this.setErrors({})
    const errors = validation(this.state, REGISTRATION_VALIDATION)
    if (errors) {
      throw errors
    }
  }

  private saveEmail = (email: string) => {
    this.setSpecState('email', email)
  }

  private savePassword = (password: string) => {
    this.setSpecState('password', password)
  }

  private saveRepeatPassword = (repeatPassword: string) => {
    this.setSpecState('repeatPassword', repeatPassword)
  }

  private navigateToLogin = () => {
    this.props.navigation.navigate(routeConfig.login.name)
  }

  private navigateToConfirmation = () => {
    this.props.navigation.navigate(routeConfig.registrationConfirmation.name, {
      email: this.state.email,
      password: this.state.password
    })
  }

  private createAccount = (email, password) => {
    console.log(email, password)
    return this.accountService.createNew(email, password)
  }

  private setErrors = (errors) => {
    this.setSpecState('error', errors)
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
    height: '67%'
  },
  errorText: {
    color: 'rgb(213, 0, 0)',
    fontWeight: 'bold'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  messageContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  messageText: {
    color: 'rgb(171, 171, 171)',
    fontSize: 14,
    fontWeight: 'bold'
  },
  greeting: {
    color: 'rgb(46, 46, 46)',
    fontSize: 26,
    fontWeight: '300'
  },
  clearIconWrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 5,
    bottom: 12
  }
})
