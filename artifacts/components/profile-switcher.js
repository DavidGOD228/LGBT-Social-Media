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
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockHorizontal from './ui/block/horizontal';
import { ProfileService } from '../services/profile';
import { lazy } from '../annotations/inversify';
import { mixin } from '../annotations/common';
import NavigateToProfileHub from '../scenes/base/navigate-to-profile-hub';
import { LocalSettingsService } from '../services/local-settings';
import { EVENTS } from '../configs/dicts';
import eventEmitter from '../utils/event-emitter';
const profilesTypes = [
    {
        type: 'FRIEND',
        icon: require('Musl/images/global/icon-friend.png')
    },
    {
        type: 'FLIRT',
        icon: require('Musl/images/global/icon-flirt.png')
    },
    {
        type: 'FUN',
        icon: require('Musl/images/global/icon-fun.png')
    }
];
let ProfileSwitcher = class ProfileSwitcher extends Component {
    constructor(props) {
        super(props);
        this.profileSwitcherPressed = (profileType) => () => __awaiter(this, void 0, void 0, function* () {
            yield this.switchProfile(profileType);
            this.syncActiveProfile();
            this.toggleList();
            eventEmitter.emit(EVENTS.activeProfileSelected, null);
            this.navigateToProfileHub();
        });
        this.getActiveProfile = () => {
            return this.profileService.getActive();
        };
        this.getAllProfile = () => {
            return this.profileService.getForCurrent();
        };
        this.switchProfile = (profileType) => {
            return this.profileService.activateByType(profileType);
        };
        this.toggleList = () => {
            this.setState(prevState => (Object.assign({}, prevState, { showAllProfiles: !this.state.showAllProfiles })));
        };
        this.syncActiveProfile = () => {
            const mayBeActiveProfile = this.getActiveProfile();
            const activeProfile = profilesTypes.find(it => mayBeActiveProfile ? it.type === mayBeActiveProfile.profileType.code : false);
            this.setState(prevState => (Object.assign({}, prevState, { activeProfile })));
        };
        this.state = Object.assign({}, this.state, { showAllProfiles: false, profileList: [], useAvatars: false });
        this.getAllProfile()
            .then(profiles => {
            return profilesTypes.map(profileType => {
                const profile = profiles.find(it => it.profileType.code === profileType.type);
                if (profile) {
                    profileType['avatar'] = profile.avatar;
                }
                return profileType;
            });
        })
            .then(profileList => this.setState(prevState => (Object.assign({}, prevState, { profileList }))))
            .then(() => this.syncActiveProfile())
            .catch(error => console.error(error));
        this.localSettingsService.isPhotosInSwitcherTurnedOn()
            .then(value => {
            this.setState(Object.assign({}, this.state, { useAvatars: value }));
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.usePhotos !== this.state.useAvatars) {
            this.localSettingsService.isPhotosInSwitcherTurnedOn()
                .then(value => {
                this.setState(Object.assign({}, this.state, { useAvatars: value }));
            });
        }
    }
    render() {
        const content = this.state.showAllProfiles ? (React.createElement(View, { style: { marginTop: 5 } },
            React.createElement(UiBlockHorizontal, null, this.state.profileList.map(profile => (React.createElement(TouchableOpacity, { onPress: this.profileSwitcherPressed(profile.type), style: { paddingRight: 5 }, key: profile.type }, this.state.useAvatars ? (React.createElement(Image, { style: [
                    styles.avatar,
                    (this.state.activeProfile && profile.type === this.state.activeProfile.type) ? styles.face : undefined
                ], source: profile['avatar'] })) : (React.createElement(Image, { style: [
                    styles.avatar,
                    (this.state.activeProfile && profile.type === this.state.activeProfile.type) ? styles.face : undefined
                ], source: profile.icon })))))))) : (this.state.activeProfile ? (React.createElement(TouchableOpacity, { onPress: this.toggleList, style: { marginTop: 5 } },
            React.createElement(UiBlockHorizontal, null,
                this.state.useAvatars ? (React.createElement(Image, { style: styles.avatar, source: this.state.activeProfile['avatar'] })) : (React.createElement(Image, { style: styles.avatar, source: this.state.activeProfile.icon })),
                this.state.profileList.length > 1 ? (React.createElement(Image, { source: require('Musl/images/global/menu-lines-two.png'), style: styles.facesOverlay })) : null))) : null);
        return React.createElement(View, null, content);
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ProfileSwitcher.prototype, "profileService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], ProfileSwitcher.prototype, "localSettingsService", void 0);
ProfileSwitcher = __decorate([
    mixin([NavigateToProfileHub]),
    __metadata("design:paramtypes", [Object])
], ProfileSwitcher);
export default ProfileSwitcher;
const styles = StyleSheet.create({
    facesOverlay: {
        right: 5
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27
    },
    face: {
        borderColor: '#AACFF8',
        borderWidth: 3
    }
});
//# sourceMappingURL=profile-switcher.js.map