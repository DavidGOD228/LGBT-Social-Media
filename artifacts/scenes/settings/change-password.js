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
import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native';
import BaseScreenDefault from '../base/base-scene';
import DefaultHeader from '../../components/global/default-header';
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel';
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center';
import NavigationTextButtonBlue from '../../components/global/bottom-navigation/text-button-blue';
import i18n from '../../locales/i18n';
import UiBlockSpace from '../../components/ui/block/space';
import TextLight from '../../components/global/text/basic/text-light';
import LineFullWidth from '../../components/global/line-full-width';
import Input from '../../components/input';
import NavigationTextButtonWhite from '../../components/global/bottom-navigation/text-button-white';
import { validation } from '../../utils/validation';
import { CHANGE_PASSWORD_VALIDATION } from '../../validation/change-password';
import TextBold from '../../components/global/text/basic/text-bold';
import UiBlockBasic from '../../components/ui/block/basic';
import { AccountService } from '../../services/account';
import { lazy } from '../../annotations/inversify';
export default class ChangePasswordScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.backButtonPressed = () => {
            this.navigateBack();
        };
        this.passwordChanged = (text) => {
            this.setErrors({});
            this.savePassword(text);
        };
        this.repeatPasswordChanged = (text) => {
            this.setErrors({});
            this.saveRepeatPassword(text);
        };
        this.savePressed = () => {
            this.updatePassword();
        };
        this.savePassword = (password) => {
            this.setSpecState('password', password);
        };
        this.saveRepeatPassword = (repeatPassword) => {
            this.setSpecState('repeatPassword', repeatPassword);
        };
        this.setErrors = (errors) => {
            this.setSpecState('error', errors);
        };
        this.updatePassword = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.validate();
                const account = yield this.accountService.getCurrent();
                if (!account) {
                    throw new Error('there is no account');
                }
                account.set('password', this.state.password);
                yield account.save();
                this.navigateBack();
            }
            catch (error) {
                const parsed = error.json ? yield error.json() : error;
                this.setErrors(parsed);
            }
        });
        this.validate = () => {
            this.setErrors({});
            const errors = validation(this.state, CHANGE_PASSWORD_VALIDATION);
            if (errors) {
                throw errors;
            }
        };
        this.navigateBack = () => {
            this.props.navigation.goBack();
        };
        this.state = Object.assign({}, this.state, { password: '', repeatPassword: '', error: {} });
    }
    render() {
        const formFilled = this.state.password || this.state.repeatPassword;
        const anyError = this.state.error.password || this.state.error.repeatPassword;
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(View, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(TextLight, { style: styles.title }, i18n.t('changePassword.screenTitle')),
                React.createElement(UiBlockSpace, { height: 8 }),
                React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(KeyboardAvoidingView, { behavior: "position", keyboardVerticalOffset: 43 },
                    React.createElement(Input, { placeholder: i18n.t('common.placeholder.password'), secureTextEntry: true, onChangeText: this.passwordChanged, textColor: this.state.error.password ? 'rgb(213, 0, 0)' : undefined, baseColor: this.state.error.password ? 'rgb(213, 0, 0)' : undefined }),
                    React.createElement(Input, { placeholder: i18n.t('common.placeholder.passwordConfirm'), secureTextEntry: true, textColor: this.state.error.repeatPassword ? 'rgb(213, 0, 0)' : undefined, baseColor: this.state.error.repeatPassword ? 'rgb(213, 0, 0)' : undefined, onChangeText: this.repeatPasswordChanged })),
                anyError ? (React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockSpace, { height: 20 }),
                    React.createElement(TextBold, { style: styles.errorText }, formFilled ? anyError.join('\n') : i18n.t('registration.error.form')))) : (null)),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(NavigationTextButtonBlue, { onPress: this.backButtonPressed }, i18n.t('common.buttons.back')),
                            React.createElement(NavigationTextButtonWhite, { onPress: this.savePressed }, i18n.t('common.buttons.save'))))))));
    }
}
ChangePasswordScreen.navigationOptions = {
    header: React.createElement(DefaultHeader, null)
};
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], ChangePasswordScreen.prototype, "accountService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 24
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    errorText: {
        color: 'rgb(213, 0, 0)'
    }
});
//# sourceMappingURL=change-password.js.map