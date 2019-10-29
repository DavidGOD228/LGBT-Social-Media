import React from 'react'
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import BaseScreenDefault from './base/base-scene'
import DefaultHeader from '../components/global/default-header'
import {NavigationScreenProp} from 'react-navigation'
import UiBlockBottomPanel from '../components/ui/block/bottom-panel'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue'
import i18n from '../locales/i18n'
import UiBlockSpace from '../components/ui/block/space'
import TextLight from '../components/global/text/basic/text-light'
import {BlockService} from '../services/block'
import {lazy} from '../annotations/inversify'
import ProfileModel from '../models/profile'
import GridView from '../components/global/grid-view'
import CommunityGridItem from '../components/community-grid-item'
import {ProfileService} from '../services/profile'
import routeConfig from '../router'
import {LocalSettingsService} from '../services/local-settings'
import {ProfileDataService} from '../services/profile-data'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  users: ProfileModel[]
  refreshing: boolean
  activeProfile: ProfileModel,
  sessionId: string
}

export default class BlockedUsersScreen extends BaseScreenDefault<Props, State> {
  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  @lazy('BlockService')
  private blockService: BlockService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('ProfileDataService')
  private profileDataService: ProfileDataService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  private userMetrics: string

  constructor(props) {
    super(props)

    const activeProfile = this.profileService.getActive()

    if (!activeProfile) {
      throw new Error('no active profile')
    }

    this.state = {
      ...this.state,
      refreshing: false,
      activeProfile
    }

    this.localSettingsService.getSession()
        .then(sessionId => {
          this.setState({
            ...this.state,
            sessionId
          })
        })
        .then(() => this.localSettingsService.getUserMetrics())
        .then(val => this.userMetrics = val)
        .then(() => this.getCommunityViews())
  }

  backButtonPressed = () => {
    this.navigateBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <View style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>{i18n.t('blockedUsers.screenTitle')}</TextLight>
          <UiBlockSpace height={8}/>

          <GridView
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            columnCount={3}
            columnSpacing={1}
            dataSource={this.state.users}
            renderRow={data => (
              <CommunityGridItem
                onItemClick={() => this.onItemClick(data)}
                model={data}
                key={data.profileId}
                profileType={this.state.activeProfile.profileType.code}
                sessionId={this.state.sessionId}
              />
            )}
          />
        </View>

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <NavigationTextButtonBlue
                  onPress={this.backButtonPressed}>
                  {i18n.t('common.buttons.back')}
                </NavigationTextButtonBlue>
                <View/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </View>
    )
  }

  private onItemClick = (profile) => {
    this.props.navigation.navigate(routeConfig.profileView.name, {profile})
  }

  private onRefresh = () => {
    this.setSpecState('refreshing', true)

    this.getCommunityViews()
        .then(() => this.setSpecState('refreshing', false))
  }

  private getCommunityViews = () => {
    return this.blockService.getBlockedProfiles()
               .then(profiles => {
                 this.setSpecState('users', profiles.map(it => ({
                   ...it,
                   key: it.profileId,
                   distanceToDisplay: this.profileDataService.getDistanceToDisplaySync(
                     it.distance,
                     this.userMetrics)
                 })))
               })
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
  content: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    paddingLeft: 10,
    paddingRight: 10
  },
  usersList: {}
})
