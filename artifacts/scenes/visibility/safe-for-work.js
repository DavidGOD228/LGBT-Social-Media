var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { DatePickerIOS, Dimensions, Platform, StyleSheet, TimePickerAndroid, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import Time from '../../models/time';
import UiBlockSpace from '../../components/ui/block/space';
import CollapsingSection from '../../components/collapsing-section';
import LineFullWidth from '../../components/global/line-full-width';
import i18n from '../../locales/i18n';
import SettingsRadioButton from '../../components/settings/radio-button';
import TextNormal from '../../components/global/text/basic/text-normal';
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges';
import UiBlockBasic from '../../components/ui/block/basic';
import UiBlockHorizontalCenter from '../../components/ui/block/horizontal-center';
import PopupHeader from '../../components/global/popup/header';
import PopupTwoButtonsContainer from '../../components/global/popup/two-buttons-container';
import PopupButton from '../../components/global/popup/button';
import ModalCloseBtn from '../../components/modal/modal-close-btn';
import ModalWindowTitle from '../../components/modal/modal-window-title';
import ModalWindowContent from '../../components/modal/modal-window-content';
import ModalWindowText from '../../components/modal/modal-window-text';
import ModalWindow from '../../components/modal/modal-window';
import SafeForWork from '../../utils/safe-for-work';
import { LocalSettingsService } from '../../services/local-settings';
import { AccountService } from '../../services/account';
import { lazy } from '../../annotations/inversify';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CIRCLE_RADIUS = 8000;
const CIRCLE_COLOR = 'rgba(77,146,223,0.40)';
class SafeForWorkSection extends Component {
    constructor(props) {
        super(props);
        this.renderPopupContent = () => {
            return React.createElement(View, null,
                React.createElement(PopupHeader, null,
                    "Set ",
                    this.state.safeForWork.timeType,
                    " time"),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(DatePickerIOS, { date: this.state.safeForWork.timeTmp.getDateObject(), mode: 'time', onDateChange: this.safeForWorkTimeIosDateChanged }),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: this.safeForWorkTimeIosPopupCancelPressed }, i18n.t('common.buttons.cancel')),
                    React.createElement(PopupButton, { onPress: this.safeForWorkTimePopupSavePressed }, i18n.t('common.buttons.save'))),
                React.createElement(UiBlockSpace, { height: 15 }));
        };
        this.regionChanged = (region) => {
            this.state.safeForWork.region = region;
            this.setState(Object.assign({}, this.state));
        };
        this.markerDragEnd = (e) => {
            const trueLocation = this.trueLocation;
            const markerPoint = e.nativeEvent.coordinate;
            const edgePoint = this.getEdgePoint(trueLocation, markerPoint);
            if (!edgePoint) {
                return;
            }
            const coords = trueLocation ? edgePoint : markerPoint;
            console.log('ORIGIN', {
                latitude: trueLocation.latitude,
                longitude: trueLocation.longitude
            });
            console.log('MARKER', markerPoint);
            console.log('NEW COORDS', coords);
            this.state.safeForWork.marker = coords;
            this.setState(Object.assign({}, this.state));
            this.updateSfwLocation(coords);
        };
        this.safeForWorkOnOffChanged = (val) => {
            this.state.safeForWork.on = val;
            this.setState(Object.assign({}, this.state));
            this.updateSafeForWorkTurnedOn(val);
        };
        this.safeForWorkTimeStartPressed = () => {
            this.showSafeForWorkTimeSelector('start');
        };
        this.safeForWorkTimeEndPressed = () => {
            this.showSafeForWorkTimeSelector('end');
        };
        this.safeForWorkTimeIosDateChanged = (date) => {
            this.state.safeForWork.timeTmp.setHours(date.getHours());
            this.state.safeForWork.timeTmp.setMinutes(date.getMinutes());
            this.props.updateUi();
        };
        // should refactor these 2 methods below.
        this.safeForWorkTimeIosPopupCancelPressed = () => {
            this.props.toggleIosSelector(false);
        };
        this.safeForWorkTimePopupSavePressed = () => {
            this.props.toggleIosSelector(false);
            this.saveSafeForWorkTime();
        };
        this.onSafeForWorkInfoPressed = () => {
            this.setState(Object.assign({}, this.state, { showInfoModal: true }));
        };
        this.modalInfoClosePressed = () => {
            this.setState(Object.assign({}, this.state, { showInfoModal: false }));
        };
        this.drawMap = () => __awaiter(this, void 0, void 0, function* () {
            const trueLocation = yield this.getTrueLocation();
            this.trueLocation = trueLocation;
            const sfwLocation = yield this.getSafeForWorkLocation();
            this.setRegion(trueLocation);
            this.setMarkerPosition(trueLocation, sfwLocation);
            if (Platform.OS === 'ios') {
                this.map.animateToRegion(this.state.safeForWork.region, 600);
            }
        });
        this.getEdgePoint = (centerPoint, markerPoint) => {
            if (!centerPoint) {
                return markerPoint;
            }
            const distance = this.distanceInMeters(centerPoint.latitude, centerPoint.longitude, markerPoint.latitude, markerPoint.longitude);
            const isAllowed = distance <= CIRCLE_RADIUS;
            console.log('DISTANCE', distance);
            if (isAllowed) {
                return markerPoint;
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
        };
        this.distanceInMeters = (lat1, lon1, lat2, lon2) => {
            const p = 0.017453292519943295; // Math.PI / 180
            const c = Math.cos;
            const a = 0.5 - c((lat2 - lat1) * p) / 2 +
                c(lat1 * p) * c(lat2 * p) *
                    (1 - c((lon2 - lon1) * p)) / 2;
            return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
        };
        this.initSafeForWorkTurnedOn = () => {
            this.localSettingsService.getSafeForWorkTurnedOn()
                .then(val => {
                this.state.safeForWork.on = val;
                this.setState(Object.assign({}, this.state));
            });
        };
        this.updateSafeForWorkTurnedOn = (val) => __awaiter(this, void 0, void 0, function* () {
            this.localSettingsService.updateSafeForWorkTurnedOn(val);
            const fakeLocation = yield this.localSettingsService.getSafeForWorkLocation();
            if (val && fakeLocation) {
                AccountService.geoLocationReport({
                    timestamp: new Date().valueOf(),
                    coords: Object.assign({}, fakeLocation, { accuracy: 20, altitude: 0, altitudeAccuracy: 20, heading: 0, speed: 0 })
                });
                return;
            }
            if (!val) {
                this.accountService.reportCurrentPosition(true);
            }
        });
        this.getTrueLocation = () => __awaiter(this, void 0, void 0, function* () {
            const locationString = yield this.localSettingsService.getValue('LOCATION');
            if (!!locationString) {
                return JSON.parse(locationString);
            }
            return null;
        });
        this.getSafeForWorkLocation = () => __awaiter(this, void 0, void 0, function* () {
            const location = yield this.localSettingsService.getSafeForWorkLocation();
            return location;
        });
        this.setRegion = (trueLocation) => {
            if (!trueLocation) {
                return;
            }
            this.state.safeForWork.region = {
                latitude: trueLocation.latitude,
                longitude: trueLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
            this.state.safeForWork.circle = {
                latitude: trueLocation.latitude,
                longitude: trueLocation.longitude
            };
            this.setState(Object.assign({}, this.state));
        };
        this.setMarkerPosition = (trueLocation, sfwLocation) => {
            if (!trueLocation) {
                return;
            }
            const location = sfwLocation ? sfwLocation : trueLocation;
            this.state.safeForWork.marker = {
                latitude: location.latitude,
                longitude: location.longitude
            };
            this.setState(Object.assign({}, this.state));
        };
        this.updateSfwLocation = (latLng) => __awaiter(this, void 0, void 0, function* () {
            yield this.localSettingsService.updateSafeForWorkLocation(latLng);
            if (yield SafeForWork.isFakeLocationEnabled()) {
                AccountService.geoLocationReport({
                    timestamp: new Date().valueOf(),
                    coords: Object.assign({}, latLng, { accuracy: 20, altitude: 0, altitudeAccuracy: 20, heading: 0, speed: 0 })
                });
            }
        });
        this.showSafeForWorkTimeSelector = (type) => {
            if (type === 'start') {
                this.state.safeForWork.timeTmp =
                    new Time(this.state.safeForWork.timeStart.getHours(), this.state.safeForWork.timeStart.getMinutes());
            }
            else {
                this.state.safeForWork.timeTmp =
                    new Time(this.state.safeForWork.timeEnd.getHours(), this.state.safeForWork.timeEnd.getMinutes());
            }
            this.state.safeForWork.timeType = type;
            this.setState(Object.assign({}, this.state));
            if (Platform.OS === 'ios') {
                this.showQuietHoursIosSelector();
            }
            if (Platform.OS === 'android') {
                this.showQuietHoursAndroidSelector();
            }
        };
        this.showQuietHoursIosSelector = () => {
            this.props.toggleIosSelector(true);
        };
        this.saveSafeForWorkTime = () => {
            if (this.state.safeForWork.timeType === 'start') {
                this.state.safeForWork.timeStart = this.state.safeForWork.timeTmp;
                this.localSettingsService.updateSafeForWorkTimeStart(JSON.stringify(this.state.safeForWork.timeStart));
            }
            else {
                this.state.safeForWork.timeEnd = this.state.safeForWork.timeTmp;
                this.localSettingsService.updateSafeForWorkTimeEnd(JSON.stringify(this.state.safeForWork.timeEnd));
            }
            this.setState(Object.assign({}, this.state));
        };
        this.state = Object.assign({}, this.state, { safeForWork: {
                on: false,
                timeTmp: new Time(9, 0),
                timeStart: new Time(9, 0),
                timeEnd: new Time(17, 0),
                timeType: 'start',
                timeShowIosSelector: false
            }, showInfoModal: false });
        this.drawMap();
        this.initSafeForWorkTurnedOn();
        this.initSafeForWorkTimeStart();
        this.initSafeForWorkTimeEnd();
    }
    render() {
        return React.createElement(View, { style: { flex: 1 } },
            React.createElement(CollapsingSection, { title: i18n.t('visibility.safeForWork.sectionTitle'), completed: false, showChildren: true, infoPressed: this.onSafeForWorkInfoPressed },
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(UiBlockBasic, null,
                    React.createElement(SettingsRadioButton, { value: this.state.safeForWork.on, onChange: this.safeForWorkOnOffChanged },
                        React.createElement(TextNormal, null, i18n.t('visibility.safeForWork.offOn'))),
                    React.createElement(UiBlockSpace, { height: 20 }),
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(UiBlockBasic, null,
                            React.createElement(TouchableOpacity, { onPress: this.safeForWorkTimeStartPressed },
                                React.createElement(TextNormal, null, "Begin"),
                                React.createElement(UiBlockSpace, { height: 10 }),
                                React.createElement(TextNormal, { style: styles.timeValue }, this.state.safeForWork.timeStart.getTimeToDisplay()))),
                        React.createElement(UiBlockBasic, { style: { alignItems: 'flex-end' } },
                            React.createElement(TouchableOpacity, { onPress: this.safeForWorkTimeEndPressed },
                                React.createElement(TextNormal, null, "End"),
                                React.createElement(UiBlockSpace, { height: 10 }),
                                React.createElement(TextNormal, { style: styles.timeValue }, this.state.safeForWork.timeEnd.getTimeToDisplay())))),
                    React.createElement(UiBlockSpace, { height: 20 }),
                    React.createElement(UiBlockHorizontalCenter, null,
                        React.createElement(TextNormal, null, i18n.t('visibility.safeForWork.mapTitle'))),
                    React.createElement(UiBlockSpace, { height: 10 }),
                    React.createElement(View, { style: {
                            width: Platform.OS === 'android' ? width : width - 50,
                            height: Platform.OS === 'android' ? width * ASPECT_RATIO : (width - 50) * ASPECT_RATIO
                        } }, this.state.safeForWork.region && (React.createElement(MapView, { ref: component => this.map = component, style: styles.map, region: this.state.safeForWork.region, onRegionChange: this.regionChanged, onPress: this.markerDragEnd },
                        this.state.safeForWork.circle && (React.createElement(MapView.Circle, { center: this.state.safeForWork.circle, radius: CIRCLE_RADIUS, strokeColor: CIRCLE_COLOR, fillColor: CIRCLE_COLOR, zIndex: 10 })),
                        this.state.safeForWork.marker ? (React.createElement(MapView.Marker, { draggable: true, coordinate: this.state.safeForWork.marker, onDragEnd: this.markerDragEnd })) : null))))),
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(ModalWindow, { visible: this.state.showInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.modalInfoClosePressed }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, "SAFE FOR WORK"),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, 'When you turn on ”Safe For Work” your profile will appear online but your location will be ' +
                        'displaced in the area indicated on the map. You may also set your work hours so that outside ' +
                        'your office hours, your location  is correct. '),
                    React.createElement(UiBlockSpace, { height: 30 }))));
    }
    initSafeForWorkTimeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.localSettingsService.getSafeForWorkTimeStart();
            if (!value) {
                value = JSON.stringify(this.state.safeForWork.timeStart);
                this.localSettingsService.updateSafeForWorkTimeStart(value);
            }
            const time = JSON.parse(value);
            this.state.safeForWork.timeStart.setHours(time.hours);
            this.state.safeForWork.timeStart.setMinutes(time.minutes);
            this.setState(this.state);
        });
    }
    initSafeForWorkTimeEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.localSettingsService.getSafeForWorkTimeEnd();
            if (!value) {
                value = JSON.stringify(this.state.safeForWork.timeEnd);
                this.localSettingsService.updateSafeForWorkTimeEnd(value);
            }
            const time = JSON.parse(value);
            this.state.safeForWork.timeEnd.setHours(time.hours);
            this.state.safeForWork.timeEnd.setMinutes(time.minutes);
            this.setState(this.state);
        });
    }
    showQuietHoursAndroidSelector() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { action, hour, minute } = yield TimePickerAndroid.open({
                    hour: this.state.safeForWork.timeTmp.getHours(),
                    minute: this.state.safeForWork.timeTmp.getMinutes(),
                    is24Hour: false
                });
                if (action !== TimePickerAndroid.dismissedAction) {
                    this.state.safeForWork.timeTmp.setHours(hour);
                    this.state.safeForWork.timeTmp.setMinutes(minute);
                    this.saveSafeForWorkTime();
                }
            }
            catch ({ code, message }) {
                console.warn('Cannot open time picker', message);
            }
        });
    }
}
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], SafeForWorkSection.prototype, "localSettingsService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], SafeForWorkSection.prototype, "accountService", void 0);
export default SafeForWorkSection;
const styles = StyleSheet.create({
    timeValue: {
        fontSize: 26
    },
    map: Object.assign({}, StyleSheet.absoluteFillObject),
    titleBottomBorder: {
        backgroundColor: '#979797'
    }
});
//# sourceMappingURL=safe-for-work.js.map