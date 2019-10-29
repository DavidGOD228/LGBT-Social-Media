import React, {Component} from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  View
} from 'react-native'
import i18n from '../../locales/i18n'
import CollapsingSection from '../../components/collapsing-section'
import ModalWindow from '../../components/modal/modal-window'
import UiBlockSpace from '../../components/ui/block/space'
import ModalCloseBtn from '../../components/modal/modal-close-btn'
import ModalWindowContent from '../../components/modal/modal-window-content'
import ModalWindowTitle from '../../components/modal/modal-window-title'
import ModalWindowText from '../../components/modal/modal-window-text'
import {lazy} from '../../annotations/inversify'
import {LocalSettingsService} from '../../services/local-settings'
import MapView from 'react-native-maps'
import LineFullWidth from '../../components/global/line-full-width'
import SettingsRadioButton from '../../components/settings/radio-button'
import TextNormal from '../../components/global/text/basic/text-normal'
import {AccountService} from '../../services/account'
import UiBlockHorizontalCenter from '../../components/ui/block/horizontal-center'

interface Region {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

interface LatLng {
  latitude: number
  longitude: number
}

interface State {
  showInfoModal: boolean
  region?: Region
  marker?: LatLng
  on: boolean
}

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class ExploreSection extends Component<{}, State> {

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  @lazy('AccountService')
  private accountService: AccountService

  private map: MapView
  private trueLocation: any

  constructor(props) {
    super(props)
    this.state = {
      showInfoModal: false,
      on: false
    }
    this.drawMap()
    this.initExploreEnabled()
  }

  render() {
    return <View style={{flex: 1}}>
      <CollapsingSection
        title={i18n.t('visibility.explore.sectionTitle')}
        completed={false}
        showChildren={true}
        infoPressed={this.toggleInfoModal}>
        <UiBlockSpace height={10}/>
        <LineFullWidth style={styles.titleBottomBorder}/>
        <UiBlockSpace height={10}/>
        <SettingsRadioButton value={this.state.on} onChange={this.toggleExploreEnabled}>
          <TextNormal>
            {i18n.t('visibility.explore.offOn')}
          </TextNormal>
        </SettingsRadioButton>

        <UiBlockSpace height={20}/>
        <View style={{
          width: Platform.OS === 'android' ? width : width - 50,
          height: Platform.OS === 'android' ? width * 0.8 : width - 50
        }}>
          {this.state.region && (
            <MapView
              ref={component => this.map = component}
              style={styles.map}
              region={this.state.region}
              onRegionChange={this.regionChanged}
              onPress={this.markerDragEnd}
            >

              {this.state.marker ? (
                <MapView.Marker
                  draggable
                  coordinate={this.state.marker}
                  onDragEnd={this.markerDragEnd}
                />
              ) : null}

            </MapView>
          )}
        </View>
        <UiBlockSpace height={5}/>
        <UiBlockHorizontalCenter>
          <TextNormal>{i18n.t('visibility.explore.mapTitle')}</TextNormal>
        </UiBlockHorizontalCenter>
        <UiBlockSpace height={5}/>
      </CollapsingSection>

      <ModalWindow visible={this.state.showInfoModal}>
        <UiBlockSpace height={30}/>
        <ModalCloseBtn onPress={this.toggleInfoModal}/>
        <UiBlockSpace height={80}/>
        <ModalWindowContent>
          <ModalWindowTitle>
            EXPLORE
          </ModalWindowTitle>
          <UiBlockSpace/>
          <ModalWindowText>
            {'To explore other areas, turn on the function and then use the map ' +
            'to find the area you want to see. You will see the users there, ' +
            'but will not appear in their searches or community view.'}
          </ModalWindowText>
          <UiBlockSpace height={30}/>
        </ModalWindowContent>
      </ModalWindow>

    </View>
  }

  private toggleInfoModal = () => {
    this.setState({
      ...this.state,
      showInfoModal: !this.state.showInfoModal
    })
  }

  private toggleExploreEnabled = (enabled: boolean) => {
    this.setState({
      ...this.state,
      on: enabled
    })
    this.localSettingsService.setExploreEnabled(enabled)
    this.accountService.reportCurrentPosition(true)
  }

  private regionChanged = (region) => {
    this.setState({
      ...this.state,
      region
    })
  }

  private markerDragEnd = (e) => {
    this.setState({
      ...this.state,
      marker: e.nativeEvent.coordinate
    })
    this.updateExploreLocation(e.nativeEvent.coordinate)
  }

  private updateExploreLocation = async (coords) => {
    await this.localSettingsService.setExploreLocation(coords)
    this.accountService.reportCurrentPosition(true)
  }

  private initExploreEnabled = async () => {
    const enabled = await this.localSettingsService.getExploreEnabled()
    this.setState({
      ...this.state,
      on: enabled
    })
  }

  private drawMap = async () => {
    const trueLocation = await this.getTrueLocation()
    this.trueLocation = trueLocation

    const exploreLocation = await this.localSettingsService.getExploreLocation()

    this.setRegion(exploreLocation || trueLocation)
    this.setMarkerPosition(trueLocation, exploreLocation)
    if (Platform.OS === 'ios') {
      this.map.animateToRegion(this.state.region, 600)
    }
  }

  private setMarkerPosition = (trueLocation, exploreLocation) => {
    if (!trueLocation) {
      return
    }
    const location = exploreLocation ? exploreLocation : trueLocation
    this.setState({
      ...this.state,
      marker: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    })
  }

  private getTrueLocation = async () => {
    const locationString = await this.localSettingsService.getValue('LOCATION')
    if (!!locationString) {
      return JSON.parse(locationString)
    }
    return null
  }

  private setRegion = (trueLocation: any) => {
    if (!trueLocation) {
      return
    }

    this.setState({
      ...this.state,
      region: {
        latitude: trueLocation.latitude,
        longitude: trueLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
  }

}

const styles = StyleSheet.create({
  infoIcon: {
    position: 'absolute',
    top: -7,
    right: -30
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
