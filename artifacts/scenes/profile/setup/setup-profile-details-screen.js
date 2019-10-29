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
import { Animated, Dimensions, Platform, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import DefaultHeader from '../../../components/global/default-header';
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges';
import NavigationTextButtonBlue from '../../../components/global/bottom-navigation/text-button-blue';
import i18n from '../../../locales/i18n';
import NavigationTextButtonWhite from '../../../components/global/bottom-navigation/text-button-white';
import SetupFriendProfileValues from '../../../components/profile/setup/profile-friend-values';
import SetupFunProfileValues from '../../../components/profile/setup/profile-fun-values';
import SetupFlirtProfileValues from '../../../components/profile/setup/profile-flirt-values';
import UiBlockBasic from '../../../components/ui/block/basic';
import UiBlockSpace from '../../../components/ui/block/space';
import CollapsingSection from '../../../components/collapsing-section';
import TextNormal from '../../../components/global/text/basic/text-normal';
import MuslImagePicker from '../../../utils/musl-image-picker';
import BaseScreenDefault from '../../base/base-scene';
import { lazy } from '../../../annotations/inversify';
import { SectionService } from '../../../services/section';
import SectionComponent from './setup-profile-details-screen/section';
import { comparator } from '../../../utils/number';
import { AlbumService } from '../../../services/album';
import { MediaService } from '../../../services/media';
import ProfileImages from '../../../components/profile/setup/profile-images';
import { ProfileDataService } from '../../../services/profile-data';
import NavigateToProfileHub from '../../base/navigate-to-profile-hub';
import { mixin } from '../../../annotations/common';
import ProfileSetupProcessIndicator from '../../../components/profile/setup/process-indicator';
import ProfileHeader from '../../../components/profile/edit/profile-header';
import PopupSlideTop from '../../../components/global/popup/popup-slide-top';
import PopupContent from '../../../components/global/popup/content';
import PopupButton from '../../../components/global/popup/button';
import PopupTwoButtonsContainer from '../../../components/global/popup/two-buttons-container';
import routeConfig from '../../../router';
import { ProfileService } from '../../../services/profile';
import NavigateWithResetToProfileHub from '../../base/navigate-with-reset-to-profile-hub';
import LinkProfileSection from './setup-profile-details-screen/link-profile-section';
import PopupHeader from '../../../components/global/popup/header';
import PopupSlideBottom from '../../../components/global/popup/popup-slide-bottom';
import { LinkedProfileService } from '../../../services/linked-profile';
import { AccountService } from '../../../services/account';
// import ProfileVideo from '../../../components/profile/setup/profile-video'
import VideoClipper from '../../../components/video/video-clipper';
import UiBlockHorizontal from '../../../components/ui/block/horizontal';
import UiBlockSpaceHorizontal from '../../../components/ui/block/space-horizontal';
import { EVENTS } from '../../../configs/dicts';
import eventEmitter from '../../../utils/event-emitter';
import KeyboardAvoidingWrapper from '../../../components/keyboard-avoiding-wrapper';
import { RabbitCredentialService } from '../../../services/rabbit-credential';
var Image = Animated.Image;
import { LocalSettingsService } from "../../../services/local-settings";
let SetupProfileDetailsScreen = class SetupProfileDetailsScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.deleteUserPictureButtonPressed = (albumMedia) => {
            this.setSpecState('showDeletePhotoPopup', true);
            this.setSpecState('albumMedia', albumMedia);
        };
        this.dismissDeleteUserPictureButtonPressed = () => {
            this.setSpecState('showDeletePhotoPopup', false);
        };
        this.confirmDeleteUserPictureButtonPressed = () => {
            this.setSpecState('showDeletePhotoPopup', false);
            this.setSpecState('photoMedia', this.state.photoMedia.filter(it => it !== this.state.albumMedia));
            this.setSpecState('videoMedia', this.state.videoMedia.filter(it => it !== this.state.albumMedia));
            return this.state.albumMedia.deleteRecord();
        };
        this.backButtonPress = () => {
            eventEmitter.emitAsync(EVENTS.editProfileScreenClosed)
                .then(() => this.props.navigation.goBack())
                .catch((error) => {
                console.log(error);
                this.props.navigation.goBack();
            });
        };
        this.nextButtonPress = () => {
            eventEmitter.emitAsync(EVENTS.editProfileScreenClosed)
                .then(() => this.navigateToProfileHub())
                .catch((error) => {
                console.log(error);
                this.navigateToProfileHub();
            });
        };
        this.completeProfile = () => __awaiter(this, void 0, void 0, function* () {
            this.state.profile.set('completed', true);
            yield this.state.profile.save();
            // navigate anyway
            this.navigateToCommunityView();
        });
        this.userImageSelected = (images) => {
            return this.uploadPhoto(images, true);
        };
        this.userVideoSelected = (video) => {
            if (Platform.OS === 'android') {
                this.setState(Object.assign({}, this.state, { videoSource: video, showVideoTrimmer: true }));
            }
            else {
                return this.uploadVideo(video.path)
                    .then(() => {
                    this.updateVideoMedia();
                });
            }
            return;
        };
        this.updateVideoMedia = () => {
            this.getVideos(this.state.profile)
                .then(videoMedia => this.setSpecState('videoMedia', videoMedia));
        };
        this.linkProfileSubmitPressed = (email, nickname) => __awaiter(this, void 0, void 0, function* () {
            console.log('nickname: ' + nickname);
            if (email.length === 0 && nickname.length === 0) {
                return;
            }
            try {
                if (email) {
                    return yield this.showLinkRequestSent((email || '').toLowerCase());
                }
            }
            catch (error) {
                console.log('some error during linking');
            }
            return this.showLinkProfileError();
        });
        this.unlinkProfilePressed = () => {
            this.showUnlinkPopup();
        };
        this.confirmUnlinkProfile = () => {
            this.unlinkProfile();
        };
        this.onLinkedProfilePress = () => {
            this.goToProfile();
        };
        this.onTextInputPressed = () => {
            this.enableTextInput();
        };
        this.onMetricChanged = (type) => {
            this.localSettingsService.setUserMetrics(type);
            this.setSpecState('metricsType', type);
            console.log(type, "METRIC TYPE!!!!!!!");
        };
        this.renderProcessComponent = () => {
            if (this.state.firstLaunch) {
                return (React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockSpace, { height: 30 }),
                    React.createElement(ProfileSetupProcessIndicator, { profileComplete: this.state.profileComplete, profileLabel: this.profileLabel, profileText: this.screenTitle }),
                    React.createElement(UiBlockSpace, { height: 30 })));
            }
            return null;
        };
        this.renderProfileHeader = () => {
            if (!this.state.firstLaunch) {
                return (React.createElement(UiBlockBasic, null,
                    React.createElement(ProfileHeader, { avatar: this.state.profile.avatar, nickName: this.state.profile.nickname, oldName: this.oldName, setTextInputOnFocus: this.onTextInputPressed, nickNameIsEditing: (this.state.nickNameIsEditing), nickNameOnFocus: () => this.setSpecState('keyboardOffset', -140), nickNameChanged: this.setNickName, nickNameOnEndEditing: () => this.unableTextInput(), profileLabel: this.profileScreenValues.getProfileLabel(), avatarPicked: this.setUserImage, mediaIsForbidden: this.state.mediaIsForbidden, onCommunityPress: () => this.navigateToCommunityView(), onMessagesPress: () => this.profileMessagesPressed(), onNotificationsPress: () => this.profileNotificationsPressed(), newMessages: this.state.messages, newNotifications: this.state.notifications }),
                    React.createElement(UiBlockSpace, { height: 20 })));
            }
            return null;
        };
        this.navigateToCommunityView = () => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(this.state.profile);
            eventEmitter.emitAsync(EVENTS.editProfileScreenClosed)
                .then(() => this.navigateWithResetToProfileHub(routeConfig.community.name))
                .catch((error) => {
                console.log(error);
                this.navigateWithResetToProfileHub(routeConfig.community.name);
            });
        });
        this.profileNotificationsPressed = () => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(this.state.profile);
            this.navigateWithResetToProfileHub(routeConfig.notifications.name, {});
        });
        this.profileMessagesPressed = () => __awaiter(this, void 0, void 0, function* () {
            yield this.profileService.activate(this.state.profile);
            this.navigateWithResetToProfileHub(routeConfig.messages.name, {});
        });
        this.syncCounters = () => __awaiter(this, void 0, void 0, function* () {
            const counterStats = yield this.profileService.getStats(this.state.profile.id);
            this.setSpecState('messages', counterStats.totalUnreadMessages);
            this.setSpecState('notifications', counterStats.totalUnreadNotifications);
        });
        this.syncLinkedProfile = () => __awaiter(this, void 0, void 0, function* () {
            const requestLinkedProfile = yield this.linkedProfileService.activeRequest();
            if (requestLinkedProfile) {
                const target = this.linkedProfileService.getOppositeProfileId(requestLinkedProfile);
                const profile = yield this.profileService.getByPrimary(target);
                if (!profile) {
                    throw new Error('no such profile');
                }
                const account = yield this.accountService.getByProfile(profile.id);
                if (!account) {
                    throw new Error('no such account');
                }
                return this.setSpecState('link', Object.assign({}, this.state.link, { requestSent: true, partnerNickname: profile.nickname, partnerEmail: account.email, avatar: profile.avatar, profileId: profile.id }));
            }
            const linkedProfileModel = yield this.linkedProfileService.getProfileLink();
            if (linkedProfileModel) {
                const target = this.linkedProfileService.getOppositeProfileId(linkedProfileModel);
                const profile = yield this.profileService.getByPrimary(target);
                if (!profile) {
                    throw new Error('no such profile');
                }
                return this.setSpecState('link', Object.assign({}, this.state.link, { requestAccepted: true, partnerNickname: profile.nickname, avatar: profile.avatar, profileId: profile.id }));
            }
            return this.setSpecState('link', Object.assign({}, this.state.link, { requestAccepted: false, requestSent: false }));
        });
        this.updateProfileData = (fieldProfileData) => {
            const profileData = this.state.profileData.find((item) => item.id === fieldProfileData.id);
            if (!profileData) {
                this.state.profileData.push(fieldProfileData);
            }
            this.setSpecState('profileData', this.state.profileData.map(item => {
                return item.id === fieldProfileData.id ? fieldProfileData : item;
            }));
        };
        this.extractSectionFieldIds = (subSections) => {
            const fields = subSections.reduce((f, subSection) => {
                return f.concat(subSection.fields);
            }, []);
            return fields.map(field => field.id);
        };
        this.extractProfileFieldIds = (data) => {
            return data.filter(profileData => profileData.fieldValues && profileData.fieldValues.length > 0)
                .reduce((ids, profileData) => {
                ids.push(profileData.field.id);
                return ids;
            }, []);
        };
        this.getMediaSectionCompleted = () => {
            return (this.state.photoMedia && this.state.photoMedia.length > 0) ||
                (this.state.videoMedia && this.state.videoMedia.length > 0);
        };
        this.getSectionCompleted = (subSections, profileDataItems) => {
            const profileFieldsIds = this.extractProfileFieldIds(profileDataItems);
            const sectionFields = this.extractSectionFieldIds(subSections);
            if (profileFieldsIds.length === 0) {
                return false;
            }
            return sectionFields.some((id) => {
                return this.fieldHasPositiveValue(profileDataItems, profileFieldsIds, id);
            });
        };
        this.fieldHasPositiveValue = (profileDataItems, profileFieldIds, fieldId) => {
            const valExists = profileFieldIds.indexOf(fieldId) >= 0;
            if (!valExists) {
                return false;
            }
            if (this.textIsEmpty(profileDataItems, fieldId)) {
                return false;
            }
            if (!this.radioButtonTurnedOn(profileDataItems, fieldId)) {
                return false;
            }
            return true;
        };
        this.textIsEmpty = (profileDataItems, fieldId) => {
            const profileDataItem = profileDataItems.find(item => item.field.id === fieldId);
            if (profileDataItem && !profileDataItem.fieldValues[0].value.trim().length) {
                return true;
            }
            return false;
        };
        this.radioButtonTurnedOn = (profileDataItems, fieldId) => {
            const profileDataItem = profileDataItems.find(item => item.field.id === fieldId);
            if (profileDataItem && ['false', 'true'].indexOf(profileDataItem.fieldValues[0].value) !== -1) {
                return false;
            }
            return true;
            // IGNORING PRE-FILLED RADIOBUTTONS. (CURRENTLY ALL)
            // const profileDataItem = profileDataItems.find(item => item.field.id === fieldId)
            // if (profileDataItem && profileDataItem.fieldValues[0].value === 'false') {
            //   return false
            // }
            // return true
        };
        this.uploadPhoto = (images, isAlbum) => __awaiter(this, void 0, void 0, function* () {
            const image = images[0];
            this.setState({ showSpinner: true });
            const media = yield this.mediaUpload(image.path, isAlbum);
            if (media) {
                const albumMedia = yield this.albumService.addMediaTo(this.state.photoAlbum, media);
                this.setSpecState('photoMedia', [...this.state.photoMedia, albumMedia]);
                this.setState({ showSpinner: false });
            }
        });
        this.uploadVideo = (videoUri) => __awaiter(this, void 0, void 0, function* () {
            const media = yield this.mediaService.createNewVideo(videoUri);
            if (media) {
                const albumMedia = yield this.albumService.addMediaTo(this.state.videoAlbum, media);
                this.setSpecState('photoMedia', [...this.state.photoMedia, albumMedia]);
            }
            return videoUri;
        });
        this.mediaUpload = (file, isAlbum) => {
            return this.mediaService.createNew(file, isAlbum);
        };
        this.getSections = (profile) => {
            return this.sectionService.getAllByProfileTypeCode(profile.profileType.code);
        };
        this.getPhotos = (profile) => {
            return this.albumService.getPhotoForProfile(profile.id)
                .then(album => {
                this.setSpecState('photoAlbum', album);
                return this.albumService.getMediasFrom(album);
            });
        };
        this.getVideos = (profile) => {
            return this.albumService.getVideoForProfile(profile.id)
                .then(album => {
                this.setSpecState('videoAlbum', album);
                return this.albumService.getMediasFrom(album);
            });
        };
        this.setNickName = (name) => __awaiter(this, void 0, void 0, function* () {
            this.state.profile.set('nickname', name);
            this.setState(this.state);
            {
                name.trim().length === 0 ? this.setSpecState('nickNameIsEmpty', true) : this.setSpecState('nickNameIsEmpty', false);
            }
        });
        this.setUserImage = (images) => __awaiter(this, void 0, void 0, function* () {
            const image = images[0];
            try {
                const media = yield this.mediaUpload(image.path, false);
                if (media) {
                    const oldMediaId = this.state.profile.mediaId;
                    this.state.profile.set('mediaId', media.id);
                    this.state.profile.update()
                        .then(() => this.setSpecState('mediaIsForbidden', false))
                        .then(() => this.forceUpdate())
                        .catch(() => {
                        this.state.profile.set('mediaId', oldMediaId);
                        this.setSpecState('mediaIsForbidden', true);
                    });
                }
            }
            catch (error) {
                this.setSpecState('mediaIsForbidden', true);
            }
        });
        this.showLinkProfileError = () => {
            this.state.link.error = { message: 'Email address and/or profile name is not in the database' };
            this.setState(this.state);
        };
        this.showLinkRequestSent = (email) => __awaiter(this, void 0, void 0, function* () {
            yield this.linkedProfileService.linkProfileByEmail(email);
            return this.syncLinkedProfile();
        });
        this.showUnlinkPopup = () => {
            this.state.link.unlinkPopupVisible = true;
            this.setState(this.state);
        };
        this.hideUnlinkPopup = () => {
            this.state.link.unlinkPopupVisible = false;
            this.setState(this.state);
        };
        this.unlinkProfile = () => __awaiter(this, void 0, void 0, function* () {
            yield this.linkedProfileService.unLinkProfile();
            yield this.syncLinkedProfile();
            this.hideUnlinkPopup();
        });
        this.enableTextInput = () => {
            this.setSpecState('nickNameIsEditing', true);
        };
        this.unableTextInput = () => __awaiter(this, void 0, void 0, function* () {
            this.setSpecState('keyboardOffset', 0);
            this.setSpecState('nickNameIsEditing', false);
            yield this.state.profile.update();
        });
        const params = this.props.navigation.state.params;
        const profile = params.profile;
        this.state = Object.assign({}, this.state, { profileComplete: 0.5, profile, firstLaunch: params.firstLaunch || false, mediaIsForbidden: false, nickNameIsEditing: false, nickNameIsEmpty: false, showDeletePhotoPopup: false, messages: 0, notifications: 0, showSpinner: false, isPhotoLoaded: false, spinnerText: 'Upload Photo', link: {
                requestSent: false,
                requestAccepted: false,
                partnerNickname: 'mike',
                partnerEmail: 'mike@gmail.com',
                error: null,
                unlinkPopupVisible: false
            }, keyboardOffset: 0 });
        this.getSections(profile)
            .then(sections => {
            this.setSpecState('sections', sections);
            this.setSpecState('isPhotoLoaded', true);
        });
        this.getPhotos(profile)
            .then(photoMedia => this.setSpecState('photoMedia', photoMedia));
        this.getVideos(profile)
            .then(videoMedia => this.setSpecState('videoMedia', videoMedia));
        this.prepareProfileData()
            .then(profileData => {
            this.setSpecState('profileData', profileData);
        });
        this.syncCounters();
        this.syncLinkedProfile();
        this.getMetricsType();
        this.muslImagePicker = new MuslImagePicker();
        this.oldName = profile.nickname;
        // todo: refactor in favor of strategy
        if (profile.profileType.code === 'FLIRT') {
            this.profileScreenValues = new SetupFlirtProfileValues();
        }
        if (profile.profileType.code === 'FUN') {
            this.profileScreenValues = new SetupFunProfileValues();
        }
        if (profile.profileType.code === 'FRIEND') {
            this.profileScreenValues = new SetupFriendProfileValues();
        }
    }
    get profileLabel() {
        return this.profileScreenValues.getProfileLabel();
    }
    get screenTitle() {
        return i18n.t('profile.details.screenTitle');
    }
    componentDidMount() {
        this.rabbitCredentialService.onReady(service => service.subscribe('NEW_NOTIFICATION', this.syncCounters)
            .then(it => this.setSpecState('subscription', it)));
    }
    componentWillUnmount() {
        if (this.state.subscription) {
            this.state.subscription.unsubscribe();
        }
    }
    goToProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const communityDto = yield this.profileService.getCommunityDtoByProfileId(this.state.link.profileId);
            if (communityDto === -1) {
                return;
            }
            return this.props.navigation.navigate(routeConfig.profileView.name, { profile: { item: communityDto } });
        });
    }
    render() {
        console.log(this.state.sections, 'this.state.sectionsthis.state.sections =====');
        return (React.createElement(View, { style: styles.container },
            React.createElement(UiBlockBasic, { style: styles.navigationHeader },
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(UiBlockHorizontalEdges, null,
                    React.createElement(TouchableOpacity, { onPress: this.nextButtonPress },
                        React.createElement(UiBlockHorizontal, null,
                            React.createElement(Image, { style: styles.navigationArrow, source: require('Musl/images/messages/back-arrow.png') }),
                            React.createElement(UiBlockSpaceHorizontal, { width: 8 }),
                            React.createElement(UiBlockBasic, null,
                                React.createElement(UiBlockVerticalCenter, null,
                                    React.createElement(TextNormal, { style: styles.navigationTitle }, "My Profiles"))))),
                    React.createElement(TouchableOpacity, { onPress: this.completeProfile, disabled: this.state.nickNameIsEmpty },
                        React.createElement(UiBlockHorizontal, null,
                            React.createElement(UiBlockBasic, null,
                                React.createElement(UiBlockVerticalCenter, null,
                                    React.createElement(TextNormal, { style: [styles.navigationTitle, this.state.nickNameIsEmpty && styles.navTitleDisabled] }, "Save"))),
                            React.createElement(UiBlockSpaceHorizontal, { width: 8 }),
                            React.createElement(Image, { style: styles.navigationArrow, source: require('Musl/images/profile/icon-checkmark-save.png') })))),
                React.createElement(UiBlockSpace, { height: 10 })),
            React.createElement(KeyboardAvoidingWrapper, { style: styles.container, behavior: "position", keyboardVerticalOffset: this.state.keyboardOffset },
                React.createElement(ScrollView, null,
                    React.createElement(StatusBar, { barStyle: "light-content" }),
                    this.renderProfileHeader(),
                    React.createElement(UiBlockBasic, { style: styles.content },
                        this.renderProcessComponent(),
                        React.createElement(CollapsingSection, { title: i18n.t('profile.details.sections.Media.name'), completed: this.getMediaSectionCompleted() },
                            React.createElement(UiBlockSpace, { height: 10 }),
                            this.state.photoAlbum && this.state.isPhotoLoaded && !this.state.showSpinner ? (React.createElement(ProfileImages, { images: this.state.photoMedia, containerWidth: this.photosContainerWidth, imageSelected: this.userImageSelected, onDeleteBtnPress: this.deleteUserPictureButtonPressed, muslImagePicker: this.muslImagePicker })) : null,
                            this.state.showSpinner ?
                                React.createElement(ActivityIndicator, { size: "large", color: "#0000ff" }) : null,
                            React.createElement(UiBlockSpace, { height: 10 }),
                            React.createElement(TextNormal, { style: { textAlign: 'center' } }, i18n.t('profile.details.sections.Media.description')),
                            React.createElement(UiBlockSpace, { height: 10 })),
                        this.sectionDataValid ? this.state.sections
                            .sort(comparator)
                            .map(section => React.createElement(SectionComponent, { profile: this.state.profile, section: section, key: section.id, metricsType: this.state.metricsType, onDataChanged: this.updateProfileData, sectionCompleted: this.getSectionCompleted(section.subSections, this.state.profileData), onMetricChanged: this.onMetricChanged })) : null,
                        React.createElement(LinkProfileSection, { profileType: this.state.profile.profileType.code, requestSent: this.state.link.requestSent, requestAccepted: this.state.link.requestAccepted, partnerEmail: this.state.link.partnerEmail, partnerNickname: this.state.link.partnerNickname, error: this.state.link.error, onSubmitPress: this.linkProfileSubmitPressed, onUnlinkPress: this.unlinkProfilePressed, onProfilePress: this.onLinkedProfilePress, avatar: this.state.link.avatar })))),
            React.createElement(PopupSlideTop, { visible: this.state.showDeletePhotoPopup },
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(PopupContent, null, i18n.t('profile.setup.deletePhotoRequest')),
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: this.dismissDeleteUserPictureButtonPressed }, "Dismiss"),
                    React.createElement(PopupButton, { onPress: this.confirmDeleteUserPictureButtonPressed }, "Confirm")),
                React.createElement(UiBlockSpace, { height: 15 })),
            React.createElement(PopupSlideBottom, { visible: this.state.link.unlinkPopupVisible },
                React.createElement(PopupHeader, null, i18n.t('profile.details.sections.LinkProfile.modal.title')),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(PopupContent, null, i18n.t('profile.details.sections.LinkProfile.modal.text') + ` ${this.state.profile.nickname}`),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(PopupTwoButtonsContainer, null,
                    React.createElement(PopupButton, { onPress: this.hideUnlinkPopup }, i18n.t('common.buttons.cancel')),
                    React.createElement(PopupButton, { onPress: this.confirmUnlinkProfile }, i18n.t('common.buttons.unlink'))),
                React.createElement(UiBlockSpace, { height: 20 })),
            React.createElement(BottomNavigationPanel, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(NavigationTextButtonBlue, { onPress: this.backButtonPress }, i18n.t('common.buttons.back')),
                        React.createElement(NavigationTextButtonWhite, { onPress: this.completeProfile, disabled: this.state.nickNameIsEmpty }, i18n.t('common.buttons.finish'))))),
            this.state.showVideoTrimmer && React.createElement(View, { style: {
                    flex: 1,
                    backgroundColor: '#aaff55',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0
                } },
                React.createElement(VideoClipper, { videoUri: this.state.videoSource.path, maxDuration: 30, onVideoCompressed: this.uploadVideo, onVideoCancelled: () => this.setState(Object.assign({}, this.state, { showVideoTrimmer: false })), onVideoFinished: () => {
                        this.setState(Object.assign({}, this.state, { showVideoTrimmer: false }));
                        this.updateVideoMedia();
                    } }))));
    }
    get sectionDataValid() {
        return this.state.sections && this.state.sections.length && this.state.profileData;
    }
    getMetricsType() {
        this.localSettingsService.getUserMetrics()
            .then(value => {
            this.setState(Object.assign({}, this.state, { metricsType: value }));
        });
    }
    get photosContainerWidth() {
        const window = Dimensions.get('window');
        return window.width - 2 * contentPadding - 10;
    }
    prepareProfileData() {
        return this.profileDataService.preloadForProfile(this.state.profile);
    }
};
SetupProfileDetailsScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('SectionService'),
    __metadata("design:type", SectionService)
], SetupProfileDetailsScreen.prototype, "sectionService", void 0);
__decorate([
    lazy('AlbumService'),
    __metadata("design:type", AlbumService)
], SetupProfileDetailsScreen.prototype, "albumService", void 0);
__decorate([
    lazy('MediaService'),
    __metadata("design:type", MediaService)
], SetupProfileDetailsScreen.prototype, "mediaService", void 0);
__decorate([
    lazy('ProfileDataService'),
    __metadata("design:type", ProfileDataService)
], SetupProfileDetailsScreen.prototype, "profileDataService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], SetupProfileDetailsScreen.prototype, "profileService", void 0);
__decorate([
    lazy('AccountService'),
    __metadata("design:type", AccountService)
], SetupProfileDetailsScreen.prototype, "accountService", void 0);
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], SetupProfileDetailsScreen.prototype, "rabbitCredentialService", void 0);
__decorate([
    lazy('LinkedProfileService'),
    __metadata("design:type", LinkedProfileService)
], SetupProfileDetailsScreen.prototype, "linkedProfileService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], SetupProfileDetailsScreen.prototype, "localSettingsService", void 0);
SetupProfileDetailsScreen = __decorate([
    mixin([NavigateToProfileHub]),
    mixin([NavigateWithResetToProfileHub]),
    __metadata("design:paramtypes", [Object])
], SetupProfileDetailsScreen);
export default SetupProfileDetailsScreen;
const contentPadding = 25;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    content: {
        paddingLeft: contentPadding,
        paddingRight: contentPadding
    },
    navigationHeader: {
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E7EBEF',
        backgroundColor: 'white',
        zIndex: 1
    },
    navigationArrow: {
        width: 27,
        height: 27
    },
    navigationTitle: {
        fontSize: 14,
        color: '#5DA4E5'
    },
    navTitleDisabled: {
        fontSize: 14,
        color: '#ABABAB'
    },
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black',
        zIndex: 1
    }
});
//# sourceMappingURL=setup-profile-details-screen.js.map