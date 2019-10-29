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
import {EMAIL_VALIDATION} from '../../validation/change-email'
import UiBlockBasic from '../../components/ui/block/basic'
import TextBold from '../../components/global/text/basic/text-bold'
import {AccountService} from '../../services/account'
import {lazy} from '../../annotations/inversify'
import routeConfig from '../../router'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  email: string,
  error: {
    email?: string[]
  }
}

export default class ChangeEmailScreen extends BaseScreenDefault<Props, State> {

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
      error: {}
    }
  }

  backButtonPressed = () => {
    this.navigateBack()
  }

  savePressed = () => {
    this.updateEmail()
  }

  emailChanged = (text: string) => {
    this.setErrors({})
    this.saveEmail(text)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <View style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>{i18n.t('changeEmail.screenTitle')}</TextLight>
          <UiBlockSpace height={8}/>
          <LineFullWidth style={styles.titleBottomBorder}/>
          <UiBlockSpace height={10}/>

          <KeyboardAvoidingView behavior="position"
                                keyboardVerticalOffset={43}>
            <Input
              placeholder={i18n.t('common.placeholder.email')}
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={this.emailChanged}
              textColor={this.state.error.email ? 'rgb(213, 0, 0)' : undefined}
              baseColor={this.state.error.email ? 'rgb(213, 0, 0)' : undefined}/>
          </KeyboardAvoidingView>

          {this.state.error.email ? (
            <UiBlockBasic>
              <UiBlockSpace height={20}/>
              <TextBold style={styles.errorText}>
                {this.state.email ? this.state.error.email.join('\n') : i18n.t('registration.error.form')}
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

  private setErrors = (errors) => {
    this.setSpecState('error', errors)
  }

  private saveEmail = (email: string) => {
    this.setSpecState('email', email)
  }

  private async updateEmail() {
    try {
      this.validate()
      const account = await this.accountService.getCurrent()
      if (account) {
        account.set('email', this.state.email)
        await account.save()
        this.props.navigation.navigate(routeConfig.settings.name)
      }
    } catch (error) {
      const parsed = error.json ? {email: ['Such email is already exists.']} : error
      this.setErrors(parsed)
    }
  }

  private validate = () => {
    this.setErrors({})
    const errors = validation(this.state, EMAIL_VALIDATION)
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
