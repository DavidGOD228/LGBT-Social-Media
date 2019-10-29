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
import { FlatList, Image, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DefaultHeader from '../../components/global/default-header';
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges';
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center';
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockBasic from '../../components/ui/block/basic';
import UiBlockHorizontal from '../../components/ui/block/horizontal';
import TextNormal from '../../components/global/text/basic/text-normal';
import UiBlockSpaceHorizontal from '../../components/ui/block/space-horizontal';
import UiBlockSpace from '../../components/ui/block/space';
import routeConfig from '../../router';
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel';
import ProfileSwitcher from '../../components/profile-switcher';
import ActionListButton from '../../components/action-list-button';
import ChatItemCompanion from '../../components/messages/chat-item-companion';
import ChatItemMe from '../../components/messages/chat-item-me';
import MuslImagePicker from '../../utils/musl-image-picker';
import { MessageService } from '../../services/message';
import { lazy } from '../../annotations/inversify';
import { ProfileService } from '../../services/profile';
import { RabbitCredentialService } from '../../services/rabbit-credential';
import MultichatItemLeft from '../../components/messages/multichat/item-left';
import MultichatItemRightWithActions from '../../components/messages/multichat/item-right-with-actions';
import { LinkedProfileService } from '../../services/linked-profile';
import { ChatMemberService, default as chatMemberService } from '../../services/chat-member';
import MultichatItemRight from '../../components/messages/multichat/item-right';
import { MediaService } from '../../services/media';
import AdBannerCommunityHorizontal from '../../components/ad/banner-community-horisontal';
import KeyboardAvoidingWrapper from '../../components/keyboard-avoiding-wrapper';
import { generateUUID } from '../../utils/string';
export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.IS_MOUNTED = false;
        this.keyboardDidShow = () => {
            this.chatFlatList.scrollToEnd({ animated: false });
        };
        this.keyboardDidHide = () => {
            this.chatFlatList.scrollToEnd({ animated: false });
        };
        this.toggleLinkedProfile = ({ profile, added, chatMember }) => () => __awaiter(this, void 0, void 0, function* () {
            const chat = this.props.navigation.state.params.item.chat;
            if (added && chatMember) {
                yield this.chatMemberService.removeMemberFromChat(chatMember);
            }
            else {
                if (chatMember) {
                    yield this.chatMemberService.addMemberToChat(chatMember);
                }
                else {
                    yield this.chatMemberService.newMemberToChat(profile.id, chat, 'GUEST');
                }
            }
            return this.syncCollaborators();
        });
        this.multichatCollaborators = () => {
            const { myPartner, collaborators } = this.state;
            const collaboratorsToDisplay = (myPartner && this.amIChattingWithLinkedProfile()) ?
                new Array(myPartner) : collaborators;
            return collaboratorsToDisplay.map(it => (React.createElement(MultichatItemLeft, { key: it.profile.id, nickname: it.profile.nickname, avatar: it.profile.avatar })));
        };
        this.multichatLinkedProfile = () => {
            const { myPartner, owner } = this.state;
            if (!myPartner || this.amIChattingWithLinkedProfile()) {
                return null;
            }
            if (owner) {
                return (React.createElement(MultichatItemRightWithActions, { added: myPartner.added, nickname: myPartner.profile.nickname, avatar: myPartner.profile.avatar, onToggleLinkedProfile: this.toggleLinkedProfile(myPartner) }));
            }
            return (React.createElement(MultichatItemRight, { nickname: myPartner.profile.nickname, avatar: myPartner.profile.avatar }));
        };
        this.answerChanged = (text) => {
            this.updateAnswerField(text);
        };
        this.updateAnswerField = (text) => {
            this.setState(Object.assign({}, this.state, { answer: text }));
        };
        this.sendButtonPress = () => __awaiter(this, void 0, void 0, function* () {
            this.sendMessage(this.state.answer)
                .catch(() => {
                this.navigateToChatsScreen();
            });
            this.updateAnswerField('');
        });
        this.pickImageButtonPress = () => {
            this.muslImagePicker.pickImage(this.sendImage);
        };
        this.backButton = () => {
            this.navigateToChatsScreen();
        };
        this.navigateToChatsScreen = () => {
            this.props
                .navigation
                .dispatch(NavigationActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({
                        routeName: routeConfig.profileHub.name,
                        params: {}
                    }),
                    NavigationActions.navigate({
                        routeName: routeConfig.messages.name,
                        params: {}
                    })
                ],
                key: null
            }));
        };
        this.communityButton = () => {
            this.props.navigation.navigate(routeConfig.community.name);
        };
        this.renderMessage = ({ item }) => {
            if (item.my) {
                return React.createElement(ChatItemMe, { userPicture: item.userPicture, message: item.text, type: item.type });
            }
            return React.createElement(ChatItemCompanion, { userPress: () => this.goToProfile(item.author), userPicture: item.userPicture, message: item.text, type: item.type });
        };
        this.sendMessage = (message) => __awaiter(this, void 0, void 0, function* () {
            if (!message || !message.trim()) {
                return;
            }
            this.addMyMessage(message);
            yield this.messageService.newMessage(this.props.navigation.state.params.item.chat, message);
            yield this.syncMessages();
        });
        this.addMyMessage = (messageText) => {
            const author = this.profileService.getActive();
            const messageDto = {
                key: generateUUID(),
                my: true,
                userPicture: author ? author.avatar : '',
                author,
                text: messageText,
                type: 'TEXT'
            };
            const messages = this.state.messages;
            messages.push(messageDto);
            this.setState(prevState => (Object.assign({}, prevState, { messages })));
            this.scrollChatItemsBottom(true);
        };
        this.syncMessages = () => __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const chat = this.props.navigation.state.params.item.chat;
            const messages = yield this.messageService.getAllForChat(chat);
            chatMemberService.fetchForChat(chat, this.props.navigation.state.params.item.owner.profileId)
                .then(owner => {
                owner.lastViewedOrderNumber = chat.lastOrderNumber;
                owner.save();
            });
            // console.log(messages.map(it => it.serialize()))
            const contentPromises = messages.map(it => this.messageService.getContentFor(it));
            const messageContents = yield Promise.all(contentPromises);
            const messageDtoList = yield Promise.all(messageContents.map((it) => __awaiter(this, void 0, void 0, function* () {
                const author = yield this.profileService.getByPrimary(it.message.chatMember.profileId);
                return {
                    key: it.id,
                    my: it.message.chatMember.profileId === activeProfileId,
                    userPicture: author ? author.avatar : '',
                    author,
                    text: it.text,
                    type: it.contentType
                };
            })));
            this.setState(prevState => (Object.assign({}, prevState, { messages: messageDtoList })));
            this.scrollChatItemsBottom();
        });
        this.sendImage = (images) => __awaiter(this, void 0, void 0, function* () {
            const image = images[0];
            const media = yield this.mediaUpload(image.path);
            if (!media) {
                return;
            }
            yield this.messageService.newMessage(this.props.navigation.state.params.item.chat, media.id.toString(), 'IMAGE');
            yield this.syncMessages();
            this.scrollChatItemsBottom(true);
        });
        this.mediaUpload = (file) => {
            return this.mediaService.createNew(file);
        };
        this.scrollChatItemsBottom = (isAnimated = false) => {
            console.log(isAnimated);
            setTimeout(() => {
                // For message sending, to prevent crash when user leaves screen before message is actually sent
                if (!this.IS_MOUNTED) {
                    return;
                }
                // this.chatFlatList.scrollToIndex({
                //   animated: isAnimated,
                //   index: this.state.messages.length - 1,
                //   viewPosition: 0
                // })
                this.chatFlatList.scrollToEnd({ animated: isAnimated });
            }, 100);
        };
        this.subscribeForChanges = () => __awaiter(this, void 0, void 0, function* () {
            this.subscription = yield this.rabbitCredentialService.subscribe('MESSAGE', () => __awaiter(this, void 0, void 0, function* () {
                yield this.syncMessages();
                this.scrollChatItemsBottom(true);
            }));
        });
        this.unsubscribeForChanges = () => {
            try {
                this.subscription.unsubscribe();
            }
            catch (e) {
                console.warn(e);
            }
        };
        this.syncCollaborators = () => __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const linkedProfile = yield this.linkedProfileService.getProfileLink();
            const chatMembers = yield this.chatMemberService.getAllActiveForChat(this.props.navigation.state.params.item.chat);
            if (linkedProfile) {
                const oppositeProfileId = this.linkedProfileService.getOppositeProfileId(linkedProfile);
                const oppositeProfile = yield this.profileService.getByPrimary(oppositeProfileId);
                if (!oppositeProfile) {
                    throw new Error('no opposite profile');
                }
                const chatMemberForLinked = chatMembers.find(it => it.profileId === oppositeProfile.id);
                const collaboratorsWithoutLinked = yield Promise.all(chatMembers.filter(it => it.profileId !== activeProfileId && it.profileId !== oppositeProfile.id)
                    .map((it) => __awaiter(this, void 0, void 0, function* () {
                    return ({
                        chatMember: it,
                        profile: yield this.profileService.getByPrimary(it.profileId)
                    });
                })));
                return this.setState(prevState => (Object.assign({}, prevState, { collaborators: collaboratorsWithoutLinked, owner: this.props.navigation.state.params.item.owner.memberRole !== 'GUEST', myPartner: {
                        added: chatMemberForLinked ? chatMemberForLinked.memberRole !== 'OUT' : false,
                        chatMember: chatMemberForLinked,
                        profile: oppositeProfile
                    } })));
            }
            const collaborators = yield Promise.all(chatMembers.filter(it => it.profileId !== activeProfileId)
                .map((it) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    chatMember: it,
                    profile: yield this.profileService.getByPrimary(it.profileId)
                });
            })));
            return this.setState(prevState => (Object.assign({}, prevState, { owner: this.props.navigation.state.params.item.owner.memberRole !== 'GUEST', collaborators })));
        });
        this.amIChattingWithLinkedProfile = () => {
            if (!!this.state.myPartner && this.state.collaborators.length === 0) {
                return true;
            }
            return false;
        };
        this.state = {
            answer: '',
            messages: [],
            collaborators: [],
            owner: false
        };
        this.muslImagePicker = new MuslImagePicker();
    }
    componentDidMount() {
        this.IS_MOUNTED = true;
        // this.scrollChatItemsBottom()
        this.subscribeForChanges();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        this.syncCollaborators();
        this.syncMessages()
            .then(() => {
            console.log('Should scroll to bottom by now');
            this.scrollChatItemsBottom(true);
        });
    }
    componentWillUnmount() {
        this.IS_MOUNTED = false;
        this.unsubscribeForChanges();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    componentDidUpdate() {
        this.scrollChatItemsBottom(true);
    }
    render() {
        return (React.createElement(KeyboardAvoidingWrapper, { style: styles.container, behavior: 'padding' },
            React.createElement(View, { style: styles.bannerContainer },
                React.createElement(AdBannerCommunityHorizontal, null)),
            React.createElement(View, { style: styles.chatComponents },
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBasic, { style: styles.chatNavigation },
                        React.createElement(UiBlockSpace, { height: 10 }),
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(TouchableOpacity, { onPress: this.backButton },
                                React.createElement(UiBlockHorizontal, null,
                                    React.createElement(Image, { style: styles.chatNavigationImage, source: require('Musl/images/messages/back-arrow.png') }),
                                    React.createElement(UiBlockSpaceHorizontal, { width: 8 }),
                                    React.createElement(UiBlockBasic, null,
                                        React.createElement(UiBlockVerticalCenter, null,
                                            React.createElement(TextNormal, { style: styles.chatNavigationText }, "Messages"))))),
                            React.createElement(TouchableOpacity, { onPress: this.communityButton },
                                React.createElement(UiBlockHorizontal, null,
                                    React.createElement(UiBlockBasic, null,
                                        React.createElement(UiBlockVerticalCenter, null,
                                            React.createElement(TextNormal, { style: styles.chatNavigationText }, "Community View"))),
                                    React.createElement(UiBlockSpaceHorizontal, { width: 8 }),
                                    React.createElement(Image, { style: styles.chatNavigationImage, source: require('Musl/images/messages/forward-arrow.png') })))),
                        React.createElement(UiBlockSpace, { height: 10 })),
                    React.createElement(UiBlockBasic, { style: {
                            marginLeft: 25,
                            marginRight: 25,
                            borderBottomWidth: 1,
                            borderBottomColor: '#979797'
                        } },
                        React.createElement(UiBlockSpace, { height: 10 }),
                        React.createElement(UiBlockHorizontalEdges, null,
                            this.multichatCollaborators(),
                            this.multichatLinkedProfile()),
                        React.createElement(UiBlockSpace, { height: 3 }))),
                React.createElement(View, { style: styles.messagesContainer },
                    React.createElement(FlatList, { ref: ref => this.chatFlatList = ref, initialNumToRender: this.state.messages.length ? this.state.messages.length - 1 : 0, style: styles.messagesList, data: this.state.messages, renderItem: this.renderMessage, keyExtractor: item => item.key })),
                React.createElement(UiBlockBasic, { style: styles.chatInput },
                    React.createElement(UiBlockSpace, { height: 10 }),
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(TouchableOpacity, { onPress: this.pickImageButtonPress },
                            React.createElement(Image, { source: require('Musl/images/messages/icon-camera.png') })),
                        React.createElement(TextInput, { style: styles.input, placeholder: 'Reply', value: this.state.answer, multiline: true, onChangeText: this.answerChanged }),
                        React.createElement(TouchableOpacity, { onPress: this.sendButtonPress },
                            React.createElement(Image, { source: require('Musl/images/messages/icon-chat-reply.png') }))),
                    React.createElement(UiBlockSpace, { height: 10 }))),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
    goToProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const communityDto = yield this.profileService.getCommunityDtoByProfileId(profile.id);
            if (communityDto === null) {
                return this.props.navigation.navigate(routeConfig.profileBlocked.name);
            }
            if (communityDto === -1) {
                return;
            }
            return this.props.navigation.navigate(routeConfig.profileView.name, { profile: { item: communityDto } });
        });
    }
}
ChatScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('MessageService'),
    __metadata("design:type", MessageService)
], ChatScreen.prototype, "messageService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ChatScreen.prototype, "profileService", void 0);
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], ChatScreen.prototype, "rabbitCredentialService", void 0);
__decorate([
    lazy('LinkedProfileService'),
    __metadata("design:type", LinkedProfileService)
], ChatScreen.prototype, "linkedProfileService", void 0);
__decorate([
    lazy('ChatMemberService'),
    __metadata("design:type", ChatMemberService)
], ChatScreen.prototype, "chatMemberService", void 0);
__decorate([
    lazy('MediaService'),
    __metadata("design:type", MediaService)
], ChatScreen.prototype, "mediaService", void 0);
const styles = StyleSheet.create({
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    chatComponents: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    chatNavigation: {
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E7EBEF'
    },
    chatNavigationImage: {
        width: 27,
        height: 27
    },
    chatNavigationText: {
        fontSize: 14,
        color: '#5DA4E5'
    },
    chatInput: {
        borderTopWidth: 1,
        borderTopColor: '#E7EBEF',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        color: '#000000',
        fontSize: 16,
        maxHeight: 80
    },
    messagesContainer: {
        flex: 1
    },
    messagesList: {
        paddingLeft: 25,
        paddingRight: 25
    }
});
//# sourceMappingURL=chat.js.map