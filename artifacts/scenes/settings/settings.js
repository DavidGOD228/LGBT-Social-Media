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
import React from 'react';
import { DatePickerIOS, Platform, ScrollView, StatusBar, StyleSheet, TimePickerAndroid, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel';
import BaseScreenDefault from '../base/base-scene';
import DefaultHeader from '../../components/global/default-header';
import ActionListButton from '../../components/action-list-button';
import ProfileSwitcher from '../../components/profile-switcher';
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel';
import UiBlockSpace from '../../components/ui/block/space';
import TextLight from '../../components/global/text/basic/text-light';
import i18n from '../../locales/i18n';
import AlertsSection from '../../components/settings/alerts-section';
import { default as QuietHoursSection } from '../../components/settings/quiet-hours-section';
import TimeLimitsSection from '../../components/settings/time-limits-section';
import AccountDetailsSection from '../../components/settings/account-details-section';
import SwitcherSection from '../../components/settings/switcher-section';
import BlockedUsersSection from '../../components/settings/blocked-users-section';
import LogoutSection from '../../components/settings/log-out-section';
import ModalWindow from '../../components/modal/modal-window';
import ModalCloseBtn from '../../components/modal/modal-close-btn';
import ModalWindowContent from '../../components/modal/modal-window-content';
import ModalWindowTitle from '../../components/modal/modal-window-title';
import ModalWindowText from '../../components/modal/modal-window-text';
import routeConfig from '../../router';
import { AccountService } from '../../services/account';
import { lazy } from '../../annotations/inversify';
import PopupSlideBottom from '../../components/global/popup/popup-slide-bottom';
import PopupHeader from '../../components/global/popup/header';
import PopupContent from '../../components/global/popup/content';
import PopupTwoButtonsContainer from '../../components/global/popup/two-buttons-container';
import PopupButton from '../../components/global/popup/button';
import { LocalSettingsService } from '../../services/local-settings';
import Time from '../../models/time';
import LineFullWidth from '../../components/global/line-full-width';
import { NotificationService } from '../../services/notification';
import DeleteAccountSection from '../../components/settings/delete-account-section';
export default class SettingsScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.metricsSelected = (type) => {
            this.setMetrics(type);
        };
        this.alertsAllChanged = (value) => {
            this.localSettingsService.setAlertsAllTurnedOn(value)
                .then(() => {
                this.state.alerts.all = value;
                this.setState(this.state);
            });
            this.notificationService.saveNotificationSettings();
        };
        this.alertsNotificationsChanged = (value) => {
            this.localSettingsService.setAlertsNotificationsTurnedOn(value)
                .then(() => {
                this.state.alerts.notifications = value;
                this.setState(this.state);
            });
            this.notificationService.saveNotificationSettings();
        };
        this.alertsSoundChanged = (value) => {
            this.localSettingsService.setAlertsSoundTurnedOn(value)
                .then(() => {
                this.state.alerts.sound = value;
                this.setState(this.state);
            });
            this.notificationService.saveNotificationSettings();
        };
        this.alertsVibrationChanged = (value) => {
            this.localSettingsService.setAlertsVibrateTurnedOn(value)
                .then(() => {
                this.state.alerts.vibrate = value;
                this.setState(this.state);
            });
            this.notificationService.saveNotificationSettings();
        };
        this.quietHoursSwitched = (value) => {
            this.localSettingsService.setQuietHoursTurnedOn(value)
                .then(() => {
                this.state.quietHours.on = value;
                this.setState(Object.assign({}, this.state));
            });
            this.notificationService.saveNotificationSettings();
        };
        this.timeLimitsChange = (value) => {
            this.localSettingsService.setTimeLimitTurnedOn(value.on);
            this.localSettingsService.setTimeLimitHours(value.hours);
            this.localSettingsService.setTimeLimitDailyWeekly(value.timeLimitType);
            this.setState(Object.assign({}, this.state, { timeLimits: value }));
        };
        this.usePhotosInSwitcherChanged = (value) => {
            this.localSettingsService.setPhotosInSwitcherTurnedOn(value);
            this.setState({ switcher: { showPhotosInSwitcher: value } });
        };
        this.changeEmailPressed = () => {
            this.startChangeEmail();
        };
        this.changePasswordPressed = () => {
            this.startChangePassword();
        };
        this.blockedUsersPress = () => {
            this.goToBlockedUsers();
        };
        this.logoutPress = () => __awaiter(this, void 0, void 0, function* () {
            yield this.logout();
            this.navigateToLogin();
        });
        this.deleteAccountPressed = () => {
            this.setSpecState('showDeleteAccountPopup', true);
        };
        this.confirmDeleteAccountPressed = () => __awaiter(this, void 0, void 0, function* () {
            yield this.deleteAccount();
            this.navigateToLogin();
        });
        this.cancelDeleteAccountPressed = () => {
            this.setSpecState('showDeleteAccountPopup', false);
        };
        this.alertsInfoPressed = () => {
            this.showAlertsInfo();
        };
        this.quietHoursInfoPressed = () => {
            this.showQuietHoursInfo();
        };
        this.quietHoursStartPressed = () => {
            this.showQuietHoursTimeSelector('start');
        };
        this.quietHoursEndPressed = () => {
            this.showQuietHoursTimeSelector('end');
        };
        this.quietHoursIosPopupCancelPressed = () => {
            this.state.quietHours.showIosSelector = false;
            this.setState(this.state);
        };
        this.quietHoursIosDateChanged = (date) => {
            this.state.quietHours.timeTmp.setHours(date.getHours());
            this.state.quietHours.timeTmp.setMinutes(date.getMinutes());
            this.setState(this.state);
            this.notificationService.saveNotificationSettings();
        };
        this.quietHoursIosPopupSavePressed = () => {
            this.state.quietHours.showIosSelector = false;
            this.saveQuietHour();
            this.notificationService.saveNotificationSettings();
        };
        this.timeLimitsInfoPressed = () => {
            this.showTimeLimitsInfo();
        };
        this.emailInfoPressed = () => {
            this.showEmailInfo();
        };
        this.passwordInfoPressed = () => {
            this.showPasswordInfo();
        };
        this.photosInSwitcherInfoPressed = () => {
            this.showPhotosInSwitcherInfo();
        };
        this.modalInfoClosePressed = () => {
            this.hideModalInfo();
        };
        this.showQuietHoursTimeSelector = (type) => {
            if (type === 'start') {
                this.state.quietHours.timeTmp
                    = new Time(this.state.quietHours.timeStart.getHours(), this.state.quietHours.timeStart.getMinutes());
            }
            else {
                this.state.quietHours.timeTmp
                    = new Time(this.state.quietHours.timeEnd.getHours(), this.state.quietHours.timeEnd.getMinutes());
            }
            this.state.quietHours.currentParameter = type;
            if (Platform.OS === 'ios') {
                this.showQuietHoursIosSelector();
            }
            if (Platform.OS === 'android') {
                this.showQuietHoursAndroidSelector();
            }
        };
        this.showQuietHoursIosSelector = () => {
            this.state.quietHours.showIosSelector = true;
            this.setState(this.state);
        };
        this.saveQuietHour = () => {
            if (this.state.quietHours.currentParameter === 'start') {
                this.state.quietHours.timeStart = this.state.quietHours.timeTmp;
                this.localSettingsService.setQuietHoursStart(JSON.stringify(this.state.quietHours.timeStart));
            }
            else {
                this.state.quietHours.timeEnd = this.state.quietHours.timeTmp;
                this.localSettingsService.setQuietHoursEnd(JSON.stringify(this.state.quietHours.timeEnd));
            }
            this.setState(this.state);
            this.notificationService.saveNotificationSettings();
        };
        this.showAlertsInfo = () => {
            this.setState(Object.assign({}, this.state, { infoModalTitle: i18n.t('settings.alerts.modalTitle'), infoModalText: i18n.t('settings.alerts.modalInfo'), showInfoModal: true }));
        };
        this.showQuietHoursInfo = () => {
            this.setState(Object.assign({}, this.state, { infoModalTitle: i18n.t('settings.quietHours.modalTitle'), infoModalText: i18n.t('settings.quietHours.modalInfo'), showInfoModal: true }));
        };
        this.showTimeLimitsInfo = () => {
            this.setState(Object.assign({}, this.state, { infoModalTitle: i18n.t('settings.timeLimits.modalTitle'), infoModalText: i18n.t('settings.timeLimits.modalInfo'), showInfoModal: true }));
        };
        this.showEmailInfo = () => {
            this.setState(Object.assign({}, this.state, { infoModalTitle: i18n.t('registration.modal.email'), infoModalText: i18n.t('registration.modal.emailMessage'), showInfoModal: true }));
        };
        this.showPasswordInfo = () => {
            this.setState(Object.assign({}, this.state, { infoModalTitle: i18n.t('registration.modal.password'), infoModalText: i18n.t('registration.modal.passwordMessage'), showInfoModal: true }));
        };
        this.showPhotosInSwitcherInfo = () => {
            this.setState(Object.assign({}, this.state, { infoModalTitle: i18n.t('settings.switcher.modalTitle'), infoModalText: i18n.t('settings.switcher.modalInfo'), showInfoModal: true }));
        };
        this.hideModalInfo = () => {
            this.setSpecState('showInfoModal', false);
        };
        this.setMetrics = (type) => {
            this.localSettingsService.setUserMetrics(type);
            this.setSpecState('metricsType', type);
        };
        this.startChangeEmail = () => {
            this.props.navigation.navigate(routeConfig.changeEmail.name);
        };
        this.startChangePassword = () => {
            this.props.navigation.navigate(routeConfig.changePassword.name);
        };
        this.goToBlockedUsers = () => {
            this.props.navigation.navigate(routeConfig.blockedUsers.name);
        };
        this.deleteAccount = () => {
            return this.accountService.deleteCurrent();
        };
        this.logout = () => {
            return this.accountService.logout();
        };
        this.navigateToLogin = () => {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: routeConfig.login.name,
                        params: {}
                    })
                ],
                key: null
            }));
        };
        this.state = Object.assign({}, this.state, { metricsType: 'Imperial', alerts: {
                all: false,
                notifications: false,
                sound: false,
                vibrate: false
            }, quietHours: {
                on: false,
                // parameter to render DatePickerIOS
                timeTmp: new Time(9, 0),
                // parameter that is set after user press 'save' button
                timeStart: new Time(9, 0),
                // parameter that is set after user press 'save' button
                timeEnd: new Time(17, 0),
                showIosSelector: false,
                currentParameter: 'start'
            }, timeLimits: {
                on: false,
                timeLimitType: 'Daily',
                hours: 3
            }, switcher: {
                showPhotosInSwitcher: false
            }, showInfoModal: false, infoModalTitle: '', infoModalText: '', showDeleteAccountPopup: false });
        this.initQuietHours();
        this.localSettingsService.getUserMetrics()
            .then(value => {
            this.setState(Object.assign({}, this.state, { metricsType: value }));
        });
        Promise.all([
            this.localSettingsService.isAlertsAllTurnedOn(),
            this.localSettingsService.isAlertsNotificationsTurnedOn(),
            this.localSettingsService.isAlertsSoundTurnedOn(),
            this.localSettingsService.isAlertsVibrateTurnedOn()
        ])
            .then(values => {
            this.setSpecState('alerts', {
                all: values[0],
                notifications: values[1],
                sound: values[2],
                vibrate: values[3]
            });
        })
            .catch(error => console.log('error: ' + error));
        Promise.all([
            this.localSettingsService.isTimeLimitTurnedOn(),
            this.localSettingsService.getTimeLimitDailyWeekly(),
            this.localSettingsService.getTimeLimitHours()
        ])
            .then(values => {
            this.setSpecState('timeLimits', {
                on: values[0],
                timeLimitType: values[1],
                hours: values[2] || 1
            });
        });
        this.localSettingsService.isPhotosInSwitcherTurnedOn()
            .then(value => this.setState(Object.assign({}, this.state, { switcher: {
                showPhotosInSwitcher: value
            } })));
        this.accountService.getCurrent()
            .then(account => {
            if (account) {
                this.setSpecState('account', account);
            }
        });
    }
    initQuietHours() {
        this.localSettingsService.isQuietHoursTurnedOn()
            .then((value) => {
            this.state.quietHours.on = value;
            this.setState(this.state);
        });
        this.initQuietHoursStart();
        this.initQuietHoursEnd();
    }
    initQuietHoursStart() {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.localSettingsService.getQuietHoursStart();
            if (!value) {
                value = JSON.stringify(this.state.quietHours.timeStart);
                this.localSettingsService.setQuietHoursStart(value);
            }
            const time = JSON.parse(value);
            this.state.quietHours.timeStart.setHours(time.hours);
            this.state.quietHours.timeStart.setMinutes(time.minutes);
            this.setState(this.state);
        });
    }
    initQuietHoursEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.localSettingsService.getQuietHoursEnd();
            if (!value) {
                value = JSON.stringify(this.state.quietHours.timeEnd);
                this.localSettingsService.setQuietHoursEnd(value);
            }
            const time = JSON.parse(value);
            this.state.quietHours.timeEnd.setHours(time.hours);
            this.state.quietHours.timeEnd.setMinutes(time.minutes);
            this.setState(this.state);
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(ScrollView, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(TextLight, { style: styles.title }, i18n.t('settings.screenTitle')),
                React.createElement(UiBlockSpace, { height: 8 }),
                React.createElement(LineFullWidth, { style: { backgroundColor: '#979797' } }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(AlertsSection, { alerts: this.state.alerts, alertsAllChanged: this.alertsAllChanged, alertsNotificationsChanged: this.alertsNotificationsChanged, alertsSoundChanged: this.alertsSoundChanged, alertsVibrationChanged: this.alertsVibrationChanged, infoPressed: this.alertsInfoPressed }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(QuietHoursSection, { quietHours: this.state.quietHours, onInfoPress: this.quietHoursInfoPressed, onQuietHoursToggle: this.quietHoursSwitched, onTimeStartPress: this.quietHoursStartPressed, onTimeEndPress: this.quietHoursEndPressed }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(TimeLimitsSection, { on: this.state.timeLimits.on, hours: this.state.timeLimits.hours, timeLimitType: this.state.timeLimits.timeLimitType, timeLimitsChange: this.timeLimitsChange, infoPressed: this.timeLimitsInfoPressed }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(AccountDetailsSection, { email: this.state.account ? this.state.account.email : '', onEmailInfoPressed: this.emailInfoPressed, onPasswordInfoPressed: this.passwordInfoPressed, onChangeEmailPressed: this.changeEmailPressed, onChangePasswordPressed: this.changePasswordPressed }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(SwitcherSection, { usePhotos: this.state.switcher.showPhotosInSwitcher, onChangeUsePhotos: this.usePhotosInSwitcherChanged, onInfoPress: this.photosInSwitcherInfoPressed }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(BlockedUsersSection, { onBlockedUsersPress: this.blockedUsersPress }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(LogoutSection, { onLogoutPress: this.logoutPress }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(DeleteAccountSection, { onDeletePress: this.deleteAccountPressed }),
                React.createElement(UiBlockSpace, { height: 40 })),
            React.createElement(ModalWindow, { visible: this.state.showInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.modalInfoClosePressed }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, this.state.infoModalTitle),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, this.state.infoModalText))),
            React.createElement(PopupSlideBottom, { visible: this.state.showDeleteAccountPopup },
                React.createElement(PopupHeader, null, i18n.t('settings.deleteAccount.popupTitle')),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(PopupContent, null, i18n.t('settings.deleteAccount.popupText')),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: this.cancelDeleteAccountPressed }, i18n.t('settings.deleteAccount.dismissButton')),
                    React.createElement(PopupButton, { onPress: this.confirmDeleteAccountPressed }, i18n.t('settings.deleteAccount.confirmButton'))),
                React.createElement(UiBlockSpace, { height: 15 })),
            React.createElement(PopupSlideBottom, { visible: this.state.quietHours.showIosSelector },
                React.createElement(PopupHeader, null,
                    "Set ",
                    this.state.quietHours.currentParameter,
                    " time"),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(DatePickerIOS, { date: this.state.quietHours.timeTmp.getDateObject(), mode: 'time', onDateChange: this.quietHoursIosDateChanged }),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: this.quietHoursIosPopupCancelPressed }, i18n.t('common.buttons.cancel')),
                    React.createElement(PopupButton, { onPress: this.quietHoursIosPopupSavePressed }, i18n.t('common.buttons.save'))),
                React.createElement(UiBlockSpace, { height: 15 })),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation, usePhotos: this.state.switcher.showPhotosInSwitcher }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
    showQuietHoursAndroidSelector() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { action, hour, minute } = yield TimePickerAndroid.open({
                    hour: this.state.quietHours.timeTmp.getHours(),
                    minute: this.state.quietHours.timeTmp.getMinutes(),
                    is24Hour: false
                });
                if (action !== TimePickerAndroid.dismissedAction) {
                    this.state.quietHours.timeTmp.setHours(hour);
                    this.state.quietHours.timeTmp.setMinutes(minute);
                    this.saveQuietHour();
                }
            }
            catch ({ code, message }) {
                console.warn('Cannot open time picker', message);
            }
        });
    }
}
SettingsScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], SettingsScreen.prototype, "accountService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], SettingsScreen.prototype, "localSettingsService", void 0);
__decorate([
    lazy('NotificationService'),
    __metadata("design:type", NotificationService)
], SettingsScreen.prototype, "notificationService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 24
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    twoValueSwitcherContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    fieldsContainer: {
        paddingLeft: 15,
        paddingRight: 7
    }
});
//# sourceMappingURL=settings.js.map