import React, {Component} from 'react'
import {
  DatePickerIOS,
  Dimensions,
  Platform,
  StyleSheet,
  TimePickerAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import MapView from 'react-native-maps'
import Time from '../../models/time'
import UiBlockSpace from '../../components/ui/block/space'
import CollapsingSection from '../../components/collapsing-section'
import LineFullWidth from '../../components/global/line-full-width'
import i18n from '../../locales/i18n'
import SettingsRadioButton from '../../components/settings/radio-button'
import TextNormal from '../../components/global/text/basic/text-normal'
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges'
import UiBlockBasic from '../../components/ui/block/basic'
import UiBlockHorizontalCenter from '../../components/ui/block/horizontal-center'
import PopupHeader from '../../components/global/popup/header'
import PopupTwoButtonsContainer from '../../components/global/popup/two-buttons-container'
import PopupButton from '../../components/global/popup/button'
import ModalCloseBtn from '../../components/modal/modal-close-btn'
import ModalWindowTitle from '../../components/modal/modal-window-title'
import ModalWindowContent from '../../components/modal/modal-window-content'
import ModalWindowText from '../../components/modal/modal-window-text'
import ModalWindow from '../../components/modal/modal-window'
import SafeForWork from '../../utils/safe-for-work'
import {LocalSettingsService} from '../../services/local-settings'
import {AccountService} from '../../services/account'
import {lazy} from '../../annotations/inversify'

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
  safeForWork: {
    on: boolean
    timeTmp: Time
    timeStart: Time
    timeEnd: Time
    timeType: string
    timeShowIosSelector: boolean
    region?: Region
    marker?: LatLng
    circle?: LatLng
  }
  showInfoModal: boolean
}

interface Props {
  toggleIosSelector: (enabled: boolean) => void
  updateUi: () => void
}

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const CIRCLE_RADIUS = 8000
const CIRCLE_COLOR = 'rgba(77,146,223,0.40)'

class SafeForWorkSection extends Component<Props, State> {

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService
  private map: MapView

  @lazy('AccountService')
  private accountService: AccountService

