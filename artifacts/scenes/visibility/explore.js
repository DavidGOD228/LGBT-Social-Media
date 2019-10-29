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
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import i18n from '../../locales/i18n';
import CollapsingSection from '../../components/collapsing-section';
import ModalWindow from '../../components/modal/modal-window';
import UiBlockSpace from '../../components/ui/block/space';
import ModalCloseBtn from '../../components/modal/modal-close-btn';
import ModalWindowContent from '../../components/modal/modal-window-content';
import ModalWindowTitle from '../../components/modal/modal-window-title';
import ModalWindowText from '../../components/modal/modal-window-text';
import { lazy } from '../../annotations/inversify';
import { LocalSettingsService } from '../../services/local-settings';
import MapView from 'react-native-maps';
import LineFullWidth from '../../components/global/line-full-width';
import SettingsRadioButton from '../../components/settings/radio-button';
import TextNormal from '../../components/global/text/basic/text-normal';
import { AccountService } from '../../services/account';
import UiBlockHorizontalCenter from '../../components/ui/block/horizontal-center';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class ExploreSection extends Component {
    constructor(props) {
        super(props);
        this.toggleInfoModal = () => {
            this.setState(Object.assign({}, this.state, { showInfoModal: !this.state.showInfoModal }));
        };
        this.toggleExploreEnabled = (enabled) => {
            this.setState(Object.assign({}, this.state, { on: enabled }));
            this.localSettingsService.setExploreEnabled(enabled);
            this.accountService.reportCurrentPosition(true);
        };
        this.regionChanged = (region) => {
            this.setState(Object.assign({}, this.state, { region }));
        };
        this.markerDragEnd = (e) => {
            this.setState(Object.assign({}, this.state, { marker: e.nativeEvent.coordinate }));
            this.updateExploreLocation(e.nativeEvent.coordinate);
        };
        this.updateExploreLocation = (coords) => __awaiter(this, void 0, void 0, function* () {
            yield this.localSettingsService.setExploreLocation(coords);
            this.accountService.reportCurrentPosition(true);
        });
        this.initExploreEnabled = () => __awaiter(this, void 0, void 0, function* () {
            const enabled = yield this.localSettingsService.getExploreEnabled();
            this.setState(Object.assign({}, this.state, { on: enabled }));
        });
        this.drawMap = () => __awaiter(this, void 0, void 0, function* () {
            const trueLocation = yield this.getTrueLocation();
            this.trueLocation = trueLocation;
            const exploreLocation = yield this.localSettingsService.getExploreLocation();
            this.setRegion(exploreLocation || trueLocation);
            this.setMarkerPosition(trueLocation, exploreLocation);
            if (Platform.OS === 'ios') {
                this.map.animateToRegion(this.state.region, 600);
            }
        });
        this.setMarkerPosition = (trueLocation, exploreLocation) => {
            if (!trueLocation) {
                return;
            }
            const location = exploreLocation ? exploreLocation : trueLocation;
            this.setState(Object.assign({}, this.state, { marker: {
                    latitude: location.latitude,
                    longitude: location.longitude
                } }));
        };
        this.getTrueLocation = () => __awaiter(this, void 0, void 0, function* () {
            const locationString = yield this.localSettingsService.getValue('LOCATION');
            if (!!locationString) {
                return JSON.parse(locationString);
            }
            return null;
        });
        this.setRegion = (trueLocation) => {
            if (!trueLocation) {
                return;
            }
            this.setState(Object.assign({}, this.state, { region: {
                    latitude: trueLocation.latitude,
                    longitude: trueLocation.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                } }));
        };
        this.state = {
            showInfoModal: false,
            on: false
        };
        this.drawMap();
        this.initExploreEnabled();
    }
    render() {
        return React.createElement(View, { style: { flex: 1 } },
            React.createElement(CollapsingSection, { title: i18n.t('visibility.explore.sectionTitle'), completed: false, showChildren: true, infoPressed: this.toggleInfoModal },
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(SettingsRadioButton, { value: this.state.on, onChange: this.toggleExploreEnabled },
                    React.createElement(TextNormal, null, i18n.t('visibility.explore.offOn'))),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(View, { style: {
                        width: Platform.OS === 'android' ? width : width - 50,
                        height: Platform.OS === 'android' ? width * 0.8 : width - 50
                    } }, this.state.region && (React.createElement(MapView, { ref: component => this.map = component, style: styles.map, region: this.state.region, onRegionChange: this.regionChanged, onPress: this.markerDragEnd }, this.state.marker ? (React.createElement(MapView.Marker, { draggable: true, coordinate: this.state.marker, onDragEnd: this.markerDragEnd })) : null))),
                React.createElement(UiBlockSpace, { height: 5 }),
                React.createElement(UiBlockHorizontalCenter, null,
                    React.createElement(TextNormal, null, i18n.t('visibility.explore.mapTitle'))),
                React.createElement(UiBlockSpace, { height: 5 })),
            React.createElement(ModalWindow, { visible: this.state.showInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.toggleInfoModal }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, "EXPLORE"),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, 'To explore other areas, turn on the function and then use the map ' +
                        'to find the area you want to see. You will see the users there, ' +
                        'but will not appear in their searches or community view.'),
                    React.createElement(UiBlockSpace, { height: 30 }))));
    }
}
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], ExploreSection.prototype, "localSettingsService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], ExploreSection.prototype, "accountService", void 0);
const styles = StyleSheet.create({
    infoIcon: {
        position: 'absolute',
        top: -7,
        right: -30
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    map: Object.assign({}, StyleSheet.absoluteFillObject)
});
//# sourceMappingURL=explore.js.map