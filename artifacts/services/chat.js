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
import DefaultBaseService from './base/impl/default';
import { injectable } from 'inversify';
import ChatModel from '../models/chat';
import { mixin } from '../annotations/common';
import { LogoutClearable } from './mixins/logout-clearable';
import { listener, onEvent } from '../annotations/event';
import { EVENTS } from '../configs/dicts';
import { lazy } from '../annotations/inversify';
import { RabbitCredentialService } from './rabbit-credential';
import { ProfileService } from './profile';
import { ChatMemberService } from './chat-member';
let ChatService = class ChatService extends DefaultBaseService {
    prepareConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            try {
                this.subscription = yield this.rabbitCredentialService.subscribe('MESSAGE', message => this.handleNewMessage(message));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllForProfile(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatMembers = yield this.chatMemberService.getAllActiveForProfile(profileId);
            return chatMembers.sort((a, b) => {
                if (a.score < b.score) {
                    return 1;
                }
                else if (a.score > b.score) {
                    return -1;
                }
                else if (a.chat.lastMessageDate < b.chat.lastMessageDate) {
                    return 1;
                }
                else if (a.chat.lastMessageDate > b.chat.lastMessageDate) {
                    return -1;
                }
                return 0;
            })
                .map(it => it.chat);
        });
    }
    getAllForCurrentProfile() {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getAllForProfile(activeProfileId);
    }
    getConversation(profileId) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getRepo()
            .findByPrimary(`me/${activeProfileId}/${profileId}`);
    }
    newConversation(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const maybeRemoteConversation = yield this.getConversation(profileId);
            if (maybeRemoteConversation) {
                return maybeRemoteConversation;
            }
            const chat = yield this.getRepo()
                .createRecord()
                .save();
            yield Promise.all([
                this.chatMemberService.newMemberToChat(profileId, chat),
                this.chatMemberService.newMemberToChat(activeProfileId, chat, 'OWNER')
            ]);
            return chat;
        });
    }
    getTotalUnreadPreferred(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield this.getMembers(profileId);
            return members.filter(it => it.score > 0)
                .reduce((acc, it) => acc + it.chat.lastOrderNumber - it.lastViewedOrderNumber, 0);
        });
    }
    getTotalUnreadUnPreferred(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield this.getMembers(profileId);
            return members.filter(it => it.score < 0)
                .reduce((acc, it) => acc + it.chat.lastOrderNumber - it.lastViewedOrderNumber, 0);
        });
    }
    getTotalUnreadNeutral(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield this.getMembers(profileId);
            return members.filter(it => it.score === 0)
                .reduce((acc, it) => acc + it.chat.lastOrderNumber - it.lastViewedOrderNumber, 0);
        });
    }
    getMembers(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield this.getAllForProfile(profileId);
            return Promise.all(chats.map(it => this.chatMemberService.getForChat(it, profileId)));
        });
    }
    handleNewMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileId = JSON.parse(JSON.parse(message.body).payload).chatMember.profileId;
            const profile = yield this.profileService.getByPrimary(profileId);
            const activeProfileId = this.profileService.getActiveProfileId();
            if (profile && profile.id !== activeProfileId) {
                // stub. was replaced by FCM push notifications
                // but we may need this callback to notify IN APP
            }
        });
    }
};
__decorate([
    lazy('RabbitCredentialService'),
    __metadata("design:type", RabbitCredentialService)
], ChatService.prototype, "rabbitCredentialService", void 0);
__decorate([
    lazy('ChatMemberService'),
    __metadata("design:type", ChatMemberService)
], ChatService.prototype, "chatMemberService", void 0);
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ChatService.prototype, "profileService", void 0);
__decorate([
    onEvent(EVENTS.rabbitConnectionEstablished),
    onEvent(EVENTS.activeProfilesChanged),
    onEvent(EVENTS.newProfile),
    onEvent(EVENTS.login),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "prepareConnection", null);
ChatService = __decorate([
    injectable(),
    listener('Chat'),
    mixin([LogoutClearable])
], ChatService);
export { ChatService };
const chatService = new ChatService(ChatModel);
export default chatService;
//# sourceMappingURL=chat.js.map