import React from 'react'
import {
  DatePickerIOS,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TimePickerAndroid,
  View
} from 'react-native'
import {
  NavigationActions,
  NavigationScreenProp
} from 'react-navigation'
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel'
import BaseScreenDefault from '../base/base-scene'
import DefaultHeader from '../../components/global/default-header'
import ActionListButton from '../../components/action-list-button'
import ProfileSwitcher from '../../components/profile-switcher'
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel'
import UiBlockSpace from '../../components/ui/block/space'
import TextLight from '../../components/global/text/basic/text-light'
import i18n from '../../locales/i18n'
import AlertsSection, {AlertsComponentData} from '../../components/settings/alerts-section'
import {
  default as QuietHoursSection,
  QuietHoursComponentData
} from '../../components/settings/quiet-hours-section'
import TimeLimitsSection, {TimeLimits} from '../../components/settings/time-limits-section'
import AccountDetailsSection from '../../components/settings/account-details-section'
import SwitcherSection from '../../components/settings/switcher-section'
import BlockedUsersSection from '../../components/settings/blocked-users-section'
import LogoutSection from '../../components/settings/log-out-section'
import ModalWindow from '../../components/modal/modal-window'
import ModalCloseBtn from '../../components/modal/modal-close-btn'
import ModalWindowContent from '../../components/modal/modal-window-content'
import ModalWindowTitle from '../../components/modal/modal-window-title'
import ModalWindowText from '../../components/modal/modal-window-text'
import routeConfig from '../../router'
import {AccountService} from '../../services/account'
import {lazy} from '../../annotations/inversify'
import PopupSlideBottom from '../../components/global/popup/popup-slide-bottom'
import PopupHeader from '../../components/global/popup/header'
import PopupContent from '../../components/global/popup/content'
import PopupTwoButtonsContainer from '../../components/global/popup/two-buttons-container'
import PopupButton from '../../components/global/popup/button'
import {LocalSettingsService} from '../../services/local-settings'
import Time from '../../models/time'
import AccountModel from '../../models/account'
import LineFullWidth from '../../components/global/line-full-width'
import {NotificationService} from '../../services/notification'
import DeleteAccountSection from '../../components/settings/delete-account-section'
// import MetricsSection from '../../components/settings/metrics-section'

