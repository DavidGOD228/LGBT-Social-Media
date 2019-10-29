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
import { AppState, View } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import routeConfig from './router';
import { LocalSettingsService } from './services/local-settings';
import { lazy } from './annotations/inversify';
import PopupSlideBottom from './components/global/popup/popup-slide-bottom';
import PopupHeader from './components/global/popup/header';
import UiBlockSpace from './components/ui/block/space';
import PopupContent from './components/global/popup/content';
import PopupTwoButtonsContainer from './components/global/popup/two-buttons-container';
import PopupButton from './components/global/popup/button';
import TextNormal from './components/global/text/basic/text-normal';
import TextBold from './components/global/text/basic/text-bold';
import eventEmitter from './utils/event-emitter';
import { EVENTS } from './configs/dicts';
import firebase from './utils/firebase';
import { AccountService } from './services/account';
const stackNavigatorConfig = {
    mode: 'card',
    headerMode: 'screen',
    initialRouteName: 'home'
};
const Stack = StackNavigator(routeConfig, stackNavigatorConfig);
export default class ContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.startTimeTracking = () => __awaiter(this, void 0, void 0, function* () {
            console.log('TIMETRACKID', this.timeTrackingIntervalId);
            if (this.timeTrackingIntervalId) {
                return;
            }
            this.timeTrackingStart = +(new Date());
            this.timeTrackingIntervalId = setInterval(this.trackTime, 5000);
        });
        this.stopTimeTracking = () => __awaiter(this, void 0, void 0, function* () {
            clearInterval(this.timeTrackingIntervalId);
            this.timeTrackingIntervalId = null;
        });
        this.trackTime = () => __awaiter(this, void 0, void 0, function* () {
            const currentTime = new Date();
            const lastTrackedDate = new Date(+(yield this.localSettingsService.getLastTrackedDate())) || currentTime;
            if (currentTime.getDay() !== lastTrackedDate.getDay()) {
                const limitHours = yield this.localSettingsService.getTimeLimitHours();
                yield this.localSettingsService.setTimeLeft(+limitHours * 60 * 60 * 1000);
                yield this.localSettingsService.setLastTrackedDate(+currentTime);
                yield this.localSettingsService.setTimeLimitPrewarningShown(false);
                yield this.localSettingsService.setTimeLimitFinalWarningShown(false);
                return;
            }
            const lastKnownTimeLeft = +(yield this.localSettingsService.getTimeLeft());
            const timeLeft = lastKnownTimeLeft - ((+currentTime) - (this.timeTrackingStart));
            // if elapsed is 0 or less -> set 0
            yield this.localSettingsService.setTimeLeft(timeLeft || 0);
            yield this.localSettingsService.setLastTrackedDate(+currentTime);
            this.timeTrackingStart = +currentTime;
            console.log('TIMETRACKING', 'TIME LEFT (sec): ' + timeLeft / 1000);
            // maybe i should use event emitter here
            const shouldShowWarning = timeLeft < 1000 * 60 * 10;
            const shouldShowFinalWarning = timeLeft <= 0;
            const preWarningShown = yield this.localSettingsService.getTimeLimitPrewarningShown();
            const finalWarningShown = yield this.localSettingsService.getTimeLimitFinalWarningShown();
            if ((shouldShowWarning && !preWarningShown) || (shouldShowFinalWarning && !finalWarningShown)) {
                if (shouldShowWarning) {
                    yield this.localSettingsService.setTimeLimitPrewarningShown(true);
                }
                if (shouldShowFinalWarning) {
                    yield this.localSettingsService.setTimeLimitFinalWarningShown(true);
                }
                this.setState(Object.assign({}, this.state, { showLimitWarning: shouldShowWarning && !preWarningShown, showFinalWarning: shouldShowFinalWarning && !finalWarningShown }));
            }
        });
        this.navigationStateChanged = (_prevState, _newState, _action) => {
            const routes = _newState.routes;
            if (!routes || routes.length === 0) {
                return;
            }
            this.currentRouteName = routes[routes.length - 1].routeName;
        };
        this.onAppOpening = () => __awaiter(this, void 0, void 0, function* () {
            let isTimeLimitActive;
            try {
                isTimeLimitActive = yield this.localSettingsService.isTimeLimitTurnedOn();
            }
            catch (e) {
                console.log('time limit is not active', e);
            }
            if (isTimeLimitActive) {
                this.startTimeTracking();
            }
            firebase.messaging()
                .removeDeliveredNotification('*');
            this.checkLocationPermission();
        });
        this.onAppClosing = () => __awaiter(this, void 0, void 0, function* () {
            if (this.timeTrackingStart) {
                this.stopTimeTracking();
            }
        });
        this.handleStateChange = (nextState) => __awaiter(this, void 0, void 0, function* () {
            if (this.state.appState.match(/inactive|background/) && nextState === 'active') {
                console.log('App has come to the foreground!');
                this.onAppOpening();
            }
            else {
                console.log('App is moving to background');
                this.onAppClosing();
            }
            this.setState(Object.assign({}, this.state, { appState: nextState }));
        });
        this.checkLocationPermission = () => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.accountService.isLogged())) {
                return;
            }
            this.checkPhoneLocationDenied();
        });
        this.checkPhoneLocationDenied = () => __awaiter(this, void 0, void 0, function* () {
            const permissionDenied = yield this.accountService.isLocationPermissionDenied();
            this.localSettingsService
                .updateLocationPermissionDenied(permissionDenied === 'denied' || permissionDenied === 'serviceTurnedOff');
            this.toggleLocationWarning(permissionDenied);
        });
        this.toggleLocationWarning = (locationStatus) => {
            if (locationStatus === 'denied') {
                this.navigateBlank('locationPermission', locationStatus);
                return;
            }
            if (locationStatus === 'serviceTurnedOff') {
                this.navigateBlank('locationPermission', locationStatus);
                return;
            }
            if (this.currentRouteName === 'locationPermission') {
                this.navigateBlank('home', locationStatus);
            }
        };
        this.state = {
            appState: AppState.currentState,
            showLimitWarning: false,
            showFinalWarning: false
        };
        this.onAppOpening();
        eventEmitter.on(EVENTS.shouldStartTracking, this.startTimeTracking);
    }
    componentWillMount() {
        AppState.addEventListener('change', this.handleStateChange);
        this.onAppOpening();
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleStateChange);
    }
    render() {
        return React.createElement(View, { style: { flex: 1 } },
            React.createElement(Stack, { ref: nav => { this.navigator = nav; }, onNavigationStateChange: this.navigationStateChanged }),
            React.createElement(PopupSlideBottom, { visible: this.state.showLimitWarning },
                React.createElement(PopupHeader, null, "Take a few more moments"),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(PopupContent, null,
                    React.createElement(TextNormal, null, "We'll ping you again in a few minutes"),
                    React.createElement(TextBold, null, '\nYou have 10 minutes left')),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: () => this.setState(Object.assign({}, this.state, { showLimitWarning: false })) }, "Dismiss")),
                React.createElement(UiBlockSpace, { height: 20 })),
            React.createElement(PopupSlideBottom, { visible: this.state.showFinalWarning },
                React.createElement(PopupHeader, null, "Your time is up"),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(PopupContent, null,
                    React.createElement(TextNormal, null, "You've reached the end of your limits")),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: () => this.setState(Object.assign({}, this.state, { showFinalWarning: false })) }, "Dismiss")),
                React.createElement(UiBlockSpace, { height: 20 })));
    }
    navigateBlank(routeName, locationStatus) {
        this.navigator.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                    routeName,
                    params: { status: locationStatus }
                })],
            key: null
        }));
    }
}
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], ContainerComponent.prototype, "localSettingsService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], ContainerComponent.prototype, "accountService", void 0);
//# sourceMappingURL=container.js.map