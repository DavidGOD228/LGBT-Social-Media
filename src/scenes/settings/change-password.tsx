import React from 'react'
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import BaseScreenDefault from '../base/base-scene'
import {NavigationScreenProp} from 'react-navigation'
import DefaultHeader from '../../components/global/default-header'
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel'
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center'
import NavigationTextButtonBlue from '../../components/global/bottom-navigation/text-button-blue'
import i18n from '../../locales/i18n'
import UiBlockSpace from '../../components/ui/block/space'
import TextLight from '../../components/global/text/basic/text-light'
import LineFullWidth from '../../components/global/line-full-width'
import Input from '../../components/input'
import NavigationTextButtonWhite from '../../components/global/bottom-navigation/text-button-white'
import {validation} from '../../utils/validation'
import {CHANGE_PASSWORD_VALIDATION} from '../../validation/change-password'
import TextBold from '../../components/global/text/basic/text-bold'
import UiBlockBasic from '../../components/ui/block/basic'
import {AccountService} from '../../services/account'
import {lazy} from '../../annotations/inversify'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  password: string,
  repeatPassword: string,
  error: {
    password?: string[],
    repeatPassword?: string[]
  }
}

export default class ChangePasswordScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = {
    header: <DefaultHeader/>
  }

  @lazy('AccountService')
  private accountService: AccountService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      password: '',
      repeatPassword: '',
      error: {}
    }
  }

  backButtonPressed = () => {
    this.navigateBack()
  }

  passwordChanged = (text: string) => {
    this.setErrors({})
    this.savePassword(text)
  }

  repeatPasswordChanged = (text: string) => {
    this.setErrors({})
    this.saveRepeatPassword(text)
  }

  savePressed = () => {
    this.updatePassword()
  }

  render() {
    const formFilled = this.state.password || this.state.repeatPassword
    const anyError = this.state.error.password || this.state.error.repeatPassword

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <View style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>{i18n.t('changePassword.screenTitle')}</TextLight>
          <UiBlockSpace height={8}/>
          <LineFullWidth style={styles.titleBottomBorder}/>
          <UiBlockSpace height={10}/>
          <KeyboardAvoidingView behavior="position"
                                keyboardVerticalOffset={43}>
            <Input
              placeholder={i18n.t('common.placeholder.password')}
              secureTextEntry={true}
              onChangeText={this.passwordChanged}
              textColor={this.state.error.password ? 'rgb(213, 0, 0)' : undefined}
              baseColor={this.state.error.password ? 'rgb(213, 0, 0)' : undefined}/>

            <Input
              placeholder={i18n.t('common.placeholder.passwordConfirm')}
              secureTextEntry={true}
              textColor={this.state.error.repeatPassword ? 'rgb(213, 0, 0)' : undefined}
              baseColor={this.state.error.repeatPassword ? 'rgb(213, 0, 0)' : undefined}
              onChangeText={this.repeatPasswordChanged}/>
          </KeyboardAvoidingView>

          {anyError ? (
            <UiBlockBasic>
              <UiBlockSpace height={20}/>
              <TextBold style={styles.errorText}>
                {formFilled ? anyError.join('\n') : i18n.t('registration.error.form')}
              </TextBold>
            </UiBlockBasic>
          ) : (
            null
          )}

        </View>

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <NavigationTextButtonBlue
                  onPress={this.backButtonPressed}>
                  {i18n.t('common.buttons.back')}
                </NavigationTextButtonBlue>
                <NavigationTextButtonWhite
                  onPress={this.savePressed}>
                  {i18n.t('common.buttons.save')}
                </NavigationTextButtonWhite>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </View>
    )
  }

  private savePassword = (password: string) => {
    this.setSpecState('password', password)
  }

  private saveRepeatPassword = (repeatPassword: string) => {
    this.setSpecState('repeatPassword', repeatPassword)
  }

  private setErrors = (errors) => {
    this.setSpecState('error', errors)
  }

  private updatePassword = async () => {
    try {
      this.validate()
      const account = await this.accountService.getCurrent()
      if (!account) {
        throw new Error('there is no account')
      }
      account.set('password', this.state.password)
      await account.save()
      this.navigateBack()
    } catch (error) {
      const parsed = error.json ? await error.json() : error
      this.setErrors(parsed)
    }
  }

  private validate = () => {
    this.setErrors({})
    const errors = validation(this.state, CHANGE_PASSWORD_VALIDATION)
    if (errors) {
      throw errors
    }
  }

  private navigateBack = () => {
    this.props.navigation.goBack()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 24
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  errorText: {
    color: 'rgb(213, 0, 0)'
  }
})