  private trueLocation: any

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      safeForWork: {
        on: false,
        timeTmp: new Time(9, 0),
        timeStart: new Time(9, 0),
        timeEnd: new Time(17, 0),
        timeType: 'start',
        timeShowIosSelector: false
      },
      showInfoModal: false
    }

    this.drawMap()

    this.initSafeForWorkTurnedOn()

    this.initSafeForWorkTimeStart()
    this.initSafeForWorkTimeEnd()
  }

  renderPopupContent = () => {
    return <View>
      <PopupHeader>Set {this.state.safeForWork.timeType} time</PopupHeader>
      <UiBlockSpace height={15}/>
      <DatePickerIOS
        date={this.state.safeForWork.timeTmp.getDateObject()}
        mode='time'
        onDateChange={this.safeForWorkTimeIosDateChanged}/>
      <UiBlockSpace height={15}/>
      <PopupTwoButtonsContainer>
        <PopupButton onPress={this.safeForWorkTimeIosPopupCancelPressed}>
          {i18n.t('common.buttons.cancel')}
        </PopupButton>
        <PopupButton onPress={this.safeForWorkTimePopupSavePressed}>
          {i18n.t('common.buttons.save')}
        </PopupButton>
      </PopupTwoButtonsContainer>
      <UiBlockSpace height={15}/>
    </View>
  }

  regionChanged = (region) => {
    this.state.safeForWork.region = region
    this.setState({
      ...this.state
    })
  }

  markerDragEnd = (e) => {
    const trueLocation = this.trueLocation
    const markerPoint = e.nativeEvent.coordinate
    const edgePoint = this.getEdgePoint(trueLocation, markerPoint)

    if (!edgePoint) {
      return
    }

    const coords = trueLocation ? edgePoint : markerPoint

    console.log('ORIGIN', {
      latitude: trueLocation.latitude,
      longitude: trueLocation.longitude
    })
    console.log('MARKER', markerPoint)

    console.log('NEW COORDS', coords)
    this.state.safeForWork.marker = coords
    this.setState({
      ...this.state
    })
    this.updateSfwLocation(coords)
  }

  safeForWorkOnOffChanged = (val: boolean) => {
    this.state.safeForWork.on = val
    this.setState({
      ...this.state
    })
    this.updateSafeForWorkTurnedOn(val)
  }

  safeForWorkTimeStartPressed = () => {
    this.showSafeForWorkTimeSelector('start')
  }

  safeForWorkTimeEndPressed = () => {
    this.showSafeForWorkTimeSelector('end')
  }

  safeForWorkTimeIosDateChanged = (date: Date) => {
    this.state.safeForWork.timeTmp.setHours(date.getHours())
    this.state.safeForWork.timeTmp.setMinutes(date.getMinutes())
    this.props.updateUi()
  }

  // should refactor these 2 methods below.

  safeForWorkTimeIosPopupCancelPressed = () => {
    this.props.toggleIosSelector(false)
  }

  safeForWorkTimePopupSavePressed = () => {
    this.props.toggleIosSelector(false)
    this.saveSafeForWorkTime()
  }

  onSafeForWorkInfoPressed = () => {
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
    return <View style={{flex: 1}}>
      <CollapsingSection
        title={i18n.t('visibility.safeForWork.sectionTitle')}
        completed={false}
        showChildren={true}
        infoPressed={this.onSafeForWorkInfoPressed}>
        <UiBlockSpace height={10}/>
        <LineFullWidth style={styles.titleBottomBorder}/>
        <UiBlockSpace height={10}/>
        <UiBlockBasic>

          <SettingsRadioButton value={this.state.safeForWork.on} onChange={this.safeForWorkOnOffChanged}>
            <TextNormal>
              {i18n.t('visibility.safeForWork.offOn')}
            </TextNormal>
          </SettingsRadioButton>

          <UiBlockSpace height={20}/>

          <UiBlockHorizontalEdges>
            <UiBlockBasic>
              <TouchableOpacity onPress={this.safeForWorkTimeStartPressed}>
                <TextNormal>Begin</TextNormal>
                <UiBlockSpace height={10}/>
                <TextNormal style={styles.timeValue}>
                  {this.state.safeForWork.timeStart.getTimeToDisplay()}
                </TextNormal>
              </TouchableOpacity>
            </UiBlockBasic>

            <UiBlockBasic style={{alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={this.safeForWorkTimeEndPressed}>
                <TextNormal>End</TextNormal>
                <UiBlockSpace height={10}/>
                <TextNormal style={styles.timeValue}>
                  {this.state.safeForWork.timeEnd.getTimeToDisplay()}
                </TextNormal>
              </TouchableOpacity>
            </UiBlockBasic>
          </UiBlockHorizontalEdges>

          <UiBlockSpace height={20}/>

          <UiBlockHorizontalCenter>
            <TextNormal>{i18n.t('visibility.safeForWork.mapTitle')}</TextNormal>
          </UiBlockHorizontalCenter>
          <UiBlockSpace height={10}/>
          <View style={{
            width: Platform.OS === 'android' ? width : width - 50,
            height: Platform.OS === 'android' ? width * ASPECT_RATIO : (width - 50) * ASPECT_RATIO
          }}>
            {this.state.safeForWork.region && (
              <MapView
                ref={component => this.map = component}
                style={styles.map}
                region={this.state.safeForWork.region}
                onRegionChange={this.regionChanged}
                onPress={this.markerDragEnd}
              >
                {this.state.safeForWork.circle && (
                  <MapView.Circle
                    center={this.state.safeForWork.circle}
                    radius={CIRCLE_RADIUS}
                    strokeColor={CIRCLE_COLOR}
                    fillColor={CIRCLE_COLOR}
                    zIndex={10}
                  />
                )}

                {this.state.safeForWork.marker ? (
                  <MapView.Marker
                    draggable
                    coordinate={this.state.safeForWork.marker}
                    onDragEnd={this.markerDragEnd}
                  />
                ) : null}

              </MapView>
            )}
          </View>
        </UiBlockBasic>
      </CollapsingSection>
      <UiBlockSpace height={10}/>

      <ModalWindow visible={this.state.showInfoModal}>
        <UiBlockSpace height={30}/>
        <ModalCloseBtn onPress={this.modalInfoClosePressed}/>
        <UiBlockSpace height={80}/>
        <ModalWindowContent>
          <ModalWindowTitle>
            SAFE FOR WORK
          </ModalWindowTitle>
          <UiBlockSpace/>
          <ModalWindowText>
            {'When you turn on ”Safe For Work” your profile will appear online but your location will be ' +
            'displaced in the area indicated on the map. You may also set your work hours so that outside ' +
            'your office hours, your location  is correct. '}
          </ModalWindowText>
          <UiBlockSpace height={30}/>
        </ModalWindowContent>
      </ModalWindow>
    </View>
  }

  private drawMap = async () => {
    const trueLocation = await this.getTrueLocation()
    this.trueLocation = trueLocation

    const sfwLocation = await this.getSafeForWorkLocation()

    this.setRegion(trueLocation)
    this.setMarkerPosition(trueLocation, sfwLocation)
    if (Platform.OS === 'ios') {
      this.map.animateToRegion(this.state.safeForWork.region, 600)
    }
  }

  private async initSafeForWorkTimeStart() {
    let value = await this.localSettingsService.getSafeForWorkTimeStart()
    if (!value) {
      value = JSON.stringify(this.state.safeForWork.timeStart)
      this.localSettingsService.updateSafeForWorkTimeStart(value)
    }
    const time = JSON.parse(value)
    this.state.safeForWork.timeStart.setHours(time.hours)
    this.state.safeForWork.timeStart.setMinutes(time.minutes)
    this.setState(this.state)
  }

  private async initSafeForWorkTimeEnd() {
    let value = await this.localSettingsService.getSafeForWorkTimeEnd()
    if (!value) {
      value = JSON.stringify(this.state.safeForWork.timeEnd)
      this.localSettingsService.updateSafeForWorkTimeEnd(value)
    }
    const time = JSON.parse(value)
    this.state.safeForWork.timeEnd.setHours(time.hours)
    this.state.safeForWork.timeEnd.setMinutes(time.minutes)
    this.setState(this.state)
  }

  private getEdgePoint = (centerPoint, markerPoint) => {

    if (!centerPoint) {
      return markerPoint
    }

    const distance = this.distanceInMeters(
      centerPoint.latitude, centerPoint.longitude,
      markerPoint.latitude, markerPoint.longitude
    )
    const isAllowed = distance <= CIRCLE_RADIUS

    console.log('DISTANCE', distance)
    if (isAllowed) {
      return markerPoint
    }
    /*
     const dx = markerPoint.longitude - centerPoint.longitude
     const dy = markerPoint.latitude - centerPoint.latitude
     const dist = Math.sqrt(dx * dx + dy * dy)
     const newX = centerPoint.longitude + dx * (CIRCLE_RADIUS / 111000) / dist
     const newY = centerPoint.latitude + dy * (CIRCLE_RADIUS / 111000) / dist

     return {
     latitude: newY,
     longitude: newX
     }*/
  }

  private distanceInMeters = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295    // Math.PI / 180
    const c = Math.cos
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2

    return 12742 * Math.asin(Math.sqrt(a)) * 1000 // 2 * R; R = 6371 km
  }

  private initSafeForWorkTurnedOn = () => {
    this.localSettingsService.getSafeForWorkTurnedOn()
        .then(val => {
          this.state.safeForWork.on = val
          this.setState({
            ...this.state
          })
        })
  }

  private updateSafeForWorkTurnedOn = async (val: boolean) => {
    this.localSettingsService.updateSafeForWorkTurnedOn(val)

    const fakeLocation = await this.localSettingsService.getSafeForWorkLocation()

    if (val && fakeLocation) {
      AccountService.geoLocationReport({
        timestamp: new Date().valueOf(),
        coords: {
          ...fakeLocation,
          accuracy: 20,
          altitude: 0,
          altitudeAccuracy: 20,
          heading: 0,
          speed: 0
        }
      })
      return
    }

    if (!val) {
      this.accountService.reportCurrentPosition(true)
    }

  }

  private getTrueLocation = async () => {
    const locationString = await this.localSettingsService.getValue('LOCATION')
    if (!!locationString) {
      return JSON.parse(locationString)
    }
    return null
  }

  private getSafeForWorkLocation = async () => {
    const location = await this.localSettingsService.getSafeForWorkLocation()
    return location
  }

  private setRegion = (trueLocation: any) => {
    if (!trueLocation) {
      return
    }

    this.state.safeForWork.region = {
      latitude: trueLocation.latitude,
      longitude: trueLocation.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.state.safeForWork.circle = {
      latitude: trueLocation.latitude,
      longitude: trueLocation.longitude
    }
    this.setState({
      ...this.state
    })
  }

  private setMarkerPosition = (trueLocation, sfwLocation) => {
    if (!trueLocation) {
      return
    }
    const location = sfwLocation ? sfwLocation : trueLocation
    this.state.safeForWork.marker = {
      latitude: location.latitude,
      longitude: location.longitude
    }
    this.setState({
      ...this.state
    })
  }

  private updateSfwLocation = async (latLng: LatLng) => {
    await this.localSettingsService.updateSafeForWorkLocation(latLng)

    if (await SafeForWork.isFakeLocationEnabled()) {
      AccountService.geoLocationReport({
        timestamp: new Date().valueOf(),
        coords: {
          ...latLng,
          accuracy: 20,
          altitude: 0,
          altitudeAccuracy: 20,
          heading: 0,
          speed: 0
        }
      })
    }

  }

  private showSafeForWorkTimeSelector = (type: 'start' | 'end') => {
    if (type === 'start') {
      this.state.safeForWork.timeTmp =
        new Time(this.state.safeForWork.timeStart.getHours(), this.state.safeForWork.timeStart.getMinutes())
    } else {
      this.state.safeForWork.timeTmp =
        new Time(this.state.safeForWork.timeEnd.getHours(), this.state.safeForWork.timeEnd.getMinutes())
    }
    this.state.safeForWork.timeType = type

    this.setState({
      ...this.state
    })

    if (Platform.OS === 'ios') {
      this.showQuietHoursIosSelector()
    }
    if (Platform.OS === 'android') {
      this.showQuietHoursAndroidSelector()
    }
  }

  private showQuietHoursIosSelector = () => {
    this.props.toggleIosSelector(true)
  }

  private async showQuietHoursAndroidSelector() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.safeForWork.timeTmp.getHours(),
        minute: this.state.safeForWork.timeTmp.getMinutes(),
        is24Hour: false
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        this.state.safeForWork.timeTmp.setHours(hour)
        this.state.safeForWork.timeTmp.setMinutes(minute)
        this.saveSafeForWorkTime()
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message)
    }
  }

  private saveSafeForWorkTime = () => {
    if (this.state.safeForWork.timeType === 'start') {
      this.state.safeForWork.timeStart = this.state.safeForWork.timeTmp
      this.localSettingsService.updateSafeForWorkTimeStart(JSON.stringify(this.state.safeForWork.timeStart))
    } else {
      this.state.safeForWork.timeEnd = this.state.safeForWork.timeTmp
      this.localSettingsService.updateSafeForWorkTimeEnd(JSON.stringify(this.state.safeForWork.timeEnd))
    }
    this.setState({
      ...this.state
    })
  }

}

export default SafeForWorkSection

const styles = StyleSheet.create({
  timeValue: {
    fontSize: 26
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  }
})
