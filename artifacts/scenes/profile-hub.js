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
import { Alert, ListView, StatusBar, StyleSheet, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockBottomPanel from '../components/ui/block/bottom-panel';
import UiProfileHubRow from '../components/ui/profile-hub/row';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import { lazy } from '../annotations/inversify';
import ActionListButton from '../components/action-list-button';
import ProfileSwitcher from '../components/profile-switcher';
import routeConfig from '../router';
import { EVENTS, PROFILE_TYPES, PROFILE_TYPES_MODAL } from '../configs/dicts';
import BaseScreenDefault from './base/base-scene';
import ScaledList from '../components/ui/profile-hub/scaled-to-fill-list';
import ModalWindow from '../components/modal/modal-window';
import UiBlockSpace from '../components/ui/block/space';
import ModalCloseBtn from '../components/modal/modal-close-btn';
import ModalWindowContent from '../components/modal/modal-window-content';
import ModalWindowTitle from '../components/modal/modal-window-title';
import i18n from '../locales/i18n';
import ModalLeftBtn from '../components/modal/modal-left-btn';
import UiProfileHubModalRow from '../components/ui/profile-hub/profile-hub-modal-row';
import ProfileHubModalList from '../components/ui/profile-hub/profile-hub-modal-list';
import ModalWindowSubtext from '../components/modal/modal-window-subtext';
import { LocalSettingsService } from '../services/local-settings';
import { ProfileService } from '../services/profile';
import ProfileModel from '../models/profile';
import UiProfileHubEmptyRow from '../components/ui/profile-hub/empty-row';
import NavigateWithResetToProfileHub from './base/navigate-with-reset-to-profile-hub';
import { mixin } from '../annotations/common';
import eventEmitter from '../utils/event-emitter';
// import {RabbitCredentialService} from '../services/rabbit-credential'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { AccountService } from "../services/account";
let ProfileHubScreen = class ProfileHubScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.modalGuideClosePressed = () => {
            this.hideGuide();
        };
        this.profileNotificationsPressed = (profile) => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(profile);
            this.navigateWithResetToProfileHub(routeConfig.notifications.name, {});
        });
        this.profileMessagesPressed = (profile) => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(profile);
            this.navigateWithResetToProfileHub(routeConfig.messages.name, {});
        });
        this.getProfiles = () => {
            return this.profileService.getForCurrent();
        };
        this.profileClick = (profile) => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(profile);
            this.navigateWithResetToProfileHub(routeConfig.setupProfileDetails.name, { profile });
        });
        this.navigateToCommunityView = (profile) => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(profile);
            this.navigateWithResetToProfileHub(routeConfig.community.name);
        });
        this.emptyProfileClick = (profileType) => {
            this.navigateWithResetToProfileHub(routeConfig.setupProfile.name, { type: profileType.name });
        };
        this.handleGettingStarted = () => __awaiter(this, void 0, void 0, function* () {
            const alreadyShowed = yield this.localSettingsService.isGettingStartedShowed();
            this.setSpecState('showGuideModal', !alreadyShowed);
            console.log(alreadyShowed, 'showGuideModal========================');
            if (!alreadyShowed) {
                this.localSettingsService.gettingStartedShow()
                    .catch(error => console.error('showGuideModal=======', error));
            }
        });
        this.syncCounters = () => {
            if (!this.state.profiles) {
                return;
            }
            console.log('PROFILE HUB SYNCING');
            this.state.profiles.forEach((it) => __awaiter(this, void 0, void 0, function* () {
                const counterStats = yield this.profileService.getStats(it.id);
                console.log('PROFILE HUB NEW STATS', counterStats);
                this.setSpecState(it.profileType.code, counterStats);
            }));
        };
        this.hideGuide = () => {
            this.setSpecState('showGuideModal', false);
        };
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const modalDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(PROFILE_TYPES),
            modalDataSource: modalDs.cloneWithRows(PROFILE_TYPES_MODAL),
            showGuideModal: false,
            haveAnyProfile: false
        };
        this.accountService.saveLoginData();
        this.configurePushNotifications();
        this.handleGettingStarted()
            .catch(error => console.error(error));
        this.getProfiles()
            .then(profiles => {
            if (profiles.length) {
                this.setSpecState('haveAnyProfile', true);
            }
            this.setSpecState('dataSource', ds.cloneWithRows(PROFILE_TYPES.map(type => profiles.find(profile => profile.profileType.code === type.name) || type)));
            this.setSpecState('profiles', profiles);
            this.syncCounters();
        });
        eventEmitter.on(EVENTS.rabbitNewNotification, this.syncCounters);
    }
    configurePushNotifications() {
        console.log('configure NOTIFICATIONS');
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: (token) => {
                Alert.alert('Hi there,', token, [
                    {
                        text: 'ОК',
                        onPress: () => console.log('Change date'),
                        style: 'cancel',
                    },
                ]);
                console.log("NOTIFICATIONS DEVICE TOKEN============:", token);
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: (notification) => {
                console.log("NOTIFICATION:", notification);
                // process the notification
                // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: 104214201284,
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(ScaledList, { dataSource: this.state.dataSource, renderRow: (data) => data instanceof ProfileModel ? (React.createElement(UiProfileHubRow, { onClick: () => this.profileClick(data), onNavigateTo: () => this.navigateToCommunityView(data), onCommunityPress: () => this.navigateToCommunityView(data), onMessagesPress: () => this.profileMessagesPressed(data), onNotificationsPress: () => this.profileNotificationsPressed(data), data: data, newMessages: (this.state[data.profileType.code] || { totalUnreadMessages: 0 })
                        .totalUnreadMessages, newNotifications: (this.state[data.profileType.code] || { totalUnreadNotifications: 0 })
                        .totalUnreadNotifications })) : (React.createElement(UiProfileHubEmptyRow, { onClick: () => this.emptyProfileClick(data), data: data })) }),
            React.createElement(ModalWindow, { visible: this.state.showGuideModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.modalGuideClosePressed }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, i18n.t('profile.modal.hubTitle')),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowSubtext, null, i18n.t('profile.modal.hubMessage')),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(View, { style: styles.listView },
                        React.createElement(ProfileHubModalList, { dataSource: this.state.modalDataSource, renderRow: (data) => React.createElement(UiProfileHubModalRow, { data: data }) })),
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(ModalLeftBtn, { onPress: this.modalGuideClosePressed }, i18n.t('profile.modal.hubButton')))),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            this.state.haveAnyProfile ? (React.createElement(ProfileSwitcher, { navigation: this.props.navigation })) : (React.createElement(View, null)),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
};
ProfileHubScreen.navigationOptions = ({ navigation }) => ({
    title: 'ProfileHubScreen',
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation }),
    headerLeft: null
});
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], ProfileHubScreen.prototype, "localSettingsService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ProfileHubScreen.prototype, "profileService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], ProfileHubScreen.prototype, "accountService", void 0);
ProfileHubScreen = __decorate([
    mixin([NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], ProfileHubScreen);
export default ProfileHubScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    listView: {
        height: '40%'
    }
});
//# sourceMappingURL=profile-hub.js.map