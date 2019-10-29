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
import React, { Component } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import ActionItem from './action-item';
import routeConfig from '../router';
import NavigateToProfileHub from '../scenes/base/navigate-to-profile-hub';
import { mixin } from '../annotations/common';
import NavigateWithResetToProfileHub from '../scenes/base/navigate-with-reset-to-profile-hub';
import { lazy } from '../annotations/inversify';
import NCView from './global/non-clipping-view';
import { ProfileService } from '../services/profile';
import { RabbitCredentialService } from '../services/rabbit-credential';
let ActionListButton = class ActionListButton extends Component {
    constructor(props) {
        super(props);
        this.initialize = () => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.hasProfiles())) {
                this.setState(Object.assign({}, this.state, { hasProfiles: false }));
                return;
            }
            else {
                this.setState(Object.assign({}, this.state, { hasProfiles: true }));
            }
            const counterStats = yield this.profileService.getStats();
            this.setState(it => (Object.assign({}, it, { stats: counterStats })));
        });
        this.hasProfiles = () => __awaiter(this, void 0, void 0, function* () {
            const profiles = yield this.profileService.getForCurrent();
            return profiles && profiles.length;
        });
        this.toggleList = () => {
            this.setState(Object.assign({}, this.state, { showActionList: !this.state.showActionList }));
        };
        this.navigateTo = (route) => () => {
            this.toggleList();
            if (route === routeConfig.profileHub.name) {
                this.navigateToProfileHub();
            }
            else {
                this.navigateWithResetToProfileHub(route);
            }
        };
        this.syncCounters = () => __awaiter(this, void 0, void 0, function* () {
            const counterStats = yield this.profileService.getStats();
            this.setState(it => (Object.assign({}, it, { stats: counterStats })));
        });
        this.state = {
            showActionList: false,
            hasProfiles: false
        };
        this.initialize();
    }
    componentDidMount() {
        this.rabbitCredentialService.onReady(service => service.subscribe('NEW_NOTIFICATION', this.syncCounters)
            .then(it => this.setState(Object.assign({}, this.state, { subscription: it }))));
    }
    componentWillUnmount() {
        if (this.state.subscription) {
            this.state.subscription.unsubscribe();
        }
    }
    render() {
        return this.state.hasProfiles ? React.createElement(View, { style: { marginTop: 4 } },
            React.createElement(TouchableOpacity, { onPress: this.toggleList },
                React.createElement(Image, { source: require('Musl/images/global/btn-menu.png') })),
            React.createElement(Modal, { transparent: true, visible: this.state.showActionList, onRequestClose: this.toggleList },
                React.createElement(TouchableOpacity, { activeOpacity: 1, style: styles.overlay, onPress: this.toggleList },
                    React.createElement(View, { style: styles.modalWindow },
                        React.createElement(TouchableOpacity, { style: styles.closeBtn, onPress: this.toggleList },
                            React.createElement(Image, { source: require('Musl/images/global/btn-close.png') })),
                        React.createElement(NCView, { style: styles.actionsContainer },
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.notifications.name), actionImage: require('Musl/images/global/icon-notifications.png'), counter: this.state.stats ? this.state.stats.totalUnreadNotifications : 0 }, "Notifications"),
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.messages.name), actionImage: require('Musl/images/global/icon-messages.png'), counter: this.state.stats ? this.state.stats.totalUnreadMessages : 0 }, "Messages"),
                            React.createElement(View, { style: {
                                    height: 1,
                                    alignSelf: 'stretch',
                                    backgroundColor: 'grey',
                                    marginBottom: 20
                                } }),
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.profileHub.name), actionImage: require('Musl/images/global/icon-profiles.png') }, "My Profiles"),
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.stats.name), actionImage: require('Musl/images/global/icon-stats.png') }, "My Stats"),
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.visibility.name), actionImage: require('Musl/images/global/icon-visibility.png') }, "Visibility"),
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.settings.name), actionImage: require('Musl/images/global/icon-settings.png') }, "Settings"),
                            React.createElement(ActionItem, { onItemClick: this.navigateTo(routeConfig.search.name), actionImage: require('Musl/images/global/icon-search.png') }, "Search"))))))
            : null;
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ActionListButton.prototype, "profileService", void 0);
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], ActionListButton.prototype, "rabbitCredentialService", void 0);
ActionListButton = __decorate([
    mixin([NavigateToProfileHub, NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], ActionListButton);
export default ActionListButton;
const styles = StyleSheet.create({
    modalWindow: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        shadowOpacity: 1.0,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: 'black' // TODO implement correct crossplatform shadow
    },
    overlay: {
        flex: 1
    },
    actionsContainer: {
        paddingBottom: 90,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30
    },
    closeBtn: {
        position: 'absolute',
        right: 15,
        bottom: 8
    }
});
//# sourceMappingURL=action-list-button.js.map