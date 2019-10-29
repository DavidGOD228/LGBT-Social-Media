import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white'
import i18n from '../locales/i18n'
import UiBlockBasic from '../components/ui/block/basic'
import TextLight from '../components/global/text/basic/text-light'
import DefaultHeader from '../components/global/default-header'
import BaseScreenDefault from './base/base-scene'
import UiBlockSpace from '../components/ui/block/space'
import SubmitButton from '../components/submit-button'
import ProfileModel from '../models/profile'
import {lazy} from '../annotations/inversify'
import {comparator} from '../utils/number'
import SectionComponent from './search/section'
import {ProfileService} from '../services/profile'
import routeConfig from '../router'

import {SearchSectionService} from '../services/search-section'
import SearchSectionModel from '../models/search/search-section'
import ActionListButton from '../components/action-list-button'
import HashTagInput from '../components/hash-tag-input/hash-tag-input'
import CollapsingSection from '../components/collapsing-section'
import ModalWindow from '../components/modal/modal-window'
import ModalCloseBtn from '../components/modal/modal-close-btn'
import ModalWindowContent from '../components/modal/modal-window-content'
import ModalWindowTitle from '../components/modal/modal-window-title'
import ModalWindowText from '../components/modal/modal-window-text'
import ModalLeftBtn from '../components/modal/modal-left-btn'
import {LocalSettingsService} from '../services/local-settings'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  profile: ProfileModel,
  sections: SearchSectionModel[],
  restrictionMap: any,
  hashTags: any[],
  showInfoModal: boolean,
  userMetrics: string
}

export default class SearchScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  @lazy('SearchSectionService')
  private searchSectionService: SearchSectionService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)

    const profile = this.profileService.getActive()!

    const params = this.props.navigation.state.params || {}
    const {
      restrictionMap = {},
      hashTags = []
    } = params

    this.state = {
      ...this.state,
      showInfoModal: false,
      restrictionMap,
      hashTags,
      profile
    }

    this.localSettingsService.getUserMetrics()
        .then(val => this.setSpecState('userMetrics', val))
    this.getSections(profile.profileType.code)
        .then(sections => this.setSpecState('sections', sections))

  }

  submitPressed = () => {
    this.submitSearch()
  }

  submitSearch() {
    this.props.navigation.navigate(routeConfig.community.name, {
      restrictionMap: this.state.restrictionMap,
      profile: this.state.profile,
      hashTags: this.state.hashTags
    })
  }

  hashTagsChanged = (tags) => {
    this.setState({
      ...this.state,
      hashTags: tags
    })
  }

  onSearchInfoPressed = () => {
    this.setState({
      ...this.state,
      showInfoModal: true
    })
  }

  modalInfoClosePressed = () => {
    this.setState({
      ...this.state,
      showInfoModal: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container}
                              behavior="position"
                              keyboardVerticalOffset={50}
                              contentContainerStyle={{flex: 1}}>
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            <StatusBar barStyle="light-content"/>
            <UiBlockBasic style={styles.content}>
              <UiBlockBasic>
                <UiBlockSpace height={20}/>
                <View style={styles.title}>
                  <TextLight style={{fontSize: 20}}>{'Search'}</TextLight>
                  <TouchableOpacity onPress={this.onSearchInfoPressed}>
                    <Image source={require('Musl/images/global/icon-btn-info.png')}/>
                  </TouchableOpacity>
                </View>
                <UiBlockSpace height={10}/>
              </UiBlockBasic>

              {/* section list */}
              {this.state.sections ? this.state.sections
                                         .sort(comparator)
                                         .map(section => <SectionComponent
                                           restrictionMap={this.state.restrictionMap}
                                           profile={this.state.profile}
                                           section={section}
                                           key={section.id}
                                           userMetrics={this.state.userMetrics}
                                         />) : null
              }

              <CollapsingSection
                title={'Search Hashtags'}
                completed={false}
              >
                <HashTagInput
                  tags={this.state.hashTags}
                  onTagsChanged={this.hashTagsChanged}
                />
              </CollapsingSection>

            </UiBlockBasic>
          </ScrollView>
          <SubmitButton onPress={this.submitPressed}/>
        </KeyboardAvoidingView>

        <ModalWindow visible={this.state.showInfoModal}>
          <UiBlockSpace height={30}/>
          <ModalCloseBtn onPress={this.modalInfoClosePressed}/>
          <UiBlockSpace height={80}/>
          <ModalWindowContent>
            <ModalWindowTitle>
              SEARCH
            </ModalWindowTitle>
            <UiBlockSpace/>
            <ModalWindowText>
              {'As with all searches, the more detail you add, the more narrow your results will be.\n\n' +
              'So keep that in mind as you craft your searches and don’t be too picky.'}
            </ModalWindowText>
            <UiBlockSpace height={30}/>
            <ModalLeftBtn onPress={this.modalInfoClosePressed}>
              Close
            </ModalLeftBtn>
          </ModalWindowContent>
        </ModalWindow>

        <BottomNavigationPanel>
          <UiBlockVerticalCenter>
            <UiBlockHorizontalEdges>
              <UiBlockVerticalCenter>
                <NavigationTextButtonWhite
                  onPress={this.backButton}>
                  {i18n.t('common.buttons.back')}
                </NavigationTextButtonWhite>
              </UiBlockVerticalCenter>
              <ActionListButton navigation={this.props.navigation}/>
            </UiBlockHorizontalEdges>
          </UiBlockVerticalCenter>
        </BottomNavigationPanel>
      </View>
    )
  }

  private backButton = () => {
    this.props.navigation.goBack()
  }

  private getSections = (profileTypeCode: string) => {
    return this.searchSectionService.getAllByProfileTypeCode(profileTypeCode)
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  content: {
    paddingLeft: 25,
    paddingRight: 25
  }
})
