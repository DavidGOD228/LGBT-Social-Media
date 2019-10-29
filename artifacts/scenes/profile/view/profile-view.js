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
import { Dimensions, Keyboard, KeyboardAvoidingView, ListView, Platform, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import DefaultHeader from '../../../components/global/default-header';
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center';
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges';
import ActionListButton from '../../../components/action-list-button';
import ProfileSwitcher from '../../../components/profile-switcher';
import BaseScreenDefault from '../../base/base-scene';
import AdBannerCommunityHorizontal from '../../../components/ad/banner-community-horisontal';
import { PROFILE_INTERACTIONS, PROFILE_VIEW_GENERAL_INFO, PROFILE_VIEW_PHOTOS } from '../../../configs/dicts';
import ProfileViewPhoto from '../../../components/profile-view/profile-view-photo';
import { globalParams } from '../../../assets/styles/style';
import ProfileViewGeneralInfo from '../../../components/profile-view/profile-view-general-info';
import UiBlockBasic from '../../../components/ui/block/basic';
import ProfileViewSeparator from '../../../components/profile-view/profile-view-separator';
import TextNormal from '../../../components/global/text/basic/text-normal';
import ProfileViewTools from '../../../components/profile-view/profile-view-tools';
import ProfileViewSection from './profile-view-section';
import { lazy } from '../../../annotations/inversify';
import { BlockService } from '../../../services/block';
import { FavoriteService } from '../../../services/favorite';
import { FlexService } from '../../../services/flex';
import ModalWindowTransparent from '../../../components/modal/modal-window-transparent';
import TextBold from '../../../components/global/text/basic/text-bold';
import ModalCloseBtn from '../../../components/modal/modal-close-btn';
import { ProfileVisitService } from '../../../services/profile-visit';
import ProfileViewTextInputLimited from '../../../components/profile-view/text-limited';
import ProfileViewMessage from '../../../components/profile-view/message-view';
import { ChatService } from '../../../services/chat';
import { MessageService } from '../../../services/message';
import { NoteService } from '../../../services/note';
import { ProfileViewSectionService } from '../../../services/profile-view-section';
import { ProfileDataService } from '../../../services/profile-data';
import configuration from '../../../configs/index';
import { ChatMemberService } from '../../../services/chat-member';
import { AlbumService } from '../../../services/album';
import ProfileViewRequestAccess from '../../../components/profile-view/profile-view-request-access';
import { ProfileService } from '../../../services/profile';
import { MediaRequestService } from '../../../services/media-request';
import routeConfig from '../../../router';
import { comparator } from '../../../utils/number';
import UiBlockSpace from '../../../components/ui/block/space';
import PopupSlideBottom from '../../../components/global/popup/popup-slide-bottom';
import KeyboardAvoidingWrapper from '../../../components/keyboard-avoiding-wrapper';
import ReportUserComponent from '../../../components/profile-view/report-user';
const syncToggle = (component, toggleName, toggleValue) => component.setSpecState('tools', component.state.tools.map(it => it.name === toggleName ? Object.assign({}, it, { isSelected: toggleSelected(toggleName, toggleValue) }) : it));
const toggleSelected = (toggleName, toggleValue) => {
    if (toggleName === 'Note') {
        return !!toggleValue && !!toggleValue.description;
    }
    return !!toggleValue;
};
export default class ProfileView extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.keyboardBehavior = Platform.OS === 'ios' ? 'position' : 'padding';
        this.onInteractionPress = (item) => {
            switch (item.name) {
                case 'Share':
                    return this.onSharePress(item);
                case 'Block':
                    return this.onBlockPress(item);
                case 'Note':
                    return this.onNotePress(item);
                case 'Favorite':
                    return this.onFavoritePress(item);
                case 'Flex':
                    return this.onFlexPress(item);
                case 'Message':
                    return this.onMessagePress();
                default:
                    return console.log(item.name + ' pressed');
            }
        };
        this.onSharePress = (item) => {
            this.setSpecState('shareVisible', !this.state.shareVisible);
            console.log(item.name + ' pressed');
        };
        this.onBlockPress = (item) => __awaiter(this, void 0, void 0, function* () {
            console.log(item.name + ' pressed');
            const profileId = this.state.profile.profileId;
            if (yield this.blockService.getProfileBlock(profileId)) {
                return this.blockService.unBlockProfile(profileId);
            }
            else {
                return this.blockService.blockProfile(profileId);
            }
        });
        this.onNotePress = (item) => {
            console.log(item.name + ' pressed');
            this.showNote();
        };
        this.onFavoritePress = (item) => __awaiter(this, void 0, void 0, function* () {
            console.log(item.name + ' pressed');
            const profileId = this.state.profile.profileId;
            if (yield this.favoriteService.getProfileFavorite(profileId)) {
                yield this.favoriteService.unFavoriteProfile(profileId);
            }
            else {
                yield this.favoriteService.favoriteProfile(profileId);
            }
            yield this.syncShare();
        });
        this.onFlexPress = (item) => __awaiter(this, void 0, void 0, function* () {
            console.log(item.name + ' pressed');
            const profileId = this.state.profile.profileId;
            if (yield this.flexService.getProfileFlex(profileId)) {
                yield this.flexService.unFlexProfile(profileId);
            }
            else {
                yield this.flexService.flexProfile(profileId);
            }
            yield this.syncShare();
        });
        this.onMessagePress = () => __awaiter(this, void 0, void 0, function* () {
            const profileId = this.state.profile.profileId;
            const chat = yield this.chatService.getConversation(profileId);
            if (chat && !chat.blocked) {
                const owner = yield this.chatMemberService.getMeForChat(chat);
                return this.props.navigation.navigate(routeConfig.chat.name, {
                    item: {
                        chat,
                        owner
                    }
                });
            }
            return this.showMessage();
        });
        this.modalNoteClosePressed = () => {
            this.hideNote();
        };
        this.modalMessageClosePressed = () => {
            this.hideMessage();
        };
        this.reportUserPressed = () => {
            this.showReportPopup();
        };
        this.cancelReportPressed = () => {
            this.hideReportPoput();
            Keyboard.dismiss();
        };
        this.submitReportPressed = (message, categories) => {
            this.submitReport(message, categories);
            Keyboard.dismiss();
        };
        this.closeReportPopupPressed = () => {
            this.state.report.showModal = false;
            this.setState(Object.assign({}, this.state));
        };
        this.extractProfileDataForSection = (section) => {
            return section.profileViewSubSections
                .reduce((fields, subSection) => {
                // Refactoring required
                const filteredFields = subSection.profileViewFields.filter(it => {
                    return it.name !== 'SafetyPractice' || this.state.profile.safetyPractice.length > 0;
                });
                return fields.concat(filteredFields);
            }, [])
                .map(profileViewField => profileViewField.field.id)
                .reduce((profileData, fieldId) => {
                const result = this.state.profileData.filter((data) => {
                    if (['TEXT', 'TEXT_LIMITED'].indexOf(data.field.type) !== -1) {
                        if (!(data.fieldValues[0].value || '').trim()) {
                            return false;
                        }
                    }
                    return data.field.id === fieldId;
                });
                if (result.length > 0) {
                    profileData.push(result[0]);
                }
                return profileData;
            }, []);
        };
        this.syncProfileInteractions = () => {
            const profileId = this.state.profile.profileId;
            this.blockService.getProfileBlock(profileId)
                .then(has => syncToggle(this, 'Block', has));
            this.flexService.getProfileFlex(profileId)
                .then(has => syncToggle(this, 'Flex', has));
            this.favoriteService.getProfileFavorite(profileId)
                .then(has => syncToggle(this, 'Favorite', has));
            this.noteService.getForProfile(profileId)
                .then(has => syncToggle(this, 'Note', has));
            this.chatService.getConversation(profileId)
                .then(has => syncToggle(this, 'Message', has));
        };
        this.visit = (profileId) => {
            this.profileVisitService.addToProfile(profileId);
        };
        this.showNote = () => {
            this.setSpecState('showNoteModal', true);
        };
        this.saveNote = (value) => __awaiter(this, void 0, void 0, function* () {
            this.setSpecState('note', value);
            yield this.noteService.addToProfile(this.state.profile.profileId, value);
            const noteVal = yield this.noteService.getForProfile(this.state.profile.profileId);
            syncToggle(this, 'Note', noteVal);
            this.hideNote();
        });
        this.hideNote = () => {
            this.setSpecState('showNoteModal', false);
        };
        this.showMessage = () => {
            this.setSpecState('showMessageModal', true);
        };
        this.saveMessage = (value) => __awaiter(this, void 0, void 0, function* () {
            if (value.length > 0) {
                this.setSpecState('tools', this.state.tools.map(it => it.name === 'Message' ? Object.assign({}, it, { isSelected: true }) : it));
            }
            const profileId = this.state.profile.profileId;
            // We have to consider both cases: 1. User blocked me; 2. I blocked the user
            const reverseBlock = yield this.blockService.getReverseProfileBlock(profileId);
            const block = yield this.blockService.getProfileBlock(profileId);
            if (reverseBlock || block) {
                return this.hideMessage();
            }
            const conversation = yield this.chatService.newConversation(profileId);
            const message = yield this.messageService.newMessage(conversation, value);
            this.hideMessage();
            const me = yield this.chatMemberService.getMeForChat(conversation);
            me.set('lastViewedOrderNumber', message.orderNumber);
            yield me.save();
            yield this.syncShare();
        });
        this.hideMessage = () => {
            this.setSpecState('showMessageModal', false);
        };
        this.showReportPopup = () => {
            this.setSpecState('report', Object.assign({}, this.state.report, { showModal: true }));
        };
        this.hideReportPoput = () => {
            this.setSpecState('report', Object.assign({}, this.state.report, { showModal: false }));
        };
        this.submitReport = (message, categories) => {
            const myProfileId = this.profileService.getActiveProfileId();
            const targetProfileId = this.state.profile.profileId;
            const wrongUniverse = categories.find(it => it.value === 'wrongUniverse');
            const wrongUniverseFlag = wrongUniverse ? !!wrongUniverse.isSelected : false;
            const inappropriateBehavior = categories.find(it => it.value === 'inappropriateBehavior');
            const inappropriateBehaviorFlag = inappropriateBehavior ? !!inappropriateBehavior.isSelected : false;
            const harassingMe = categories.find(it => it.value === 'harassingMe');
            const harassingMeFlag = harassingMe ? !!harassingMe.isSelected : false;
            this.profileService.reportUser(myProfileId, targetProfileId, harassingMeFlag, wrongUniverseFlag, inappropriateBehaviorFlag, message)
                .then(response => console.log('report user response', response))
                .catch(e => console.log('response user error', e));
        };
        this.profileViewPhotoItem = (photo, index) => {
            return photo.name === 'photo' ? (React.createElement(ProfileViewPhoto, { data: photo, position: index, key: index })) : (React.createElement(ProfileViewRequestAccess, { profileId: this.state.profile.profileId, key: index }));
        };
        this.isAccessToPhotosGranted = () => __awaiter(this, void 0, void 0, function* () {
            const photo = yield this.albumService.getPhotoForProfile(this.state.profile.profileId);
            const mediaRequest = yield this.mediaRequestService.getOutboundActiveRequest(this.state.profile.profileId, photo);
            const mediaInRequest = yield this.mediaRequestService.getInboundActiveRequestReverse(this.state.profile.profileId, photo);
            return !!mediaRequest && mediaRequest.status === 'APPROVED' ||
                !!mediaInRequest && mediaInRequest.status === 'APPROVED';
        });
        this.getPhotos = (profileId) => {
            return this.albumService.getPhotoForProfile(profileId)
                .then(album => {
                return this.albumService.getMediasFrom(album);
            })
                .then(media => {
                return media.map(item => {
                    return {
                        name: 'photo',
                        photo: { uri: item.mediaUrl }
                    };
                });
            });
        };
        this.syncShare = () => __awaiter(this, void 0, void 0, function* () {
            const share = yield this.profileService.getShare(this.state.profile.profileId);
            this.setSpecState('share', share);
        });
        this.changeShare = (profile) => __awaiter(this, void 0, void 0, function* () {
            const share = yield this.profileService.getShare(this.state.profile.profileId);
            const type = profile.profileType.code;
            yield this.profileService.share(this.state.profile.profileId, Object.assign({}, share, { [type]: !share[type] }));
            return this.syncShare();
        });
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const { profile } = this.props.navigation.state.params;
        const profilePhoto = {
            name: 'photo',
            photo: { uri: `${configuration.remoteApi.common}/api/medias/download/${profile.item.mediaId}?type=LARGE` }
        };
        const requestMediaAccess = {
            name: 'request',
            photo: require('Musl/images/profile/profile-view/profile-view-bg.png')
        };
        this.state = Object.assign({}, this.state, { dataSource: ds.cloneWithRows(PROFILE_VIEW_PHOTOS), tools: PROFILE_INTERACTIONS, profile: profile.item, galleryPhotos: [profilePhoto], showNoteModal: false, showMessageModal: false, note: '', photoIndex: 0, isSwiping: false, shareVisible: false, report: {
                showModal: false,
            } });
        this.profileViewSectionService.getAllByProfileTypeCode(profile.item.profileTypeCode)
            .then(sections => this.setSpecState('sections', sections));
        const profileId = profile.item.profileId;
        this.profileDataService.getAllByProfileId(profileId)
            .then(profileData => {
            this.setSpecState('profileData', profileData);
        });
        this.profileDataService.getDistanceToDisplay(this.state.profile.distance)
            .then(val => this.setSpecState('distance', val));
        this.noteService.getForProfile(profileId)
            .then(note => this.setSpecState('note', note ? note.description : ''));
        this.isAccessToPhotosGranted()
            .then(granted => {
            if (granted) {
                this.getPhotos(profileId)
                    .then(photos => {
                    this.state.galleryPhotos.push(...photos);
                    this.state.galleryPhotos.push(requestMediaAccess);
                    this.setState(this.state);
                });
            }
            else {
                this.state.galleryPhotos.push(requestMediaAccess);
                this.setState(this.state);
            }
        });
        this.visit(profileId);
        this.syncProfileInteractions();
        this.syncShare()
            .then(() => this.profileService.getForCurrent())
            .then(profiles => {
            const activeProfileId = this.profileService.getActiveProfileId();
            this.setSpecState('otherProfiles', profiles.filter(it => it.id !== activeProfileId));
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(View, { style: styles.bannerContainer },
                React.createElement(AdBannerCommunityHorizontal, null)),
            React.createElement(KeyboardAvoidingView, { style: styles.container, behavior: "position", keyboardVerticalOffset: 50 },
                React.createElement(ScrollView, { scrollEnabled: !this.state.isSwiping },
                    React.createElement(View, { style: styles.photosContainer },
                        React.createElement(ScrollView, { style: { flex: 1 }, horizontal: true, pagingEnabled: true }, this.state.galleryPhotos.map((it, index) => this.profileViewPhotoItem(it, index)))),
                    React.createElement(ProfileViewGeneralInfo, { name: this.state.profile.nickname, safetyPractice: this.state.profile.safetyPractice, role: this.state.profile.role, hopingFor: this.state.profile.hopingFor, profileType: this.state.profile.profileTypeCode, distance: this.state.distance, dataSource: PROFILE_VIEW_GENERAL_INFO }),
                    React.createElement(ProfileViewTools, { items: this.state.tools, shareVisible: this.state.shareVisible, onItemSelected: this.onInteractionPress, profiles: this.state.otherProfiles ? this.state.otherProfiles : [], share: this.state.share, sharePressed: this.changeShare }),
                    React.createElement(UiBlockBasic, { style: styles.content },
                        React.createElement(ProfileViewSeparator, null),
                        this.state.note && this.state.note.length > 0 ? (React.createElement(UiBlockBasic, null,
                            React.createElement(TextNormal, { style: styles.comment }, this.state.note),
                            React.createElement(ProfileViewSeparator, null))) : (null),
                        (this.state.profileData && this.state.sections)
                            && this.state.sections
                                .sort(comparator)
                                .map(section => React.createElement(ProfileViewSection, { key: section.name, title: section.name, children: section.profileViewSubSections, profileData: this.extractProfileDataForSection(section) })),
                        React.createElement(ProfileViewSeparator, null),
                        React.createElement(UiBlockBasic, null,
                            React.createElement(TouchableOpacity, { onPress: this.reportUserPressed },
                                React.createElement(UiBlockSpace, { height: 30 }),
                                React.createElement(TextBold, { style: styles.startReport },
                                    "Report ",
                                    this.state.profile.nickname),
                                React.createElement(UiBlockSpace, { height: 30 })))))),
            React.createElement(ModalWindowTransparent, { visible: this.state.showNoteModal },
                React.createElement(KeyboardAvoidingView, { style: styles.modalContent, behavior: this.keyboardBehavior },
                    React.createElement(View, { style: styles.titleContainer },
                        React.createElement(TextBold, { style: styles.noteTitle }, this.state.profile.nickname),
                        React.createElement(ModalCloseBtn, { onPress: this.modalNoteClosePressed })),
                    React.createElement(View, { style: styles.textContainer },
                        React.createElement(ProfileViewSeparator, null),
                        React.createElement(ProfileViewTextInputLimited, { body: this.state.note, placeholder: 'Enter your note', onValueUpdated: (value) => this.saveNote(value) })))),
            React.createElement(ModalWindowTransparent, { visible: this.state.showMessageModal },
                React.createElement(KeyboardAvoidingView, { style: styles.modalContent, behavior: this.keyboardBehavior },
                    React.createElement(View, { style: styles.titleContainer },
                        React.createElement(TextBold, { style: styles.noteTitle }, this.state.profile.nickname),
                        React.createElement(ModalCloseBtn, { onPress: this.modalMessageClosePressed })),
                    React.createElement(View, { style: styles.textContainer },
                        React.createElement(ProfileViewSeparator, null),
                        React.createElement(ProfileViewMessage, { body: '', placeholder: 'Enter your message', onValueUpdated: (value) => this.saveMessage(value) })))),
            React.createElement(KeyboardAvoidingWrapper, { behavior: "position", keyboardVerticalOffset: globalParams.bottomPanelHeight },
                React.createElement(PopupSlideBottom, { visible: this.state.report.showModal, countBottomPanel: false },
                    React.createElement(ReportUserComponent, { onCancelReportPressed: this.cancelReportPressed, onSubmitReportPressed: this.submitReportPressed, onCloseReportPopupPressed: this.closeReportPopupPressed }))),
            React.createElement(View, { style: styles.bottom },
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
}
ProfileView.navigationOptions = ({ navigation }) => ({
    title: 'ProfileView',
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation }),
    headerLeft: null
});
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ProfileView.prototype, "profileService", void 0);
__decorate([
    lazy('ChatService'),
    __metadata("design:type", ChatService)
], ProfileView.prototype, "chatService", void 0);
__decorate([
    lazy('ChatMemberService'),
    __metadata("design:type", ChatMemberService)
], ProfileView.prototype, "chatMemberService", void 0);
__decorate([
    lazy('NoteService'),
    __metadata("design:type", NoteService)
], ProfileView.prototype, "noteService", void 0);
__decorate([
    lazy('MessageService'),
    __metadata("design:type", MessageService)
], ProfileView.prototype, "messageService", void 0);
__decorate([
    lazy('BlockService'),
    __metadata("design:type", BlockService)
], ProfileView.prototype, "blockService", void 0);
__decorate([
    lazy('FavoriteService'),
    __metadata("design:type", FavoriteService)
], ProfileView.prototype, "favoriteService", void 0);
__decorate([
    lazy('FlexService'),
    __metadata("design:type", FlexService)
], ProfileView.prototype, "flexService", void 0);
__decorate([
    lazy('ProfileVisitService'),
    __metadata("design:type", ProfileVisitService)
], ProfileView.prototype, "profileVisitService", void 0);
__decorate([
    lazy('ProfileViewSectionService'),
    __metadata("design:type", ProfileViewSectionService)
], ProfileView.prototype, "profileViewSectionService", void 0);
__decorate([
    lazy('ProfileDataService'),
    __metadata("design:type", ProfileDataService)
], ProfileView.prototype, "profileDataService", void 0);
__decorate([
    lazy('MediaRequestService'),
    __metadata("design:type", MediaRequestService)
], ProfileView.prototype, "mediaRequestService", void 0);
__decorate([
    lazy('AlbumService'),
    __metadata("design:type", AlbumService)
], ProfileView.prototype, "albumService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    photosContainer: {
        width: '100%',
        height: Dimensions.get('window').width * 9 / 10,
        backgroundColor: 'black'
    },
    content: {
        paddingLeft: 25,
        paddingRight: 25
    },
    comment: {
        paddingTop: 25,
        paddingBottom: 25,
        textAlign: 'center',
        color: 'rgb(174, 174, 174)'
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        height: 250
    },
    noteTitle: {
        paddingTop: 20,
        paddingBottom: 18,
        color: 'rgb(92, 92, 92)',
        fontSize: 28
    },
    titleContainer: {
        width: '100%',
        height: 70,
        paddingLeft: 25,
        paddingRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textContainer: {
        width: '100%',
        height: 180,
        paddingRight: 25,
        paddingLeft: 25,
        backgroundColor: 'white'
    },
    bottom: {
        height: globalParams.bottomPanelHeight,
        justifyContent: 'flex-end'
    },
    startReport: {
        color: '#5E9CD3',
        paddingLeft: 10
    }
});
//# sourceMappingURL=profile-view.js.map