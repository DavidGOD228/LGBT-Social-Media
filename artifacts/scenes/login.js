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
import { Keyboard, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import IOSCLearIcon from 'react-native-vector-icons/EvilIcons';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import UiBlockSpace from '../components/ui/block/space';
import Input from '../components/input';
import NavigationTextButtonBlue from '../components/global/bottom-navigation/text-button-blue';
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white';
import i18n from '../locales/i18n';
import { AccountService } from '../services/account';
import { lazy } from '../annotations/inversify';
import routeConfig from '../router';
import { NavigationActions } from 'react-navigation';
import { LOGIN_VALIDATION } from '../validation/login';
import { validation } from '../utils/validation';
import BaseScreenDefault from './base/base-scene';
import NavigateToProfileHub from './base/navigate-to-profile-hub';
import { mixin } from '../annotations/common';
import ModalWindowTitle from '../components/modal/modal-window-title';
import ModalWindowContent from '../components/modal/modal-window-content';
import ModalCloseBtn from '../components/modal/modal-close-btn';
import ModalWindow from '../components/modal/modal-window';
import ButtonBlue from '../components/global/button-blue';
import ModalWindowText from '../components/modal/modal-window-text';
let LoginScreen = class LoginScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.emailChanged = (email) => {
            this.saveEmail(email);
        };
        this.resetPasswordChanged = (email) => {
            this.saveResetEmail(email);
        };
        this.passwordChanged = (password) => {
            this.savePassword(password);
        };
        this.loginButtonPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateForm();
                yield this.login(this.state.email, this.state.password);
                this.hideKeyboard();
                // this.checkForLocationPermission()
                this.navigateToProfileHub();
            }
            catch (error) {
                this.setErrors(error);
            }
        });
        this.checkForLocationPermission = () => __awaiter(this, void 0, void 0, function* () {
            const locationStatus = yield this.accountService.isLocationPermissionDenied();
            if (locationStatus === 'denied' || locationStatus === 'serviceTurnedOff') {
                this.navigateToSettings('locationPermission', locationStatus);
            }
            // this.navigateToProfileHub()
        });
        this.backButtonPressed = () => {
            this.navigateToRegistration();
        };
        this.resetButtonPressed = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.resetPassword(this.state.resetEmail);
                this.setSpecState('reset', true);
            }
            catch (error) {
                const parsedError = yield error.json();
                this.setSpecState('error', Object.assign({}, this.state.error, { resetEmail: parsedError.errors.Error }));
            }
        });
        this.navigateToRegistration = () => {
            this.props.navigation.navigate(routeConfig.registration.name);
        };
        this.hideKeyboard = () => {
            Keyboard.dismiss();
        };
        this.login = (email, password) => {
            return this.accountService.login(email, password);
        };
        this.validateForm = () => {
            const errors = validation(this.state, LOGIN_VALIDATION);
            if (errors) {
                throw errors;
            }
        };
        this.saveEmail = (email) => {
            this.setSpecState('email', email);
        };
        this.saveResetEmail = (email) => {
            const errors = validation({ emailReset: email }, {
                emailReset: {
                    email: {
                        message: `^${i18n.t('registration.error.emailText')}`
                    },
                    presence: true
                }
            });
            if (errors) {
                this.setSpecState('error', errors);
            }
            this.setSpecState('resetEmail', email);
        };
        this.resetPassword = (email) => {
            return this.accountService.resetPassword(email);
        };
        this.savePassword = (password) => {
            this.setSpecState('password', password);
        };
        this.setErrors = (errors) => {
            this.setSpecState('error', errors);
        };
        this.toggleShowResetPassword = () => {
            this.setSpecState('reset', false);
            this.setSpecState('showResetPassword', !this.state.showResetPassword);
        };
        this.state = Object.assign({}, this.state, { email: '', password: '', error: {}, showResetPassword: false, reset: false, resetEmail: '' });
    }
    componentDidMount() {
        this.checkForLocationPermission();
    }
    navigateToSettings(routeName, locationStatus) {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                    routeName,
                    params: { status: locationStatus }
                })],
            key: null
        }));
    }
    render() {
        const { email, password, error } = this.state;
        const formFilled = email || password;
        const anyError = error.email || error.password || error.server;
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(KeyboardAvoidingView, { style: styles.content, behavior: "position", keyboardVerticalOffset: -40 },
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(Text, { style: styles.title }, "Login"),
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(View, { style: { position: 'relative' } },
                    React.createElement(Input, { placeholder: i18n.t('common.placeholder.email'), keyboardType: 'email-address', autoCapitalize: 'none', value: this.state.email, textColor: error.email ? 'rgb(213, 0, 0)' : undefined, baseColor: error.email ? 'rgb(213, 0, 0)' : undefined, onChangeText: this.emailChanged }),
                    this.state.email.length !== 0 ?
                        React.createElement(TouchableOpacity, { style: styles.clearIconWrapper, onPress: () => {
                                this.emailChanged('');
                            } },
                            React.createElement(IOSCLearIcon, { style: { fontSize: 30 }, name: "close-o" }))
                        : null),
                React.createElement(View, null,
                    React.createElement(Input, { placeholder: i18n.t('common.placeholder.password'), secureTextEntry: true, value: this.state.password, textColor: error.password ? 'rgb(213, 0, 0)' : undefined, baseColor: error.password ? 'rgb(213, 0, 0)' : undefined, onChangeText: this.passwordChanged }),
                    this.state.password.length !== 0 ?
                        React.createElement(TouchableOpacity, { style: styles.clearIconWrapper, onPress: () => {
                                this.passwordChanged('');
                            } },
                            React.createElement(IOSCLearIcon, { style: { fontSize: 30 }, name: "close-o" }))
                        : null),
                React.createElement(View, null,
                    React.createElement(Text, { style: [styles.forgotPasswordText], onPress: this.toggleShowResetPassword }, i18n.t('login.resetPassword.caption')),
                    React.createElement(UiBlockSpace, { height: 20 }))),
            anyError ? (React.createElement(View, { style: styles.bottom },
                React.createElement(Text, { style: [styles.messageContainer, styles.errorText] }, formFilled ? anyError.join('\n') : i18n.t('registration.error.form')),
                React.createElement(UiBlockSpace, { height: 20 }))) : null,
            React.createElement(View, { style: styles.bottom },
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(NavigationTextButtonBlue, { onPress: this.backButtonPressed }, i18n.t('common.buttons.registration')),
                            React.createElement(NavigationTextButtonWhite, { onPress: this.loginButtonPressed }, i18n.t('common.buttons.login')))))),
            React.createElement(ModalWindow, { visible: this.state.showResetPassword },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(ModalCloseBtn, { onPress: this.toggleShowResetPassword }),
                React.createElement(UiBlockSpace, { height: 80 }),
                React.createElement(ModalWindowContent, null,
                    React.createElement(ModalWindowTitle, null, i18n.t('login.resetPassword.modal.title')),
                    React.createElement(UiBlockSpace, null),
                    this.state.reset ? (React.createElement(View, null,
                        React.createElement(ModalWindowText, null, i18n.t('login.resetPassword.modal.successDesc')),
                        React.createElement(UiBlockSpace, null),
                        React.createElement(ButtonBlue, { onPress: this.toggleShowResetPassword }, i18n.t('login.resetPassword.modal.closeButton')))) : (React.createElement(View, null,
                        React.createElement(ModalWindowText, null, i18n.t('login.resetPassword.modal.desc')),
                        error.resetEmail && (React.createElement(Text, { style: {
                                color: 'red',
                                fontSize: 18
                            } }, error.resetEmail)),
                        React.createElement(View, null,
                            React.createElement(Input, { placeholder: i18n.t('common.placeholder.email'), keyboardType: 'email-address', autoCapitalize: 'none', value: this.state.resetEmail, textColor: error.resetEmail ? 'rgb(213, 0, 0)' : 'rgb(255, 255, 255)', baseColor: error.resetEmail ? 'rgb(213, 0, 0)' : 'rgb(255, 255, 255)', onChangeText: this.resetPasswordChanged }),
                            this.state.resetEmail.length !== 0 ?
                                React.createElement(TouchableOpacity, { style: styles.clearIconWrapper, onPress: () => {
                                        this.resetPasswordChanged('');
                                    } },
                                    React.createElement(IOSCLearIcon, { style: { fontSize: 30, color: '#fff' }, name: "close-o" }))
                                : null),
                        React.createElement(UiBlockSpace, null),
                        React.createElement(ButtonBlue, { onPress: this.resetButtonPressed }, i18n.t('login.resetPassword.modal.button'))))))));
    }
};
LoginScreen.navigationOptions = {
    header: React.createElement(DefaultHeader, null)
};
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], LoginScreen.prototype, "accountService", void 0);
LoginScreen = __decorate([
    mixin([NavigateToProfileHub]),
    __metadata("design:paramtypes", [Object])
], LoginScreen);
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        height: '75%'
    },
    title: {
        color: 'rgb(46, 46, 46)',
        fontSize: 30,
        fontWeight: '300'
    },
    messageContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    errorText: {
        color: 'rgb(213, 0, 0)',
        fontWeight: 'bold'
    },
    forgotPasswordText: {
        color: 'rgb(93, 164, 229)',
        fontSize: 19,
        marginTop: 5
    },
    clearIconWrapper: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 5,
        bottom: 12
    }
});
//# sourceMappingURL=login.js.map