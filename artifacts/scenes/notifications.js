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
import { FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import BaseScreenDefault from './base/base-scene';
import DefaultHeader from '../components/global/default-header';
import ActionListButton from '../components/action-list-button';
import ProfileSwitcher from '../components/profile-switcher';
import UiBlockBottomPanel from '../components/ui/block/bottom-panel';
import UiBlockBasic from '../components/ui/block/basic';
import LineFullWidth from '../components/global/line-full-width';
import UiBlockSpace from '../components/ui/block/space';
import TextLight from '../components/global/text/basic/text-light';
import TextBold from '../components/global/text/basic/text-bold';
import NotificationItem from '../components/notifications/notification-item';
import { NotificationService } from '../services/notification';
import { lazy } from '../annotations/inversify';
import { MediaRequestService } from '../services/media-request';
import NavigateWithResetToProfileHub from './base/navigate-with-reset-to-profile-hub';
import { mixin } from '../annotations/common';
import routeConfig from '../router';
import NewItemsLabel from '../components/notifications/new-items-label';
import { ProfileService } from '../services/profile';
import { RabbitCredentialService } from '../services/rabbit-credential';
import configuration from '../configs/index';
import Fetch from '../utils/fetch';
export var NotificationType;
(function (NotificationType) {
    NotificationType["all"] = "all";
    NotificationType["message"] = "MESSAGE";
    NotificationType["mediaRequest"] = "MEDIA_REQUEST";
    NotificationType["permission"] = "PERMISSION";
    NotificationType["profileViewed"] = "PROFILE_WAS_VIEWED";
    NotificationType["profileFavorited"] = "PROFILE_WAS_FAVORITE";
    NotificationType["profileFlexed"] = "PROFILE_WAS_FLEXED";
    NotificationType["linkRequest"] = "LINK_REQUEST";
})(NotificationType || (NotificationType = {}));
let NotificationsScreen = class NotificationsScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.notificationNickNamePressed = (profile) => {
            return this.goToProfile(profile);
        };
        this.requestApprovePressed = (item) => __awaiter(this, void 0, void 0, function* () {
            const mediaRequest = yield this.mediaRequestService.getByPrimary(item.mediaRequestId);
            if (mediaRequest && mediaRequest.status === 'AWAITING') {
                mediaRequest.status = 'APPROVED';
                yield mediaRequest.save();
                item.state = 'approved';
                this.syncNotifications();
            }
        });
        this.requestDenyPressed = (item) => __awaiter(this, void 0, void 0, function* () {
            const mediaRequest = yield this.mediaRequestService.getByPrimary(item.mediaRequestId);
            if (mediaRequest && mediaRequest.status === 'AWAITING') {
                mediaRequest.status = 'REJECTED';
                yield mediaRequest.save();
                item.state = 'denied';
                this.syncNotifications();
            }
        });
        this.tabAllPressed = () => {
            this.setSpecState('notificationType', "all" /* all */);
        };
        this.tabViewPressed = () => {
            this.setSpecState('notificationType', "PROFILE_WAS_VIEWED" /* profileViewed */);
        };
        this.tabFavoritePressed = () => {
            this.setSpecState('notificationType', "PROFILE_WAS_FAVORITE" /* profileFavorited */);
        };
        this.tabFlexPressed = () => {
            this.setSpecState('notificationType', "PROFILE_WAS_FLEXED" /* profileFlexed */);
        };
        this.tabMessagePressed = () => {
            this.setSpecState('notificationType', "MESSAGE" /* message */);
            this.navigateWithResetToProfileHub(routeConfig.messages.name);
        };
        this.tabRequestPressed = () => {
            this.setSpecState('notificationType', "MEDIA_REQUEST" /* mediaRequest */);
        };
        this.itemActions = (itemType) => {
            if (itemType === "PROFILE_WAS_FAVORITE" /* profileFavorited */) {
                return this.tabFavoritePressed;
            }
            if (itemType === "PROFILE_WAS_FLEXED" /* profileFlexed */) {
                return this.tabFlexPressed;
            }
            if (itemType === "MESSAGE" /* message */) {
                return this.tabMessagePressed;
            }
            return () => null;
        };
        this.syncNotifications = () => __awaiter(this, void 0, void 0, function* () {
            this.setSpecState('refreshing', true);
            const notifications = yield this.notificationService.getForNotificationScene();
            this.setSpecState('notifications', notifications);
            this.setSpecState('refreshing', false);
        });
        this.syncNotificationsCounters = () => __awaiter(this, void 0, void 0, function* () {
            const counterStats = yield this.profileService.getStats();
            console.log('COUNTER STATS', counterStats);
            this.setSpecState('stats', counterStats);
        });
        this.markAllNotificationsRead = () => {
            return this.notificationService.markAllReadForProfile();
        };
        this.renderChatItem = ({ item }) => {
            return (React.createElement(NotificationItem, { type: item.type, userPicture: item.userPicture, nickName: item.nickName, action: item.action, state: item.state, onNickNamePress: () => this.notificationNickNamePressed(item.author), onPress: this.itemActions(item.type), requestApprovePress: () => {
                    this.requestApprovePressed(item);
                }, requestDenyPress: () => {
                    this.requestDenyPressed(item);
                } }));
        };
        this.state = {
            notificationType: "all" /* all */,
            refreshing: false
        };
        this.syncNotifications();
        this.syncNotificationsCounters()
            .then(() => this.markAllNotificationsRead());
    }
    get notifications() {
        return this.state.notifications ? this.state.notifications.filter(notification => {
            return this.state.notificationType === "all" /* all */ || this.state.notificationType === notification.type;
        }) : [];
    }
    componentDidMount() {
        Fetch.post(configuration.remoteApi.base + '/notifications/mark-read', {
            profileId: this.profileService.getActiveProfileId(),
            types: [
                "MEDIA_REQUEST" /* mediaRequest */,
                "PROFILE_WAS_FLEXED" /* profileFlexed */,
                "PROFILE_WAS_FAVORITE" /* profileFavorited */,
                "PROFILE_WAS_VIEWED" /* profileViewed */,
                "PERMISSION" /* permission */,
                "LINK_REQUEST" /* linkRequest */
            ]
        });
        this.rabbitCredentialService.onReady(service => service.subscribe('NEW_NOTIFICATION', this.syncNotificationsCounters)
            .then(it => this.setSpecState('subscription', it)));
    }
    componentWillUnmount() {
        if (this.state.subscription) {
            this.state.subscription.unsubscribe();
        }
    }
    render() {
        const stats = this.state.stats || {
            totalUnreadMessages: 0,
            totalUnreadNotifications: 0,
            totalUnreadPreferMessages: 0,
            totalUnreadNeutralMessages: 0,
            totalUnreadUnpreferedMessages: 0,
            totalUnreadViewedNotifications: 0,
            totalUnreadFlexedNotifications: 0,
            totalUnreadMediaRequestedNotifications: 0,
            totalUnreadMessagesNotifications: 0,
            totalUnreadFavoriteNotifications: 0
        };
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(UiBlockBasic, { style: styles.content },
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(TextLight, { style: styles.title }, "Notifications"),
                    React.createElement(UiBlockSpace, { height: 8 }),
                    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
                    React.createElement(UiBlockSpace, { height: 5 }),
                    React.createElement(View, { style: {
                            flexDirection: 'row',
                            left: -19,
                            width: '108%'
                        } },
                        React.createElement(TouchableOpacity, { onPress: this.tabAllPressed, style: styles.tab },
                            React.createElement(TextBold, { style: styles.allTab }, "All")),
                        React.createElement(TouchableOpacity, { onPress: this.tabViewPressed, style: styles.tab },
                            React.createElement(View, null,
                                React.createElement(Image, { style: styles.tabIcon, source: require('Musl/images/notifications/icon-views.png') }))),
                        React.createElement(TouchableOpacity, { onPress: this.tabFavoritePressed, style: styles.tab },
                            React.createElement(View, null,
                                React.createElement(Image, { style: styles.tabIcon, source: require('Musl/images/notifications/icon-favorites.png') }))),
                        React.createElement(TouchableOpacity, { onPress: this.tabFlexPressed, style: styles.tab },
                            React.createElement(View, null,
                                React.createElement(Image, { style: styles.tabIcon, source: require('Musl/images/notifications/icon-flex.png') }))),
                        React.createElement(TouchableOpacity, { onPress: this.tabRequestPressed, style: styles.tab },
                            React.createElement(View, null,
                                React.createElement(Image, { style: styles.tabIcon, source: require('Musl/images/notifications/icon-request-approve.png') }))),
                        React.createElement(TouchableOpacity, { onPress: this.tabMessagePressed, style: styles.tab },
                            React.createElement(View, null,
                                React.createElement(Image, { style: styles.tabIcon, source: require('Musl/images/notifications/icon-message.png') })),
                            stats.totalUnreadMessages ? (React.createElement(NewItemsLabel, { style: { left: 30 } }, stats.totalUnreadMessages)) : (null))),
                    React.createElement(UiBlockSpace, { height: 5 }),
                    React.createElement(LineFullWidth, { style: styles.tabsBottomBorder })),
                React.createElement(FlatList, { onRefresh: this.syncNotifications, refreshing: this.state.refreshing, data: this.notifications, renderItem: this.renderChatItem, keyExtractor: item => item.id })),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
    goToProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const communityDto = yield this.profileService.getCommunityDtoByProfileId(profile.id);
            if (communityDto === null) {
                return this.props.navigation.navigate(routeConfig.profileBlocked.name);
            }
            if (communityDto === -1) {
                return;
            }
            return this.props.navigation.navigate(routeConfig.profileView.name, { profile: { item: communityDto } });
        });
    }
};
NotificationsScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('NotificationService'),
    __metadata("design:type", NotificationService)
], NotificationsScreen.prototype, "notificationService", void 0);
__decorate([
    lazy('MediaRequestService'),
    __metadata("design:type", MediaRequestService)
], NotificationsScreen.prototype, "mediaRequestService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], NotificationsScreen.prototype, "profileService", void 0);
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], NotificationsScreen.prototype, "rabbitCredentialService", void 0);
NotificationsScreen = __decorate([
    mixin([NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], NotificationsScreen);
export default NotificationsScreen;
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
    allTab: {
        width: 21,
        height: 21,
        fontSize: 14,
        paddingTop: 1
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tabIcon: {
        width: 21,
        height: 21,
        marginRight: 10
    },
    tabsBottomBorder: {
        backgroundColor: '#E3E3E3'
    }
});
//# sourceMappingURL=notifications.js.map