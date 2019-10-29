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
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockBottomPanel from '../components/ui/block/bottom-panel';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import ActionListButton from '../components/action-list-button';
import ProfileSwitcher from '../components/profile-switcher';
import GridView from '../components/global/grid-view';
import CommunityGridItem from '../components/community-grid-item';
import BaseScreenDefault from './base/base-scene';
import AdBannerCommunityHorizontal from '../components/ad/banner-community-horisontal';
import { SearchRequest } from '../dto/search-request';
import { MultiCondition } from '../dto/multi-condition';
import Fetch from '../utils/fetch';
import configuration from '../configs/index';
import routeConfig from '../router';
import { ProfileService } from '../services/profile';
import { lazy } from '../annotations/inversify';
import CommunityFooter from '../components/community-footer';
import CommunityHeaderAdjust from '../components/community-header-adjust';
import { LocalSettingsService } from '../services/local-settings';
import CommunityHeaderEmpty from '../components/community-header-empty';
import { ProfileDataService } from '../services/profile-data';
export default class CommunityScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.getCommunityViews = () => __awaiter(this, void 0, void 0, function* () {
            const sessionId = yield this.localSettingsService.getSession();
            const restrictions = Object.keys(this.state.restrictionMap)
                .map(key => this.state.restrictionMap[key])
                .map(r => (Object.assign({}, r, { values: r.values.map(v => v.value || v) })));
            let location;
            try {
                location = JSON.parse(yield this.localSettingsService.getValue('LOCATION'));
            }
            catch (err) {
                console.log('location', err);
            }
            const searchRequest = new SearchRequest();
            searchRequest.latitude = (location && location.latitude) || 0;
            searchRequest.longitude = (location && location.longitude) || 0;
            const isExploreEnabled = yield this.localSettingsService.getExploreEnabled();
            const exploreLocation = yield this.localSettingsService.getExploreLocation();
            if (isExploreEnabled && exploreLocation) {
                searchRequest.latitude = exploreLocation.latitude;
                searchRequest.longitude = exploreLocation.longitude;
            }
            if (!searchRequest.latitude && !searchRequest.longitude) {
                Alert.alert('Device location is not available', 'MUSL app doesn\'t have an access to your location, please turn on your location.', [
                    {
                        text: 'OK'
                    }
                ]);
            }
            if (restrictions) {
                const multiCondition = new MultiCondition();
                multiCondition.restrictions = restrictions;
                multiCondition.nature = 'And';
                searchRequest.multiCondition = [multiCondition];
            }
            searchRequest.profileTypeCode = this.state.profile.profileType.code;
            searchRequest.hashTags = this.state.hashTags;
            console.log('SEARCH REQUEST', searchRequest);
            return Fetch.post(configuration.remoteApi.base + '/community-views/search', searchRequest)
                .then(response => {
                console.log('SEARCH RESPONSE', response);
                const searchResponse = response.response.objects[0];
                const dataSource = (searchResponse && searchResponse.communityViewDtos) || [];
                this.setState(Object.assign({}, this.state, { dataSource: dataSource.map(model => (Object.assign({}, model, { key: model.profileId, distanceToDisplay: this.profileDataService.getDistanceToDisplaySync(model.distance, this.userMetrics) }))), searchResponse,
                    sessionId }));
            });
        });
        this.onRefresh = () => {
            this.setState(Object.assign({}, this.state, { refreshing: true }));
            if (this.listReference) {
                this.listReference.scrollToOffset({
                    offset: 0,
                    animated: true
                });
            }
            this.getCommunityViews()
                .then(() => {
                this.setState(Object.assign({}, this.state, { refreshing: false }));
            });
        };
        this.navigateToSearch = () => {
            this.props.navigation.navigate(routeConfig.search.name, { restrictionMap: this.state.restrictionMap });
        };
        this.onItemClick = (profile) => {
            this.props.navigation.navigate(routeConfig.profileView.name, { profile });
        };
        this.renderRow = (data) => {
            return React.createElement(CommunityGridItem, { onItemClick: () => this.onItemClick(data), model: data, sessionId: this.state.sessionId, key: data.profileId, profileType: this.state.profile.profileType.code });
        };
        const params = this.props.navigation.state.params || {};
        const { restrictionMap = {}, hashTags = [] } = params;
        const profile = this.profileService.getActive();
        if (!profile) {
            throw new Error('no active profile');
        }
        this.state = Object.assign({}, this.state, { refreshing: false, profile,
            restrictionMap,
            hashTags });
        this.localSettingsService.getUserMetrics()
            .then(val => this.userMetrics = val)
            .then(() => this.getCommunityViews());
    }
    render() {
        const ds = this.state.dataSource;
        const searchResponse = this.state.searchResponse;
        const showFooter = ds && (ds.length >= 120);
        const showHeader = ds && (ds.length < 120) && (searchResponse.total > 120);
        const showEmptyHeader = ds && !ds.length;
        const footer = showFooter && React.createElement(CommunityFooter, { onRefresh: this.onRefresh });
        const header = showHeader &&
            React.createElement(CommunityHeaderAdjust, { resultCount: ds.length, onAdjustPressed: this.navigateToSearch });
        const emptyHeader = showEmptyHeader && React.createElement(CommunityHeaderEmpty, { onAdjustPressed: this.navigateToSearch });
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(View, { style: styles.bannerContainer },
                React.createElement(AdBannerCommunityHorizontal, null)),
            React.createElement(GridView, { onRefresh: this.onRefresh, getListReference: ref => this.listReference = ref, refreshing: this.state.refreshing, columnCount: 3, columnSpacing: 1, dataSource: ds, renderRow: (data) => this.renderRow(data), footer: footer, header: (this.props.navigation.state.params || {}).restrictionMap ? (emptyHeader || header) : null }),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
}
CommunityScreen.navigationOptions = ({ navigation }) => ({
    title: 'CommunityScreen',
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation }),
    headerLeft: null
});
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], CommunityScreen.prototype, "profileService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], CommunityScreen.prototype, "localSettingsService", void 0);
__decorate([
    lazy('ProfileDataService'),
    __metadata("design:type", ProfileDataService)
], CommunityScreen.prototype, "profileDataService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    listView: {
        flex: 1
    }
});
//# sourceMappingURL=community.js.map