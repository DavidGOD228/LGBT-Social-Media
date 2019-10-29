import React from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import i18n from '../locales/i18n'
import BaseScreenDefault from './base/base-scene'
import ActionListButton from '../components/action-list-button'
import ProfileSwitcher from '../components/profile-switcher'
import UiBlockBottomPanel from '../components/ui/block/bottom-panel'
import DefaultHeader from '../components/global/default-header'
import UiBlockSpace from '../components/ui/block/space'
import TextLight from '../components/global/text/basic/text-light'
import LineFullWidth from '../components/global/line-full-width'
import UiBlockLeft from '../components/ui/block/left'
import StatsValue from '../components/stats/value'
import StatsValueDescription from '../components/stats/value-description'
import StatsSection from '../components/stats/section'
import {ProfileService} from '../services/profile'
import {lazy} from '../annotations/inversify'

interface State {
  profile7DaysViews: number,
  profileTotalViews: number,
  flexes7Days: number,
  flexesTotal: number,
  photosTotalViews: number,
  messagesTotalSent: number,
  messagesTotalReceived: number
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class StatsScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  @lazy('ProfileService')
  private profileService: ProfileService

  constructor(props) {
    super(props)

    this.state = {
      profile7DaysViews: 0,
      profileTotalViews: 0,
      flexes7Days: 0,
      flexesTotal: 0,
      photosTotalViews: 0,
      messagesTotalSent: 0,
      messagesTotalReceived: 0
    }

    this.profileService.getStatistics()
        .then(stats => this.setState({
          profile7DaysViews: stats.profileVisits ? stats.profileVisits : 0,
          profileTotalViews: stats.totalProfileVisits ? stats.totalProfileVisits : 0,
          flexes7Days: stats.flexes ? stats.flexes : 0,
          flexesTotal: stats.totalFlexes ? stats.totalFlexes : 0,
          photosTotalViews: stats.totalPhotoViews ? stats.totalPhotoViews : 0,
          messagesTotalSent: stats.totalSentMessages ? stats.totalSentMessages : 0,
          messagesTotalReceived: stats.totalReceivedMessages ? stats.totalReceivedMessages : 0
        }))
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <ScrollView style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>{i18n.t('stats.screenTitle')}</TextLight>
          <UiBlockSpace height={8}/>
          <LineFullWidth style={styles.titleBottomBorder}/>

          <StatsSection title={i18n.t('stats.sections.profile.sectionTitle')}>
            <UiBlockLeft>
              <StatsValue styles={styles.valueLight}>{this.state.profile7DaysViews}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.profile.last7Days')}</StatsValueDescription>
            </UiBlockLeft>
            <UiBlockSpace height={3}/>
            <UiBlockLeft>
              <StatsValue styles={styles.valueDark}>{this.state.profileTotalViews}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.profile.total')}</StatsValueDescription>
            </UiBlockLeft>
          </StatsSection>

          <StatsSection title={i18n.t('stats.sections.flexes.sectionTitle')}>
            <UiBlockLeft>
              <StatsValue styles={styles.valueLight}>{this.state.flexes7Days}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.flexes.last7Days')}</StatsValueDescription>
            </UiBlockLeft>
            <UiBlockSpace height={3}/>
            <UiBlockLeft>
              <StatsValue styles={styles.valueDark}>{this.state.flexesTotal}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.flexes.total')}</StatsValueDescription>
            </UiBlockLeft>
          </StatsSection>

          <StatsSection title={i18n.t('stats.sections.photos.sectionTitle')}>
            <UiBlockLeft>
              <StatsValue styles={styles.valueDark}>{this.state.photosTotalViews}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.photos.total')}</StatsValueDescription>
            </UiBlockLeft>
          </StatsSection>

          <StatsSection title={i18n.t('stats.sections.chats.sectionTitle')}>
            <UiBlockLeft>
              <StatsValue styles={styles.valueDark}>{this.state.messagesTotalSent}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.chats.messagesSent')}</StatsValueDescription>
            </UiBlockLeft>
            <UiBlockSpace height={3}/>
            <UiBlockLeft>
              <StatsValue styles={styles.valueDark}>{this.state.messagesTotalReceived}</StatsValue>
              <StatsValueDescription>{i18n.t('stats.sections.chats.messagesReceived')}</StatsValueDescription>
            </UiBlockLeft>
          </StatsSection>
        </ScrollView>

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
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 24
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18
  },
  valueContainer: {
    width: 70,
    paddingRight: 10
  },
  valueLight: {
    color: '#5A96CD'
  },
  valueDark: {
    color: '#286294'
  }
})
