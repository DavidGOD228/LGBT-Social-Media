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
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white';
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue';
import UiBlockSpace from '../components/ui/block/space';
import UiBlockBasic from '../components/ui/block/basic';
import ButtonBlue from '../components/global/button-blue';
import i18n from '../locales/i18n';
import routeConfig from '../router';
import BaseScreenDefault from './base/base-scene';
import { AccountService } from '../services/account';
import { lazy } from '../annotations/inversify';
import { debounce } from '../annotations/eval';
import NavigateToProfileHub from './base/navigate-to-profile-hub';
import { mixin } from '../annotations/common';
let RegistrationConfirmationScreen = class RegistrationConfirmationScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.backButtonPressed = () => {
            this.navigateToBack();
        };
        this.continueButtonPressed = () => {
            this.navigateToLogin();
        };
        this.resendButtonPressed = () => {
            this.resendConfirmation();
        };
        this.navigateToBack = () => {
            this.setSpecState('activeScreen', false);
            this.props.navigation.goBack();
        };
        this.navigateToLogin = () => {
            this.setSpecState('activeScreen', false);
            this.props.navigation.navigate(routeConfig.login.name);
        };
        this.state = Object.assign({}, this.state, { activeScreen: true });
        this.tryLogin();
    }
    render() {
        const { state } = this.props.navigation;
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(UiBlockBasic, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(Text, { style: styles.title }, i18n.t('registrationConfirmation.title')),
                React.createElement(UiBlockSpace, { height: 40 }),
                React.createElement(Text, { style: styles.text }, i18n.t('registrationConfirmation.message', { email: state.params.email })),
                React.createElement(UiBlockSpace, { height: 50 }),
                React.createElement(ButtonBlue, { onPress: this.resendButtonPressed }, i18n.t('registrationConfirmation.resend'))),
            React.createElement(BottomNavigationPanel, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(NavigationTextButtonBlue, { onPress: this.backButtonPressed }, i18n.t('common.buttons.back')),
                        React.createElement(NavigationTextButtonWhite, { onPress: this.continueButtonPressed }, i18n.t('common.buttons.continue_btn')))))));
    }
    resendConfirmation() {
        this.accountService.resendConfirmation(this.props.navigation.state.params.email);
    }
    tryLogin() {
        this.accountService.login(this.props.navigation.state.params.email, this.props.navigation.state.params.password)
            .then(() => this.setSpecState('activeScreen', false))
            .then(() => this.navigateToProfileHub())
            .catch(() => this.state.activeScreen ? this.tryLogin() : null);
    }
};
RegistrationConfirmationScreen.navigationOptions = {
    header: React.createElement(DefaultHeader, null)
};
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], RegistrationConfirmationScreen.prototype, "accountService", void 0);
__decorate([
    debounce(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegistrationConfirmationScreen.prototype, "resendConfirmation", null);
__decorate([
    debounce(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegistrationConfirmationScreen.prototype, "tryLogin", null);
RegistrationConfirmationScreen = __decorate([
    mixin([NavigateToProfileHub]),
    __metadata("design:paramtypes", [Object])
], RegistrationConfirmationScreen);
export default RegistrationConfirmationScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        color: 'rgb(46, 46, 46)',
        fontSize: 30,
        fontWeight: '300'
    },
    text: {
        color: '#000000',
        fontSize: 17
    }
});
//# sourceMappingURL=registration-confirmation.js.map