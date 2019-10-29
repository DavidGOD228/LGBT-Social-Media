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
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import MessageModel from '../models/message';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import { MessageContentService } from './message-content';
import { lazy } from '../annotations/inversify';
import { ChatMemberService } from './chat-member';
import Restrictions from '../lib/smart-criteria/restrictions';
import Fetch from '../utils/fetch';
import configuration from '../configs/index';
import { SendMessageDto } from '../models/send-message-dto';
let MessageService = class MessageService extends DefaultBaseService {
    newMessage(chat, text, type = 'TEXT') {
        return __awaiter(this, void 0, void 0, function* () {
            const me = yield this.chatMemberService.getMeForChat(chat);
            if (!me) {
                throw new Error('no me in chat members');
            }
            const sendMessageDto = new SendMessageDto(text, type);
            return Fetch.post(`${configuration.remoteApi.base}/chats/${chat.id}/sendMessage`, sendMessageDto)
                .then((response) => response.response.objects[0].message);
        });
    }
    getAllForChat(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedMessages = yield this.getRepo()
                .peek(`chat.id = ${chat.id}`);
            const lastMessageOrder = cachedMessages.reduce((acc, it) => acc < it.orderNumber ? it.orderNumber : acc, 0);
            const gaps = [0];
            for (let i = 1; i < lastMessageOrder; i++) {
                if (!cachedMessages.find(message => message.orderNumber === i)) {
                    gaps.push(i);
                }
            }
            const query = new Query();
            query.add(Restrictions.equal('chat.id', chat.id))
                .add(Restrictions.disjunction(Restrictions.more('orderNumber', lastMessageOrder), Restrictions.contain('orderNumber', gaps)))
                .setSort(Restrictions.asc('orderNumber'));
            const newMessages = yield this.getRepo()
                .find(query);
            return cachedMessages.concat(newMessages)
                .sort((a, b) => a.orderNumber < b.orderNumber ? -1 : 1);
        });
    }
    getLastForChat(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new Query();
            query.add(Restrictions.equal('chat.id', chat.id))
                .setSort(Restrictions.desc('orderNumber'))
                .setLimit(1);
            return yield this.getRepo()
                .findRecord(query);
        });
    }
    getContentFor(message) {
        return this.messageContentService.getForMessage(message);
    }
};
__decorate([
    lazy('MessageContentService'),
    __metadata("design:type", MessageContentService)
], MessageService.prototype, "messageContentService", void 0);
__decorate([
    lazy('ChatMemberService'),
    __metadata("design:type", ChatMemberService)
], MessageService.prototype, "chatMemberService", void 0);
MessageService = __decorate([
    injectable(),
    listener('Message'),
    mixin([LogoutClearable])
], MessageService);
export { MessageService };
const messageService = new MessageService(MessageModel);
export default messageService;
//# sourceMappingURL=message.js.map