interface State {
  metricsType: string
  alerts: AlertsComponentData
  quietHours: QuietHoursComponentData
  timeLimits: TimeLimits
  account: AccountModel
  switcher: {
    showPhotosInSwitcher: boolean
  }
  showInfoModal: boolean
  infoModalTitle: string
  infoModalText: string
  showDeleteAccountPopup: boolean
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class SettingsScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  @lazy('AccountService')
  private accountService: AccountService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('NotificationService')
  private notificationService: NotificationService

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      metricsType: 'Imperial',
      alerts: {
        all: false,
        notifications: false,
        sound: false,
        vibrate: false
      },
      quietHours: {
        on: false,
        // parameter to render DatePickerIOS
        timeTmp: new Time(9, 0),
        // parameter that is set after user press 'save' button
        timeStart: new Time(9, 0),
        // parameter that is set after user press 'save' button
        timeEnd: new Time(17, 0),
        showIosSelector: false,
        currentParameter: 'start'
      },
      timeLimits: {
        on: false,
        timeLimitType: 'Daily',
        hours: 3
      },
      switcher: {
        showPhotosInSwitcher: false
      },
      showInfoModal: false,
      infoModalTitle: '',
      infoModalText: '',
      showDeleteAccountPopup: false
    }

    this.initQuietHours()

    this.localSettingsService.getUserMetrics()
        .then(value => {
          this.setState({
            ...this.state,
            metricsType: value
          })
        })

    Promise.all([
             this.localSettingsService.isAlertsAllTurnedOn(),
             this.localSettingsService.isAlertsNotificationsTurnedOn(),
             this.localSettingsService.isAlertsSoundTurnedOn(),
             this.localSettingsService.isAlertsVibrateTurnedOn()])
           .then(values => {
             this.setSpecState('alerts', {
               all: values[0],
               notifications: values[1],
               sound: values[2],
               vibrate: values[3]
             })
           })
           .catch(error => console.log('error: ' + error))

    Promise.all([
             this.localSettingsService.isTimeLimitTurnedOn(),
             this.localSettingsService.getTimeLimitDailyWeekly(),
             this.localSettingsService.getTimeLimitHours()])
           .then(values => {
             this.setSpecState('timeLimits', {
               on: values[0],
               timeLimitType: values[1],
               hours: values[2] || 1
             })
           })

    this.localSettingsService.isPhotosInSwitcherTurnedOn()
        .then(value => this.setState({
          ...this.state,
          switcher: {
            showPhotosInSwitcher: value
          }
        }))

    this.accountService.getCurrent()
        .then(account => {
          if (account) {
            this.setSpecState('account', account)
          }
        })
  }

  initQuietHours() {
    this.localSettingsService.isQuietHoursTurnedOn()
        .then((value) => {
          this.state.quietHours.on = value
          this.setState(this.state)
        })

    this.initQuietHoursStart()
    this.initQuietHoursEnd()
  }

  async initQuietHoursStart() {
    let value = await this.localSettingsService.getQuietHoursStart()
    if (!value) {
      value = JSON.stringify(this.state.quietHours.timeStart)
      this.localSettingsService.setQuietHoursStart(value)
    }
    const time = JSON.parse(value)
    this.state.quietHours.timeStart.setHours(time.hours)
    this.state.quietHours.timeStart.setMinutes(time.minutes)
    this.setState(this.state)
  }

  async initQuietHoursEnd() {
    let value = await this.localSettingsService.getQuietHoursEnd()
    if (!value) {
      value = JSON.stringify(this.state.quietHours.timeEnd)
      this.localSettingsService.setQuietHoursEnd(value)
    }
    const time = JSON.parse(value)
    this.state.quietHours.timeEnd.setHours(time.hours)
    this.state.quietHours.timeEnd.setMinutes(time.minutes)
    this.setState(this.state)
  }

  metricsSelected = (type: string) => {
    this.setMetrics(type)
  }

  alertsAllChanged = (value: boolean) => {
    this.localSettingsService.setAlertsAllTurnedOn(value)
        .then(() => {
          this.state.alerts.all = value
          this.setState(this.state)
        })
    this.notificationService.saveNotificationSettings()
  }

  alertsNotificationsChanged = (value: boolean) => {
    this.localSettingsService.setAlertsNotificationsTurnedOn(value)
        .then(() => {
          this.state.alerts.notifications = value
          this.setState(this.state)
        })
    this.notificationService.saveNotificationSettings()
  }

  alertsSoundChanged = (value: boolean) => {
    this.localSettingsService.setAlertsSoundTurnedOn(value)
        .then(() => {
          this.state.alerts.sound = value
          this.setState(this.state)
        })
    this.notificationService.saveNotificationSettings()
  }

  alertsVibrationChanged = (value: boolean) => {
    this.localSettingsService.setAlertsVibrateTurnedOn(value)
        .then(() => {
          this.state.alerts.vibrate = value
          this.setState(this.state)
        })
    this.notificationService.saveNotificationSettings()
  }

  quietHoursSwitched = (value: boolean) => {
    this.localSettingsService.setQuietHoursTurnedOn(value)
        .then(() => {
          this.state.quietHours.on = value
          this.setState({...this.state})
        })
    this.notificationService.saveNotificationSettings()
  }

  timeLimitsChange = (value: TimeLimits) => {
    this.localSettingsService.setTimeLimitTurnedOn(value.on);
    this.localSettingsService.setTimeLimitHours(value.hours);
    this.localSettingsService.setTimeLimitDailyWeekly(value.timeLimitType);

    this.setState({
      ...this.state,
      timeLimits: value
    })
  }

  usePhotosInSwitcherChanged = (value: boolean) => {
    this.localSettingsService.setPhotosInSwitcherTurnedOn(value)
    this.setState({switcher: {showPhotosInSwitcher: value}})
  }

  changeEmailPressed = () => {
    this.startChangeEmail()
  }

  changePasswordPressed = () => {
    this.startChangePassword()
  }

  blockedUsersPress = () => {
    this.goToBlockedUsers()
  }

  logoutPress = async () => {
    await this.logout()
    this.navigateToLogin()
  }

  deleteAccountPressed = () => {
    this.setSpecState('showDeleteAccountPopup', true)
  }

  confirmDeleteAccountPressed = async () => {
    await this.deleteAccount()
    this.navigateToLogin()
  }

  cancelDeleteAccountPressed = () => {
    this.setSpecState('showDeleteAccountPopup', false)
  }

  alertsInfoPressed = () => {
    this.showAlertsInfo()
  }

  quietHoursInfoPressed = () => {
    this.showQuietHoursInfo()
  }

  quietHoursStartPressed = () => {
    this.showQuietHoursTimeSelector('start')
  }

  quietHoursEndPressed = () => {
    this.showQuietHoursTimeSelector('end')
  }

  quietHoursIosPopupCancelPressed = () => {
    this.state.quietHours.showIosSelector = false
    this.setState(this.state)
  }

  quietHoursIosDateChanged = (date: Date) => {
    this.state.quietHours.timeTmp.setHours(date.getHours())
    this.state.quietHours.timeTmp.setMinutes(date.getMinutes())
    this.setState(this.state)
    this.notificationService.saveNotificationSettings()
  }

  quietHoursIosPopupSavePressed = () => {
    this.state.quietHours.showIosSelector = false
    this.saveQuietHour()
    this.notificationService.saveNotificationSettings()
  }

  timeLimitsInfoPressed = () => {
    this.showTimeLimitsInfo()
  }

  emailInfoPressed = () => {
    this.showEmailInfo()
  }

  passwordInfoPressed = () => {
    this.showPasswordInfo()
  }

  photosInSwitcherInfoPressed = () => {
    this.showPhotosInSwitcherInfo()
  }

  modalInfoClosePressed = () => {
    this.hideModalInfo()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <ScrollView style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>{i18n.t('settings.screenTitle')}</TextLight>
          <UiBlockSpace height={8}/>
          <LineFullWidth style={{backgroundColor: '#979797'}}/>

          {/*<MetricsSection metricsType={this.state.metricsType} onMetricsSelected={this.metricsSelected}/>*/}

          <UiBlockSpace height={20}/>
          <AlertsSection
            alerts={this.state.alerts}
            alertsAllChanged={this.alertsAllChanged}
            alertsNotificationsChanged={this.alertsNotificationsChanged}
            alertsSoundChanged={this.alertsSoundChanged}
            alertsVibrationChanged={this.alertsVibrationChanged}
            infoPressed={this.alertsInfoPressed}/>
          <UiBlockSpace height={20}/>
          <QuietHoursSection
            quietHours={this.state.quietHours}
            onInfoPress={this.quietHoursInfoPressed}
            onQuietHoursToggle={this.quietHoursSwitched}
            onTimeStartPress={this.quietHoursStartPressed}
            onTimeEndPress={this.quietHoursEndPressed}/>
          <UiBlockSpace height={20}/>
          <TimeLimitsSection
            on={this.state.timeLimits.on}
            hours={this.state.timeLimits.hours}
            timeLimitType={this.state.timeLimits.timeLimitType}
            timeLimitsChange={this.timeLimitsChange}
            infoPressed={this.timeLimitsInfoPressed}/>
          <UiBlockSpace height={20}/>
          <AccountDetailsSection
            email={this.state.account ? this.state.account.email : ''}
            onEmailInfoPressed={this.emailInfoPressed}
            onPasswordInfoPressed={this.passwordInfoPressed}
            onChangeEmailPressed={this.changeEmailPressed}
            onChangePasswordPressed={this.changePasswordPressed}/>
          <UiBlockSpace height={20}/>
          <SwitcherSection
            usePhotos={this.state.switcher.showPhotosInSwitcher}
            onChangeUsePhotos={this.usePhotosInSwitcherChanged}
            onInfoPress={this.photosInSwitcherInfoPressed}/>
          <UiBlockSpace height={20}/>
          <BlockedUsersSection onBlockedUsersPress={this.blockedUsersPress}/>
          <UiBlockSpace height={20}/>
          <LogoutSection onLogoutPress={this.logoutPress}/>
          <UiBlockSpace height={20}/>
          <DeleteAccountSection onDeletePress={this.deleteAccountPressed}/>
          <UiBlockSpace height={40}/>
        </ScrollView>

        <ModalWindow visible={this.state.showInfoModal}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.modalInfoClosePressed}/>
          <UiBlockSpace height={80}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              {this.state.infoModalTitle}
            </ModalWindowTitle>
            <UiBlockSpace/>
            <ModalWindowText>
              {this.state.infoModalText}
            </ModalWindowText>
          </ModalWindowContent>
        </ModalWindow>

        <PopupSlideBottom visible={this.state.showDeleteAccountPopup}>
          <PopupHeader>{i18n.t('settings.deleteAccount.popupTitle')}</PopupHeader>
          <UiBlockSpace height={15}></UiBlockSpace>
          <PopupContent>{i18n.t('settings.deleteAccount.popupText')}</PopupContent>
          <UiBlockSpace height={15}></UiBlockSpace>
          <PopupTwoButtonsContainer>
            <PopupButton onPress={this.cancelDeleteAccountPressed}>
              {i18n.t('settings.deleteAccount.dismissButton')}
            </PopupButton>
            <PopupButton onPress={this.confirmDeleteAccountPressed}>
              {i18n.t('settings.deleteAccount.confirmButton')}
            </PopupButton>
          </PopupTwoButtonsContainer>
          <UiBlockSpace height={15}></UiBlockSpace>
        </PopupSlideBottom>

        <PopupSlideBottom visible={this.state.quietHours.showIosSelector}>
          <PopupHeader>Set {this.state.quietHours.currentParameter} time</PopupHeader>
          <UiBlockSpace height={15}></UiBlockSpace>
          <DatePickerIOS
            date={this.state.quietHours.timeTmp.getDateObject()}
            mode='time'
            onDateChange={this.quietHoursIosDateChanged}/>
          <UiBlockSpace height={15}></UiBlockSpace>
          <PopupTwoButtonsContainer>
            <PopupButton onPress={this.quietHoursIosPopupCancelPressed}>{i18n.t('common.buttons.cancel')}</PopupButton>
            <PopupButton onPress={this.quietHoursIosPopupSavePressed}>{i18n.t('common.buttons.save')}</PopupButton>
          </PopupTwoButtonsContainer>
          <UiBlockSpace height={15}></UiBlockSpace>
        </PopupSlideBottom>

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

  private showQuietHoursTimeSelector = (type: 'start' | 'end') => {
    if (type === 'start') {
      this.state.quietHours.timeTmp
        = new Time(this.state.quietHours.timeStart.getHours(), this.state.quietHours.timeStart.getMinutes())
    } else {
      this.state.quietHours.timeTmp
        = new Time(this.state.quietHours.timeEnd.getHours(), this.state.quietHours.timeEnd.getMinutes())
    }

    this.state.quietHours.currentParameter = type
    if (Platform.OS === 'ios') {
      this.showQuietHoursIosSelector()
    }
    if (Platform.OS === 'android') {
      this.showQuietHoursAndroidSelector()
    }
  }

  private showQuietHoursIosSelector = () => {
    this.state.quietHours.showIosSelector = true
    this.setState(this.state)
  }

  private async showQuietHoursAndroidSelector() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.quietHours.timeTmp.getHours(),
        minute: this.state.quietHours.timeTmp.getMinutes(),
        is24Hour: false
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        this.state.quietHours.timeTmp.setHours(hour)
        this.state.quietHours.timeTmp.setMinutes(minute)
        this.saveQuietHour()
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message)
    }
  }

  private saveQuietHour = () => {
    if (this.state.quietHours.currentParameter === 'start') {
      this.state.quietHours.timeStart = this.state.quietHours.timeTmp
      this.localSettingsService.setQuietHoursStart(JSON.stringify(this.state.quietHours.timeStart))
    } else {
      this.state.quietHours.timeEnd = this.state.quietHours.timeTmp
      this.localSettingsService.setQuietHoursEnd(JSON.stringify(this.state.quietHours.timeEnd))
    }
    this.setState(this.state)
    this.notificationService.saveNotificationSettings()
  }

  private showAlertsInfo = () => {
    this.setState({
      ...this.state,
      infoModalTitle: i18n.t('settings.alerts.modalTitle'),
      infoModalText: i18n.t('settings.alerts.modalInfo'),
      showInfoModal: true
    })
  }

  private showQuietHoursInfo = () => {
    this.setState({
      ...this.state,
      infoModalTitle: i18n.t('settings.quietHours.modalTitle'),
      infoModalText: i18n.t('settings.quietHours.modalInfo'),
      showInfoModal: true
    })
  }

  private showTimeLimitsInfo = () => {
    this.setState({
      ...this.state,
      infoModalTitle: i18n.t('settings.timeLimits.modalTitle'),
      infoModalText: i18n.t('settings.timeLimits.modalInfo'),
      showInfoModal: true
    })

  }

  private showEmailInfo = () => {
    this.setState({
      ...this.state,
      infoModalTitle: i18n.t('registration.modal.email'),
      infoModalText: i18n.t('registration.modal.emailMessage'),
      showInfoModal: true
    })
  }

  private showPasswordInfo = () => {
    this.setState({
      ...this.state,
      infoModalTitle: i18n.t('registration.modal.password'),
      infoModalText: i18n.t('registration.modal.passwordMessage'),
      showInfoModal: true
    })

  }

  private showPhotosInSwitcherInfo = () => {
    this.setState({
      ...this.state,
      infoModalTitle: i18n.t('settings.switcher.modalTitle'),
      infoModalText: i18n.t('settings.switcher.modalInfo'),
      showInfoModal: true
    })
  }

  private hideModalInfo = () => {
    this.setSpecState('showInfoModal', false)
  }

  private setMetrics = (type: string) => {
    this.localSettingsService.setUserMetrics(type)
    this.setSpecState('metricsType', type)
  }

  private startChangeEmail = () => {
    this.props.navigation.navigate(routeConfig.changeEmail.name)
  }

  private startChangePassword = () => {
    this.props.navigation.navigate(routeConfig.changePassword.name)
  }

  private goToBlockedUsers = () => {
    this.props.navigation.navigate(routeConfig.blockedUsers.name)
  }

  private deleteAccount = () => {
    return this.accountService.deleteCurrent()
  }

  private logout = () => {
    return this.accountService.logout()
  }

  private navigateToLogin = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routeConfig.login.name,
          params: {}
        })
      ],
      key: null
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
  twoValueSwitcherContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  fieldsContainer: {
    paddingLeft: 15,
    paddingRight: 7
  }
})
