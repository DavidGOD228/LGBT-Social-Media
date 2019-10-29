import React, {Component} from 'react'
import {
  AppState,
  View
} from 'react-native'
import {
  NavigationActions,
  StackNavigator,
  StackNavigatorConfig
} from 'react-navigation'
import routeConfig from './router'
import {LocalSettingsService} from './services/local-settings'
import {lazy} from './annotations/inversify'
import PopupSlideBottom from './components/global/popup/popup-slide-bottom'
import PopupHeader from './components/global/popup/header'
import UiBlockSpace from './components/ui/block/space'
import PopupContent from './components/global/popup/content'
import PopupTwoButtonsContainer from './components/global/popup/two-buttons-container'
import PopupButton from './components/global/popup/button'
import TextNormal from './components/global/text/basic/text-normal'
import TextBold from './components/global/text/basic/text-bold'
import eventEmitter from './utils/event-emitter'
import {EVENTS} from './configs/dicts'
import firebase from './utils/firebase'
import {AccountService} from './services/account'

interface Props {
  children: any
}

interface State {
  appState: any
  showLimitWarning: boolean
  showFinalWarning: boolean
}

const stackNavigatorConfig: StackNavigatorConfig = {
  mode: 'card',
  headerMode: 'screen',
  initialRouteName: 'home'
}

const Stack = StackNavigator(routeConfig, stackNavigatorConfig)

export default class ContainerComponent extends Component<Props, State> {

  @lazy('LocalSettingsService')
  localSettingsService: LocalSettingsService

  @lazy('AccountService')
  private accountService: AccountService

  private timeTrackingStart: number
  private timeTrackingIntervalId: any
  private navigator: any
  private currentRouteName: string

  constructor(props) {
    super(props)

    this.state = {
      appState: AppState.currentState,
      showLimitWarning: false,
      showFinalWarning: false
    }

    this.onAppOpening()

    eventEmitter.on(EVENTS.shouldStartTracking, this.startTimeTracking)
  }

