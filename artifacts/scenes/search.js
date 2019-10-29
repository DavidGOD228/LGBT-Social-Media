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
import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white';
import i18n from '../locales/i18n';
import UiBlockBasic from '../components/ui/block/basic';
import TextLight from '../components/global/text/basic/text-light';
import DefaultHeader from '../components/global/default-header';
import BaseScreenDefault from './base/base-scene';
import UiBlockSpace from '../components/ui/block/space';
import SubmitButton from '../components/submit-button';
import { lazy } from '../annotations/inversify';
import { comparator } from '../utils/number';
import SectionComponent from './search/section';
import { ProfileService } from '../services/profile';
import routeConfig from '../router';
import { SearchSectionService } from '../services/search-section';
import ActionListButton from '../components/action-list-button';
import HashTagInput from '../components/hash-tag-input/hash-tag-input';
import CollapsingSection from '../components/collapsing-section';
import ModalWindow from '../components/modal/modal-window';
import ModalCloseBtn from '../components/modal/modal-close-btn';
import ModalWindowContent from '../components/modal/modal-window-content';
import ModalWindowTitle from '../components/modal/modal-window-title';
import ModalWindowText from '../components/modal/modal-window-text';
import ModalLeftBtn from '../components/modal/modal-left-btn';
import { LocalSettingsService } from '../services/local-settings';
export default class SearchScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.submitPressed = () => {
            this.submitSearch();
        };
        this.hashTagsChanged = (tags) => {
            this.setState(Object.assign({}, this.state, { hashTags: tags }));
        };
        this.onSearchInfoPressed = () => {
            this.setState(Object.assign({}, this.state, { showInfoModal: true }));
        };
        this.modalInfoClosePressed = () => {
            this.setState(Object.assign({}, this.state, { showInfoModal: false }));
        };
        this.backButton = () => {
            this.props.navigation.goBack();
        };
        this.getSections = (profileTypeCode) => {
            return this.searchSectionService.getAllByProfileTypeCode(profileTypeCode);
        };
        const profile = this.profileService.getActive();
        const params = this.props.navigation.state.params || {};
        const { restrictionMap = {}, hashTags = [] } = params;
        this.state = Object.assign({}, this.state, { showInfoModal: false, restrictionMap,
            hashTags,
            profile });
        this.localSettingsService.getUserMetrics()
            .then(val => this.setSpecState('userMetrics', val));
        this.getSections(profile.profileType.code)
            .then(sections => this.setSpecState('sections', sections));
    }
    submitSearch() {
        this.props.navigation.navigate(routeConfig.community.name, {
            restrictionMap: this.state.restrictionMap,
            profile: this.state.profile,
            hashTags: this.state.hashTags
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(KeyboardAvoidingView, { style: styles.container, behavior: "position", keyboardVerticalOffset: 50, contentContainerStyle: { flex: 1 } },
                React.createElement(ScrollView, { contentContainerStyle: { paddingBottom: 60 } },
                    React.createElement(StatusBar, { barStyle: "light-content" }),
                    React.createElement(UiBlockBasic, { style: styles.content },
                        React.createElement(UiBlockBasic, null,
                            React.createElement(UiBlockSpace, { height: 20 }),
                            React.createElement(View, { style: styles.title },
                                React.createElement(TextLight, { style: { fontSize: 20 } }, 'Search'),
                                React.createElement(TouchableOpacity, { onPress: this.onSearchInfoPressed },
                                    React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') }))),
                            React.createElement(UiBlockSpace, { height: 10 })),
                        this.state.sections ? this.state.sections
                            .sort(comparator)
                            .map(section => React.createElement(SectionComponent, { restrictionMap: this.state.restrictionMap, profile: this.state.profile, section: section, key: section.id, userMetrics: this.state.userMetrics })) : null,
                        React.createElement(CollapsingSection, { title: 'Search Hashtags', completed: false },
                            React.createElement(HashTagInput, { tags: this.state.hashTags, onTagsChanged: this.hashTagsChanged })))),
                React.createElement(SubmitButton, { onPress: this.submitPressed })),
            React.createElement(ModalWindow, { visible: this.state.showInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.modalInfoClosePressed }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, "SEARCH"),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, 'As with all searches, the more detail you add, the more narrow your results will be.\n\n' +
                        'So keep that in mind as you craft your searches and don’t be too picky.'),
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(ModalLeftBtn, { onPress: this.modalInfoClosePressed }, "Close"))),
            React.createElement(BottomNavigationPanel, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(UiBlockVerticalCenter, null,
                            React.createElement(NavigationTextButtonWhite, { onPress: this.backButton }, i18n.t('common.buttons.back'))),
                        React.createElement(ActionListButton, { navigation: this.props.navigation }))))));
    }
}
SearchScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('SearchSectionService'),
    __metadata("design:type", SearchSectionService)
], SearchScreen.prototype, "searchSectionService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], SearchScreen.prototype, "profileService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], SearchScreen.prototype, "localSettingsService", void 0);
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    content: {
        paddingLeft: 25,
        paddingRight: 25
    }
});
//# sourceMappingURL=search.js.map