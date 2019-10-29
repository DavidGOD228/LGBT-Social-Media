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
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import { lazy } from '../annotations/inversify';
import BaseScreenDefault from './base/base-scene';
import { LocalSettingsService } from '../services/local-settings';
import UiBlockBottomPanel from '../components/ui/block/bottom-panel';
import ProfileSwitcher from '../components/profile-switcher';
import ActionListButton from '../components/action-list-button';
import UiBlockSpace from '../components/ui/block/space';
import TextLight from '../components/global/text/basic/text-light';
import i18n from '../locales/i18n';
import LineFullWidth from '../components/global/line-full-width';
import NavigateWithResetToProfileHub from './base/navigate-with-reset-to-profile-hub';
import SafeForWork from './visibility/safe-for-work';
import { mixin } from '../annotations/common';
import StealthModeSwitch from './visibility/stealth-mode-switch';
import ExploreSection from './visibility/explore';
import PopupSlideBottom from '../components/global/popup/popup-slide-bottom';
let VisibilityScreen = class VisibilityScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.drawProfileSwitcher = () => {
            this.localSettingsService.isPhotosInSwitcherTurnedOn()
                .then(value => this.setState(Object.assign({}, this.state, { switcher: {
                    showPhotosInSwitcher: value
                } })));
        };
        this.state = Object.assign({}, this.state, { switcher: {
                showPhotosInSwitcher: false
            } });
        this.drawProfileSwitcher();
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(ScrollView, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(TextLight, { style: styles.title }, i18n.t('visibility.screenTitle')),
                React.createElement(UiBlockSpace, { height: 8 }),
                React.createElement(LineFullWidth, { style: { backgroundColor: '#979797' } }),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(StealthModeSwitch, null),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(LineFullWidth, { style: { backgroundColor: '#979797' } }),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(SafeForWork, { ref: ref => this.safeForWorkSectionRef = ref, toggleIosSelector: enabled => this.setState(Object.assign({}, this.state, { timeShowIosSelector: enabled })), updateUi: () => this.setState(this.state) }),
                React.createElement(ExploreSection, null)),
            this.safeForWorkSectionRef &&
                React.createElement(PopupSlideBottom, { visible: this.state.timeShowIosSelector }, this.safeForWorkSectionRef.renderPopupContent()),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation, usePhotos: this.state.switcher.showPhotosInSwitcher }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
};
VisibilityScreen.navigationOptions = ({ navigation }) => ({
    title: 'VisibilityScreen',
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation }),
    headerLeft: null
});
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], VisibilityScreen.prototype, "localSettingsService", void 0);
VisibilityScreen = __decorate([
    mixin([NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], VisibilityScreen);
export default VisibilityScreen;
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
    fieldsContainer: {
        paddingLeft: 15,
        paddingRight: 7
    },
    messageContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    infoIcon: {
        position: 'absolute',
        top: -7,
        right: -30
    }
});
//# sourceMappingURL=visibility.js.map