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
import { StyleSheet, View } from 'react-native';
import { globalParams } from '../../../assets/styles/style';
import { lazy } from '../../../annotations/inversify';
import { ProfileService } from '../../../services/profile';
const COLORS = {
    FRIEND: "#1D4C83",
    FLIRT: "#1b3883",
    FUN: "#111111"
};
export default class BottomNavigationPanel extends Component {
    constructor(props) {
        super(props);
        const profile = this.profileService.getActive();
        const profileTypeCode = (profile && profile.profileType.code) || "FRIEND";
        this.state = {
            profileTypeCode
        };
    }
    render() {
        return React.createElement(View, { style: [styles.container, { backgroundColor: COLORS[this.state.profileTypeCode] }] }, this.props.children);
    }
}
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], BottomNavigationPanel.prototype, "profileService", void 0);
const styles = StyleSheet.create({
    container: {
        height: globalParams.bottomPanelHeight,
        paddingLeft: 15,
        paddingRight: 15
    }
});
//# sourceMappingURL=bottom-navigation-panel.js.map