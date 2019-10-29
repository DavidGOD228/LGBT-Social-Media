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
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import IOSCLearIcon from 'react-native-vector-icons/EvilIcons';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockSpace from '../components/ui/block/space';
import Input from '../components/input';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import ModalWindow from '../components/modal/modal-window';
import ModalCloseBtn from '../components/modal/modal-close-btn';
import ModalWindowContent from '../components/modal/modal-window-content';
import ModalWindowTitle from '../components/modal/modal-window-title';
import ModalWindowText from '../components/modal/modal-window-text';
import ModalLeftBtn from '../components/modal/modal-left-btn';
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue';
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white';
import { AccountService } from '../services/account';
import i18n from '../locales/i18n';
import { validation } from '../utils/validation';
import { REGISTRATION_VALIDATION } from '../validation/registration';
import { lazy } from '../annotations/inversify';
import routeConfig from '../router';
import BaseScreenDefault from './base/base-scene';
import UiBlockBasic from '../components/ui/block/basic';
export default class RegistrationScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.emailChanged = (text) => {
            this.setErrors({});
            this.saveEmail(text);
        };
        this.passwordChanged = (text) => {
            this.setErrors({});
            this.savePassword(text);
        };
        this.repeatPasswordChanged = (text) => {
            this.setErrors({});
            this.saveRepeatPassword(text);
        };
        this.nextPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateForm();
                yield this.createAccount(this.state.email, this.state.password);
                this.navigateToConfirmation();
            }
            catch (error) {
                console.log(error);
                this.setErrors(error);
            }
        });
        this.emailInfoPressed = () => {
            this.showEmailInfo();
        };
        this.modalEmailClosePressed = () => {
            this.hideEmailInfo();
        };
        this.passwordInfoPressed = () => {
            this.showPasswordInfo();
        };
        this.modalPasswordClosePressed = () => {
            this.hidePasswordInfo();
        };
        this.toLoginPressed = () => {
            this.navigateToLogin();
        };
        this.showEmailInfo = () => {
            this.setSpecState('showEmailInfoModal', true);
        };
        this.hideEmailInfo = () => {
            this.setSpecState('showEmailInfoModal', false);
        };
        this.showPasswordInfo = () => {
            this.setSpecState('showPasswordInfoModal', true);
        };
        this.hidePasswordInfo = () => {
            this.setSpecState('showPasswordInfoModal', false);
        };
        this.validateForm = () => {
            this.setErrors({});
            const errors = validation(this.state, REGISTRATION_VALIDATION);
            if (errors) {
                throw errors;
            }
        };
        this.saveEmail = (email) => {
            this.setSpecState('email', email);
        };
        this.savePassword = (password) => {
            this.setSpecState('password', password);
        };
        this.saveRepeatPassword = (repeatPassword) => {
            this.setSpecState('repeatPassword', repeatPassword);
        };
        this.navigateToLogin = () => {
            this.props.navigation.navigate(routeConfig.login.name);
        };
        this.navigateToConfirmation = () => {
            this.props.navigation.navigate(routeConfig.registrationConfirmation.name, {
                email: this.state.email,
                password: this.state.password
            });
        };
        this.createAccount = (email, password) => {
            console.log(email, password);
            return this.accountService.createNew(email, password);
        };
        this.setErrors = (errors) => {
            this.setSpecState('error', errors);
        };
        this.state = Object.assign({}, this.state, { email: '', password: '', repeatPassword: '', error: {}, showEmailInfoModal: false, showPasswordInfoModal: false });
    }
    render() {
        const { email, password, repeatPassword, error } = this.state;
        const formFilled = email || password || repeatPassword;
        const anyError = error.email || error.password || error.repeatPassword;
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(UiBlockBasic, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(KeyboardAvoidingView, { behavior: "position", keyboardVerticalOffset: 43 },
                    React.createElement(Text, { style: styles.greeting }, i18n.t('registration.greeting')),
                    React.createElement(View, null,
                        React.createElement(Input, { placeholder: i18n.t('common.placeholder.email'), keyboardType: 'email-address', autoCapitalize: 'none', value: this.state.email, onChangeText: this.emailChanged, showInfo: true, textColor: error.email ? 'rgb(213, 0, 0)' : undefined, baseColor: error.email ? 'rgb(213, 0, 0)' : undefined, onInfoPress: this.emailInfoPressed }),
                        this.state.email.length !== 0 ?
                            React.createElement(TouchableOpacity, { style: [styles.clearIconWrapper, { right: 30 }], onPress: () => {
                                    this.emailChanged('');
                                } },
                                React.createElement(IOSCLearIcon, { style: { fontSize: 30 }, name: "close-o" }))
                            : null),
                    React.createElement(View, null,
                        React.createElement(Input, { placeholder: i18n.t('common.placeholder.password'), secureTextEntry: true, onChangeText: this.passwordChanged, showInfo: true, value: this.state.password, textColor: error.password ? 'rgb(213, 0, 0)' : undefined, baseColor: error.password ? 'rgb(213, 0, 0)' : undefined, onInfoPress: this.passwordInfoPressed }),
                        this.state.password.length !== 0 ?
                            React.createElement(TouchableOpacity, { style: [styles.clearIconWrapper, { right: 30 }], onPress: () => {
                                    this.passwordChanged('');
                                } },
                                React.createElement(IOSCLearIcon, { style: { fontSize: 30 }, name: "close-o" }))
                            : null),
                    React.createElement(View, null,
                        React.createElement(Input, { placeholder: i18n.t('common.placeholder.passwordConfirm'), secureTextEntry: true, value: this.state.repeatPassword, textColor: error.repeatPassword ? 'rgb(213, 0, 0)' : undefined, baseColor: error.repeatPassword ? 'rgb(213, 0, 0)' : undefined, onChangeText: this.repeatPasswordChanged }),
                        this.state.repeatPassword.length !== 0 ?
                            React.createElement(TouchableOpacity, { style: styles.clearIconWrapper, onPress: () => {
                                    this.repeatPasswordChanged('');
                                } },
                                React.createElement(IOSCLearIcon, { style: { fontSize: 30 }, name: "close-o" }))
                            : null))),
            anyError ? (React.createElement(View, { style: styles.bottom },
                React.createElement(Text, { style: [styles.messageContainer, styles.errorText] }, formFilled ? anyError.join('\n') : i18n.t('registration.error.form')),
                React.createElement(UiBlockSpace, { height: 10 }))) : (React.createElement(View, { style: styles.bottom },
                React.createElement(Text, { style: [styles.messageContainer, styles.messageText] }, i18n.t('registration.passwordRequirements')),
                React.createElement(UiBlockSpace, { height: 10 }))),
            React.createElement(ModalWindow, { visible: this.state.showEmailInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.modalEmailClosePressed }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, i18n.t('registration.modal.email')),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, i18n.t('registration.modal.emailMessage')),
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(ModalLeftBtn, { onPress: this.modalEmailClosePressed }, i18n.t('common.buttons.close')))),
            React.createElement(ModalWindow, { visible: this.state.showPasswordInfoModal },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.modalPasswordClosePressed }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, i18n.t('registration.modal.password')),
                    React.createElement(UiBlockSpace, null),
                    React.createElement(ModalWindowText, null, i18n.t('registration.modal.passwordMessage')),
                    React.createElement(UiBlockSpace, { height: 100 }),
                    React.createElement(ModalLeftBtn, { onPress: this.modalPasswordClosePressed }, i18n.t('common.buttons.close')))),
            React.createElement(View, { style: styles.bottom },
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(NavigationTextButtonBlue, { onPress: this.toLoginPressed }, i18n.t('common.buttons.login')),
                            React.createElement(NavigationTextButtonWhite, { onPress: this.nextPressed }, i18n.t('common.buttons.next'))))))));
    }
}
RegistrationScreen.navigationOptions = {
    header: React.createElement(DefaultHeader, null)
};
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], RegistrationScreen.prototype, "accountService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        height: '67%'
    },
    errorText: {
        color: 'rgb(213, 0, 0)',
        fontWeight: 'bold'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    messageContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    messageText: {
        color: 'rgb(171, 171, 171)',
        fontSize: 14,
        fontWeight: 'bold'
    },
    greeting: {
        color: 'rgb(46, 46, 46)',
        fontSize: 26,
        fontWeight: '300'
    },
    clearIconWrapper: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 5,
        bottom: 12
    }
});
//# sourceMappingURL=registration.js.map