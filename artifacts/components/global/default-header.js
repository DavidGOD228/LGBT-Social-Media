var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockHorizontalCenter from '../ui/block/horizontal-center';
import UiBlockBottom from '../ui/block/bottom';
import UiBlockSpace from '../ui/block/space';
import { ProfileService } from '../../services/profile';
import { lazy } from '../../annotations/inversify';
import routeConfig from '../../router';
// import {NavigationScreenProp} from 'react-navigation'
import NavigateWithResetToProfileHub from '../../scenes/base/navigate-with-reset-to-profile-hub';
import { mixin } from '../../annotations/common';
const HEADERS = {
    FRIEND: require('Musl/images/global/header-bg.png'),
    FLIRT: require('Musl/images/global/header-bg-flirt.png'),
    FUN: require('Musl/images/global/header-bg-fun.png')
};
let DefaultHeader = class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.navigateToCommunityView = () => {
            if (this.props.navigation) {
                this.navigateWithResetToProfileHub(routeConfig.community.name);
            }
        };
        this.renderCommunityButton = () => (React.createElement(TouchableOpacity, { style: {
                position: 'absolute',
                left: 10
            }, onPress: this.navigateToCommunityView },
            React.createElement(Image, { source: require('Musl/images/global/icon-btn-community.png') })));
        const profile = this.profileService.getActive();
        const profileTypeCode = (profile && profile.profileType.code) || "FRIEND";
        this.state = {
            profileTypeCode
        };
    }
    render() {
        return React.createElement(UiBlockHorizontalCenter, null,
            React.createElement(Image, { style: styles.container, source: HEADERS[this.state.profileTypeCode], resizeMode: 'cover' },
                React.createElement(UiBlockBottom, null,
                    React.createElement(UiBlockHorizontalCenter, null,
                        this.props.showCommunityButton && this.profileService.getActive() ?
                            this.renderCommunityButton()
                            : null,
                        React.createElement(Image, { source: require('Musl/images/global/musl-logo-header.png') })),
                    React.createElement(UiBlockSpace, { height: 10 }))));
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], DefaultHeader.prototype, "profileService", void 0);
DefaultHeader = __decorate([
    mixin([NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], DefaultHeader);
export default DefaultHeader;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 65
    }
});
//# sourceMappingURL=default-header.js.map