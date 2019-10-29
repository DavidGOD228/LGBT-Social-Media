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
import { FlatList, Keyboard, StatusBar, StyleSheet, View } from 'react-native';
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel';
import BaseScreenDefault from '../base/base-scene';
import DefaultHeader from '../../components/global/default-header';
import UiBlockBasic from '../../components/ui/block/basic';
import TextLight from '../../components/global/text/basic/text-light';
import UiBlockSpace from '../../components/ui/block/space';
import LineFullWidth from '../../components/global/line-full-width';
import MessageItem from '../../components/messages/message-item';
import routeConfig from '../../router';
import ActionListButton from '../../components/action-list-button';
import ProfileSwitcher from '../../components/profile-switcher';
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel';
import { ChatService } from '../../services/chat';
import { lazy } from '../../annotations/inversify';
import { ChatMemberService } from '../../services/chat-member';
import { ProfileService } from '../../services/profile';
import { MessageService } from '../../services/message';
import AdBannerCommunityHorizontal from '../../components/ad/banner-community-horisontal';
import KeyboardAvoidingWrapper from '../../components/keyboard-avoiding-wrapper';
export default class MessagesScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.keyboardDidShow = (event) => {
            console.log('keyboardDidShow' + event.endCoordinates.height);
        };
        this.keyboardDidHide = () => {
            console.log('keyboardDidHide');
        };
        this.sendMessagePressed = (item, answer) => __awaiter(this, void 0, void 0, function* () {
            if (!answer || !answer.trim().length) {
                return;
            }
            let message;
            try {
                message = yield this.sendMessage(item.chat, answer);
            }
            catch (error) {
                console.log(error);
            }
            if (!message) {
                this.syncAllChats();
                return;
            }
            item.owner.set('lastViewedOrderNumber', message.orderNumber);
            yield item.owner.save();
            this.syncAllChats();
        });
        this.renderChatItem = ({ item }) => {
            return (React.createElement(MessageItem, { author: item.author, message: item.message, userPressed: () => this.goToProfile(item.mainProfile), messagePressed: () => this.messageItemPress(item), deleteButtonPressed: () => this.deleteChat(item), onSendButtonPressed: (answer) => this.sendMessagePressed(item, answer), onItemFocus: () => this.scrollToItem(item) }));
        };
        this.scrollToItem = (item) => {
            if (this.state.chats.length === 1) {
                return;
            }
            let position = this.state.chats.indexOf(item);
            position = position === this.state.chats.length - 1 ? position - 1 : position;
            this.chatsFlatList.scrollToIndex({
                animated: true,
                index: position,
                viewPosition: 0
            });
        };
        this.scrollChatItemsBottom = (isAnimated = false) => {
            setTimeout(() => this.chatsFlatList.scrollToEnd({ animated: isAnimated }), 100);
        };
        this.goToProfile = (profile) => __awaiter(this, void 0, void 0, function* () {
            const communityDto = yield this.profileService.getCommunityDtoByProfileId(profile.id);
            if (communityDto === null) {
                return this.props.navigation.navigate(routeConfig.profileBlocked.name);
            }
            if (communityDto === -1) {
                return;
            }
            return this.props.navigation.navigate(routeConfig.profileView.name, { profile: { item: communityDto } });
        });
        this.messageItemPress = (item) => {
            this.props.navigation.navigate(routeConfig.chat.name, { item });
        };
        this.deleteChat = (item) => __awaiter(this, void 0, void 0, function* () {
            const member = item.owner || (yield this.chatMemberService.getMeForChat(item.chat));
            member.set('chatHidden', true);
            yield member.save();
            return this.syncAllChats();
        });
        this.syncAllChats = () => __awaiter(this, void 0, void 0, function* () {
            this.setSpecState('refreshing', true);
            const chats = yield this.chatService.getAllForCurrentProfile();
            const activeProfileId = this.profileService.getActiveProfileId();
            // order of init array is saved
            const members = yield Promise.all(chats.map(it => this.chatMemberService.getAllActiveForChat(it)));
            const chatMap = members.map((it) => __awaiter(this, void 0, void 0, function* () {
                const owner = it.find(member => member.profileId === activeProfileId);
                const others = it.filter(member => member.profileId !== activeProfileId);
                const main = others.pop();
                const mainProfile = yield this.profileService.getByPrimary(main ? main.profileId : 0);
                if (!owner || !mainProfile) {
                    throw new Error('no profile in members');
                }
                const lastMessage = yield this.messageService.getLastForChat(owner.chat);
                const message = lastMessage ? yield this.messageService.getContentFor(lastMessage) : null;
                let msgAuthor;
                if (message) {
                    msgAuthor = yield this.profileService.getByPrimary(message.message.chatMember.profileId);
                }
                return {
                    chat: owner.chat,
                    members: others,
                    owner,
                    mainProfile,
                    author: msgAuthor,
                    senderType: owner.score,
                    message: message ? (message.contentType === 'TEXT' ? message.text : 'Image') : 'no messages for now',
                    seen: owner.chat.lastOrderNumber === -1 || owner.chat.lastOrderNumber === owner.lastViewedOrderNumber
                };
            }));
            const chatDtoList = yield Promise.all(chatMap);
            this.setSpecState('refreshing', false);
            this.setSpecState('chats', chatDtoList);
        });
        this.sendMessage = (chat, answer) => {
            if (!answer) {
                return;
            }
            return this.messageService.newMessage(chat, answer);
        };
        this.state = {
            chats: [],
            refreshing: false
        };
        this.syncAllChats();
        this.scrollChatItemsBottom(true);
    }
    get chats() {
        return this.state.chats;
    }
    componentDidMount() {
        this.scrollChatItemsBottom();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    componentDidUpdate() {
        this.scrollChatItemsBottom();
    }
    render() {
        return (React.createElement(KeyboardAvoidingWrapper, { style: styles.container, behavior: 'padding' },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(View, { style: styles.bannerContainer },
                React.createElement(AdBannerCommunityHorizontal, null)),
            React.createElement(UiBlockBasic, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(TextLight, { style: styles.title }, "Messages"),
                React.createElement(UiBlockSpace, { height: 8 }),
                React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(FlatList, { onRefresh: this.syncAllChats, refreshing: this.state.refreshing, ref: ref => this.chatsFlatList = ref, data: this.chats, renderItem: this.renderChatItem, keyExtractor: item => JSON.stringify(item) })),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
}
MessagesScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('ChatService'),
    __metadata("design:type", ChatService)
], MessagesScreen.prototype, "chatService", void 0);
__decorate([
    lazy('ChatMemberService'),
    __metadata("design:type", ChatMemberService)
], MessagesScreen.prototype, "chatMemberService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], MessagesScreen.prototype, "profileService", void 0);
__decorate([
    lazy('MessageService'),
    __metadata("design:type", MessageService)
], MessagesScreen.prototype, "messageService", void 0);
const styles = StyleSheet.create({
    bannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black',
        zIndex: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 24
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    allTab: {
        width: 55,
        height: 21,
        lineHeight: 25,
        fontSize: 14
    },
    tabIcon: {
        width: 21,
        height: 21,
        marginRight: 50
    },
    tabsBottomBorder: {
        backgroundColor: '#E3E3E3'
    },
    switchBtnContainer: {
        flex: 1
    },
    switcherBtn: {
        fontSize: 15,
        textAlign: 'center',
        color: '#5DA4E5',
        paddingTop: 6,
        paddingBottom: 6
    },
    switcherBtnSelected: {
        color: 'rgb(46, 46, 46)',
        backgroundColor: '#E3E3E3'
    },
    splash: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    newNotification: {
        position: 'absolute',
        right: 33,
        top: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#CE0B24',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    newNotificationText: {
        color: 'white',
        fontSize: 13
    }
});
//# sourceMappingURL=messages.js.map