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
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges';
import NavigationTextButtonBlue from '../../../components/global/bottom-navigation/text-button-blue';
import NavigationTextButtonWhite from '../../../components/global/bottom-navigation/text-button-white';
import i18n from '../../../locales/i18n';
import UiBlockBasic from '../../../components/ui/block/basic';
import DefaultHeader from '../../../components/global/default-header';
import UiBlockLeft from '../../../components/ui/block/left';
import UiBlockSpace from '../../../components/ui/block/space';
import Input from '../../../components/input';
import TextNormal from '../../../components/global/text/basic/text-normal';
import TextBold from '../../../components/global/text/basic/text-bold';
import SetupFriendProfileValues from '../../../components/profile/setup/profile-friend-values';
import SetupFlirtProfileValues from '../../../components/profile/setup/profile-flirt-values';
import SetupFunProfileValues from '../../../components/profile/setup/profile-fun-values';
import MuslImagePicker from '../../../utils/musl-image-picker';
import routeConfig from '../../../router';
import ProfileSetupProcessIndicator from '../../../components/profile/setup/process-indicator';
import { MediaService } from '../../../services/media';
import { lazy } from '../../../annotations/inversify';
import BaseScreenDefault from '../../base/base-scene';
import { ProfileService } from '../../../services/profile';
import NavigateWithResetToProfileHub from '../../base/navigate-with-reset-to-profile-hub';
import { mixin } from '../../../annotations/common';
import AdBannerCommunityHorizontal from '../../../components/ad/banner-community-horisontal';
let SetupProfileScreen = class SetupProfileScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.nameChanged = (name) => {
            this.saveName(name);
        };
        this.selectUserImageButtonPress = () => {
            this.pickImage();
        };
        this.backButtonPress = () => {
            this.navigateToBack();
        };
        this.nextButtonPress = () => {
            if (this.state.mediaIsForbidden || !this.state.media) {
                return;
            }
            this.createProfile()
                .then(profile => this.navigateToProfileDetails(profile))
                .catch(() => this.setSpecState('mediaIsForbidden', true));
        };
        this.createProfile = () => {
            this.setSpecState('mediaIsForbidden', false);
            return this.profileService.createNew(this.state.name, this.state.media, this.state.profileType);
        };
        this.pickImage = () => {
            this.muslImagePicker.pickImage(this.setUserImage, {
                width: 1000,
                height: 1000,
                cropping: true
            });
        };
        this.saveName = (name) => {
            this.setSpecState('name', name);
        };
        // private setUserImage = async (images: PickerImage[]) => {
        //   const image = images[0]
        //   try {
        //     const media = await this.mediaUpload(image.path)
        //     if (media) {
        //       this.setSpecState('userImage', {
        //         uri: media.mediaUrl
        //       })
        //       this.setSpecState('profileComplete', 0.5)
        //       this.setSpecState('media', media)
        //       this.setSpecState('mediaIsForbidden', false)
        //     }
        //   } catch (error) {
        //     this.setSpecState('mediaIsForbidden', true)
        //   }
        // }
        this.setUserImage = (images) => __awaiter(this, void 0, void 0, function* () {
            const image = images[0];
            console.log('imgggg');
            console.log(image);
            try {
                const media = yield this.mediaUpload(image.path);
                console.log('mdiaaaa');
                console.log(media);
                if (media) {
                    this.setSpecState('userImage', {
                        uri: media.mediaUrl
                    });
                    this.setSpecState('profileComplete', 0.5);
                    this.setSpecState('media', media);
                    this.setSpecState('mediaIsForbidden', false);
                }
            }
            catch (error) {
                console.log('errrorrrr');
                console.log(error);
                this.setSpecState('mediaIsForbidden', true);
            }
        });
        this.mediaUpload = (file) => {
            return this.mediaService.createNew(file);
        };
        this.navigateToBack = () => {
            this.props.navigation.goBack();
        };
        this.navigateToProfileDetails = (profile) => {
            this.navigateWithResetToProfileHub(routeConfig.setupProfileDetails.name, {
                profile,
                firstLaunch: true
            });
        };
        const { type } = this.props.navigation.state.params;
        this.state = Object.assign({}, this.state, { name: '', profileType: type, profileComplete: 0.1, mediaIsForbidden: false });
        // todo: refactor in favor of strategy
        if (this.state.profileType === 'FLIRT') {
            this.profileScreenValues = new SetupFlirtProfileValues();
        }
        else if (this.state.profileType === 'FUN') {
            this.profileScreenValues = new SetupFunProfileValues();
        }
        else {
            this.profileScreenValues = new SetupFriendProfileValues();
        }
        this.muslImagePicker = new MuslImagePicker();
    }
    get profileLabel() {
        return this.profileScreenValues.getProfileLabel();
    }
    get screenTitle() {
        return this.profileScreenValues.getScreenTitle();
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, null,
                React.createElement(StatusBar, { barStyle: "light-content" }),
                React.createElement(View, { style: styles.bannerContainer },
                    React.createElement(AdBannerCommunityHorizontal, null)),
                React.createElement(UiBlockBasic, { style: styles.content },
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(ProfileSetupProcessIndicator, { profileComplete: this.state.profileComplete, profileLabel: this.profileLabel, profileText: this.screenTitle }),
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(Input, { placeholder: i18n.t('profile.setup.nameInputPlaceholder'), onChangeText: this.nameChanged, maxLength: 16 }),
                    React.createElement(UiBlockSpace, { height: 20 }),
                    React.createElement(TextNormal, { style: styles.profilePictureTitle }, i18n.t('profile.setup.profilePicture')),
                    React.createElement(UiBlockBasic, null,
                        React.createElement(UiBlockLeft, null,
                            this.state.userImage ? (React.createElement(View, { style: styles.userImageContainer },
                                React.createElement(View, { style: styles.userImageTemplate },
                                    React.createElement(Image, { style: styles.userImage, resizeMode: 'cover', source: this.state.userImage })),
                                React.createElement(View, { style: styles.userImageLabelTemplate },
                                    React.createElement(Image, { style: styles.userImageLabel, source: this.profileLabel })))) : (React.createElement(View, { style: styles.userImageContainer },
                                React.createElement(Image, { style: styles.userImagePlaceholder, resizeMode: 'cover', source: this.profileLabel }))),
                            React.createElement(UiBlockVerticalCenter, null,
                                React.createElement(UiBlockBasic, { style: styles.profilePictureControls },
                                    this.state.userImage ? null : (React.createElement(TextNormal, { style: styles.addPictureTitle }, i18n.t('profile.setup.addPhoto'))),
                                    React.createElement(UiBlockSpace, { height: 5 }),
                                    React.createElement(UiBlockLeft, null,
                                        React.createElement(TouchableOpacity, { onPress: this.selectUserImageButtonPress }, this.state.userImage ? (React.createElement(TextNormal, { style: styles.changeImageButton }, "Change")) : (React.createElement(Image, { source: require('Musl/images/profile/btn-camera.png') })))))))),
                    React.createElement(UiBlockSpace, { height: 15 }),
                    React.createElement(TextBold, { style: styles.notification }, i18n.t('profile.setup.pictureNotification')),
                    this.state.mediaIsForbidden ? (React.createElement(View, null,
                        React.createElement(UiBlockSpace, { height: 7 }),
                        React.createElement(TextBold, { style: styles.error }, i18n.t('profile.setup.error.pictureError')))) : null,
                    React.createElement(UiBlockSpace, { height: 20 }))),
            React.createElement(BottomNavigationPanel, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(NavigationTextButtonBlue, { onPress: this.backButtonPress }, i18n.t('common.buttons.back')),
                        React.createElement(NavigationTextButtonWhite, { onPress: this.nextButtonPress, disabled: !this.state.userImage || !this.state.name }, i18n.t('common.buttons.next')))))));
    }
};
SetupProfileScreen.navigationOptions = {
    header: React.createElement(DefaultHeader, null)
};
__decorate([
    lazy('MediaService'),
    __metadata("design:type", MediaService)
], SetupProfileScreen.prototype, "mediaService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], SetupProfileScreen.prototype, "profileService", void 0);
SetupProfileScreen = __decorate([
    mixin([NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], SetupProfileScreen);
export default SetupProfileScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    content: {
        paddingLeft: 25,
        paddingRight: 25
    },
    processText: {
        fontSize: 30,
        paddingLeft: 15
    },
    processLabel: {
        width: 47,
        height: 47
    },
    profilePictureTitle: {
        color: '#000',
        fontSize: 20
    },
    profilePictureControls: {
        paddingLeft: 20
    },
    userImageContainer: {
        paddingTop: 15
    },
    userImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    userImage: {
        width: 140,
        height: 140,
        borderRadius: 70
    },
    userImageTemplate: {
        width: 154,
        height: 154,
        borderRadius: 77,
        backgroundColor: '#5E9CD3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageLabel: {
        width: 47,
        height: 47
    },
    userImageLabelTemplate: {
        position: 'absolute',
        left: -5,
        top: 5,
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeImageButton: {
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 30,
        paddingBottom: 30,
        color: '#5E9CD3',
        fontSize: 20
    },
    addPictureTitle: {
        fontSize: 16,
        color: '#808183'
    },
    notification: {
        color: '#ABABAB',
        fontSize: 14,
        lineHeight: 19
    },
    error: {
        color: '#D9242B',
        fontSize: 14,
        lineHeight: 19
    },
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});
//# sourceMappingURL=setup-profile-screen.js.map