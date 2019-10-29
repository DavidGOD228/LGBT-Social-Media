import React from 'react'
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockBottomPanel from '../components/ui/block/bottom-panel'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import ActionListButton from '../components/action-list-button'
import ProfileSwitcher from '../components/profile-switcher'
import GridView from '../components/global/grid-view'
import CommunityGridItem from '../components/community-grid-item'
import BaseScreenDefault from './base/base-scene'
import AdBannerCommunityHorizontal from '../components/ad/banner-community-horisontal'
import {NavigationScreenProp} from 'react-navigation'
import {SearchRequest} from '../dto/search-request'
import {MultiCondition} from '../dto/multi-condition'
import Fetch from '../utils/fetch'
import configuration from '../configs/index'
import ProfileModel from '../models/profile'
import routeConfig from '../router'
import {ProfileService} from '../services/profile'
import {lazy} from '../annotations/inversify'
import CommunityFooter from '../components/community-footer'
import CommunityHeaderAdjust from '../components/community-header-adjust'
import {LocalSettingsService} from '../services/local-settings'
import CommunityHeaderEmpty from '../components/community-header-empty'
import {ProfileDataService} from '../services/profile-data'

interface State {
  dataSource: any,
  refreshing: boolean,
  profile: ProfileModel,
  restrictionMap: any,
  hashTags,
  searchResponse: any,
  sessionId: string,
}

export default class CommunityScreen extends BaseScreenDefault <{ navigation: NavigationScreenProp<any, any> }, State> {

  static navigationOptions = ({navigation}) => ({
    title: 'CommunityScreen',
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>,
    headerLeft: null
  })

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('ProfileDataService')
  private profileDataService: ProfileDataService

  private listReference?: FlatList<any>

  private userMetrics: string

  constructor(props) {
    super(props)

    const params = this.props.navigation.state.params || {}
    const {
      restrictionMap = {},
      hashTags = []
    } = params

    const profile = this.profileService.getActive()

    if (!profile) {
      throw new Error('no active profile')
    }

    this.state = {
      ...this.state,
      refreshing: false,
      profile,
      restrictionMap,
      hashTags
    }

    this.localSettingsService.getUserMetrics()
        .then(val => this.userMetrics = val)
        .then(() => this.getCommunityViews())
  }

  getCommunityViews = async () => {
    const sessionId = await this.localSettingsService.getSession()
    const restrictions = Object.keys(this.state.restrictionMap)
                               .map(key => this.state.restrictionMap[key])
                               .map(r => ({
                                 ...r,
                                 values: r.values.map(v => v.value || v)
                               }))

    let location
    try {
      location = JSON.parse(await this.localSettingsService.getValue('LOCATION'))
    } catch (err) {
      console.log('location', err)
    }

    const searchRequest = new SearchRequest()

    searchRequest.latitude = (location && location.latitude) || 0
    searchRequest.longitude = (location && location.longitude) || 0

    const isExploreEnabled = await this.localSettingsService.getExploreEnabled()
    const exploreLocation = await this.localSettingsService.getExploreLocation()
    if (isExploreEnabled && exploreLocation) {
      searchRequest.latitude = exploreLocation.latitude
      searchRequest.longitude = exploreLocation.longitude
    }

    if (!searchRequest.latitude && !searchRequest.longitude) {
      Alert.alert(
        'Device location is not available',
        'MUSL app doesn\'t have an access to your location, please turn on your location.',
        [
          {
            text: 'OK'
          }
        ]
      )
    }

    if (restrictions) {
      const multiCondition = new MultiCondition()

      multiCondition.restrictions = restrictions
      multiCondition.nature = 'And'
      searchRequest.multiCondition = [multiCondition]
    }

    searchRequest.profileTypeCode = this.state.profile.profileType.code
    searchRequest.hashTags = this.state.hashTags

    console.log('SEARCH REQUEST', searchRequest)

    return Fetch.post(configuration.remoteApi.base + '/community-views/search', searchRequest)
                .then(response => {
                  console.log('SEARCH RESPONSE', response)

                  const searchResponse = response.response.objects[0]
                  const dataSource = (searchResponse && searchResponse.communityViewDtos) || []

                  this.setState({
                    ...this.state,
                    dataSource: dataSource.map(model => ({
                      ...model,
                      key: model.profileId,
                      distanceToDisplay: this.profileDataService.getDistanceToDisplaySync(
                        model.distance,
                        this.userMetrics)
                    })),
                    searchResponse,
                    sessionId
                  })
                })
  }

  onRefresh = () => {
    this.setState({
      ...this.state,
      refreshing: true
    })

    if (this.listReference) {
      this.listReference.scrollToOffset({
        offset: 0,
        animated: true
      })
    }

    this.getCommunityViews()
        .then(() => {
          this.setState({
              ...this.state,
              refreshing: false
            }
          )
        })
  }

  navigateToSearch = () => {
    this.props.navigation.navigate(routeConfig.search.name, {restrictionMap: this.state.restrictionMap})
  }

  onItemClick = (profile) => {
    this.props.navigation.navigate(routeConfig.profileView.name, {profile})
  }

  renderRow = (data) => {
    return <CommunityGridItem
      onItemClick={() => this.onItemClick(data)}
      model={data}
      sessionId={this.state.sessionId}
      key={data.profileId}
      profileType={this.state.profile.profileType.code}
    />
  }

  render() {
    const ds = this.state.dataSource
    const searchResponse = this.state.searchResponse

    const showFooter = ds && (ds.length >= 120)
    const showHeader = ds && (ds.length < 120) && (searchResponse.total > 120)
    const showEmptyHeader = ds && !ds.length

    const footer = showFooter && <CommunityFooter onRefresh={this.onRefresh}/>
    const header = showHeader &&
      <CommunityHeaderAdjust resultCount={ds.length} onAdjustPressed={this.navigateToSearch}/>

    const emptyHeader = showEmptyHeader && <CommunityHeaderEmpty onAdjustPressed={this.navigateToSearch}/>
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.bannerContainer}>
          <AdBannerCommunityHorizontal/>
        </View>
        <GridView
          onRefresh={this.onRefresh}
          getListReference={ref => this.listReference = ref}
          refreshing={this.state.refreshing}
          columnCount={3}
          columnSpacing={1}
          dataSource={ds}
          renderRow={(data) => this.renderRow(data)}
          footer={footer}
          header={(this.props.navigation.state.params || {}).restrictionMap ? (emptyHeader || header) : null}
        />

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <ProfileSwitcher navigation={this.props.navigation}/>

                <ActionListButton navigation={this.props.navigation}/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  listView: {
    flex: 1
  }
})
