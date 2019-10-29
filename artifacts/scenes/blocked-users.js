var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import BaseScreenDefault from './base/base-scene';
import DefaultHeader from '../components/global/default-header';
import UiBlockBottomPanel from '../components/ui/block/bottom-panel';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue';
import i18n from '../locales/i18n';
import UiBlockSpace from '../components/ui/block/space';
import TextLight from '../components/global/text/basic/text-light';
import { BlockService } from '../services/block';
import { lazy } from '../annotations/inversify';
import GridView from '../components/global/grid-view';
import CommunityGridItem from '../components/community-grid-item';
import { ProfileService } from '../services/profile';
import routeConfig from '../router';
import { LocalSettingsService } from '../services/local-settings';
import { ProfileDataService } from '../services/profile-data';
export default class BlockedUsersScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.backButtonPressed = () => {
            this.navigateBack();
        };
        this.onItemClick = (profile) => {
            this.props.navigation.navigate(routeConfig.profileView.name, { profile });
        };
        this.onRefresh = () => {
            this.setSpecState('refreshing', true);
            this.getCommunityViews()
                .then(() => this.setSpecState('refreshing', false));
        };
        this.getCommunityViews = () => {
            return this.blockService.getBlockedProfiles()
                .then(profiles => {
                this.setSpecState('users', profiles.map(it => (Object.assign({}, it, { key: it.profileId, distanceToDisplay: this.profileDataService.getDistanceToDisplaySync(it.distance, this.userMetrics) }))));
            });
        };
        this.navigateBack = () => {
            this.props.navigation.goBack();
        };
        const activeProfile = this.profileService.getActive();
        if (!activeProfile) {
            throw new Error('no active profile');
        }
        this.state = Object.assign({}, this.state, { refreshing: false, activeProfile });
        this.localSettingsService.getSession()
            .then(sessionId => {
            this.setState(Object.assign({}, this.state, { sessionId }));
        })
            .then(() => this.localSettingsService.getUserMetrics())
            .then(val => this.userMetrics = val)
            .then(() => this.getCommunityViews());
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(View, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(TextLight, { style: styles.title }, i18n.t('blockedUsers.screenTitle')),
                React.createElement(UiBlockSpace, { height: 8 }),
                React.createElement(GridView, { onRefresh: this.onRefresh, refreshing: this.state.refreshing, columnCount: 3, columnSpacing: 1, dataSource: this.state.users, renderRow: data => (React.createElement(CommunityGridItem, { onItemClick: () => this.onItemClick(data), model: data, key: data.profileId, profileType: this.state.activeProfile.profileType.code, sessionId: this.state.sessionId })) })),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(NavigationTextButtonBlue, { onPress: this.backButtonPressed }, i18n.t('common.buttons.back')),
                            React.createElement(View, null)))))));
    }
}
BlockedUsersScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('BlockService'),
    __metadata("design:type", BlockService)
], BlockedUsersScreen.prototype, "blockService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], BlockedUsersScreen.prototype, "profileService", void 0);
__decorate([
    lazy('ProfileDataService'),
    __metadata("design:type", ProfileDataService)
], BlockedUsersScreen.prototype, "profileDataService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], BlockedUsersScreen.prototype, "localSettingsService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        paddingLeft: 10,
        paddingRight: 10
    },
    usersList: {}
});
//# sourceMappingURL=blocked-users.js.map