  componentWillMount() {
    AppState.addEventListener('change', this.handleStateChange)
    this.onAppOpening()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleStateChange)
  }

  startTimeTracking = async () => {
    console.log('TIMETRACKID', this.timeTrackingIntervalId)
    if (this.timeTrackingIntervalId) {
      return
    }
    this.timeTrackingStart = +(new Date())
    this.timeTrackingIntervalId = setInterval(this.trackTime, 5000)
  }

  stopTimeTracking = async () => {
    clearInterval(this.timeTrackingIntervalId)
    this.timeTrackingIntervalId = null
  }

  trackTime = async () => {
    const currentTime = new Date()

    const lastTrackedDate = new Date(+(await this.localSettingsService.getLastTrackedDate())) || currentTime

    if (currentTime.getDay() !== lastTrackedDate.getDay()) {
      const limitHours = await this.localSettingsService.getTimeLimitHours()
      await this.localSettingsService.setTimeLeft(+limitHours * 60 * 60 * 1000)
      await this.localSettingsService.setLastTrackedDate(+currentTime)
      await this.localSettingsService.setTimeLimitPrewarningShown(false)
      await this.localSettingsService.setTimeLimitFinalWarningShown(false)
      return
    }

    const lastKnownTimeLeft = +(await this.localSettingsService.getTimeLeft())
    const timeLeft = lastKnownTimeLeft - ((+currentTime) - (this.timeTrackingStart))

    // if elapsed is 0 or less -> set 0
    await this.localSettingsService.setTimeLeft(timeLeft || 0)
    await this.localSettingsService.setLastTrackedDate(+currentTime)

    this.timeTrackingStart = +currentTime

    console.log('TIMETRACKING', 'TIME LEFT (sec): ' + timeLeft / 1000)

    // maybe i should use event emitter here
    const shouldShowWarning = timeLeft < 1000 * 60 * 10
    const shouldShowFinalWarning = timeLeft <= 0
    const preWarningShown = await this.localSettingsService.getTimeLimitPrewarningShown()
    const finalWarningShown = await this.localSettingsService.getTimeLimitFinalWarningShown()

    if ((shouldShowWarning && !preWarningShown) || (shouldShowFinalWarning && !finalWarningShown)) {

      if (shouldShowWarning) {
        await this.localSettingsService.setTimeLimitPrewarningShown(true)
      }

      if (shouldShowFinalWarning) {
        await this.localSettingsService.setTimeLimitFinalWarningShown(true)
      }

      this.setState({
        ...this.state,
        showLimitWarning: shouldShowWarning && !preWarningShown,
        showFinalWarning: shouldShowFinalWarning && !finalWarningShown
      })
    }

  }

  navigationStateChanged = (_prevState, _newState, _action) => {
    const routes = _newState.routes
    if (!routes || routes.length === 0) {
      return
    }

    this.currentRouteName = routes[routes.length - 1].routeName
  }

  render() {

    return <View style={{flex: 1}}>
      <Stack ref={nav => {this.navigator = nav}} onNavigationStateChange={this.navigationStateChanged} />

      <PopupSlideBottom visible={this.state.showLimitWarning}>
        <PopupHeader>Take a few more moments</PopupHeader>
        <UiBlockSpace height={20}/>
        <PopupContent>
          <TextNormal>We'll ping you again in a few minutes</TextNormal>
          <TextBold>{'\nYou have 10 minutes left'}</TextBold>
        </PopupContent>
        <UiBlockSpace height={20}/>
        <PopupTwoButtonsContainer>
          <PopupButton onPress={() => this.setState({
            ...this.state,
            showLimitWarning: false
          })}>Dismiss</PopupButton>
        </PopupTwoButtonsContainer>
        <UiBlockSpace height={20}/>
      </PopupSlideBottom>

      <PopupSlideBottom visible={this.state.showFinalWarning}>
        <PopupHeader>Your time is up</PopupHeader>
        <UiBlockSpace height={20}/>
        <PopupContent>
          <TextNormal>You've reached the end of your limits</TextNormal>
        </PopupContent>
        <UiBlockSpace height={20}/>
        <PopupTwoButtonsContainer>
          <PopupButton onPress={() => this.setState({
            ...this.state,
            showFinalWarning: false
          })}>Dismiss</PopupButton>
        </PopupTwoButtonsContainer>
        <UiBlockSpace height={20}/>
      </PopupSlideBottom>
    </View>
  }

  navigateBlank(routeName: string, locationStatus: string) {
    this.navigator.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName,
        params: {status: locationStatus}
      })],
      key: null
    }))
  }

  private onAppOpening = async () => {
    let isTimeLimitActive
    try {
      isTimeLimitActive = await this.localSettingsService.isTimeLimitTurnedOn()
    } catch (e) {
      console.log('time limit is not active', e)
    }
    if (isTimeLimitActive) {
      this.startTimeTracking()
    }

    firebase.messaging()
            .removeDeliveredNotification('*')

    this.checkLocationPermission()
  }

  private onAppClosing = async () => {
    if (this.timeTrackingStart) {
      this.stopTimeTracking()
    }
  }

  private handleStateChange = async (nextState) => {
    if (this.state.appState.match(/inactive|background/) && nextState === 'active') {
      console.log('App has come to the foreground!')
      this.onAppOpening()
    } else {
      console.log('App is moving to background')
      this.onAppClosing()
    }
    this.setState({
      ...this.state,
      appState: nextState
    })
  }

  private checkLocationPermission = async () => {
    if (!await this.accountService.isLogged()) {
      return
    }

    this.checkPhoneLocationDenied()
  }

  private checkPhoneLocationDenied = async () => {
    const permissionDenied = await this.accountService.isLocationPermissionDenied()
    this.localSettingsService
        .updateLocationPermissionDenied(permissionDenied === 'denied' || permissionDenied === 'serviceTurnedOff')
    this.toggleLocationWarning(permissionDenied)
  }

  private toggleLocationWarning = (locationStatus: string) => {
    if (locationStatus === 'denied') {
      this.navigateBlank('locationPermission', locationStatus)
      return
    }
    if (locationStatus === 'serviceTurnedOff') {
      this.navigateBlank('locationPermission', locationStatus)
      return
    }


    if (this.currentRouteName === 'locationPermission') {
      this.navigateBlank('home', locationStatus)
    }
  }
}
