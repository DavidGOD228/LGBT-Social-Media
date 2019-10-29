var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import MessageContentModel from '../models/message-content';
import { mixin } from '../annotations/common';
import { LogoutClearable } from './mixins/logout-clearable';
import { listener } from '../annotations/event';
import Restrictions from '../lib/smart-criteria/restrictions';
let MessageContentService = class MessageContentService extends DefaultBaseService {
    // DEPRECATED
    newMessage(text, message, type) {
        console.warn('MessageContentService', 'attempted to call newMessage, but it is deprecated, ' +
            'see MessageService.newMessage method for reference (now using SendMessageDto)');
        return this.getRepo()
            .createRecord()
            .set('contentType', type)
            .set('message', message)
            .set('text', text)
            .save();
    }
    getForMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeContent = yield this.getRepo()
                .peekRecord(`message.id = ${message.id}`);
            if (maybeContent) {
                return maybeContent;
            }
            const query = new Query();
            query.add(Restrictions.equal('message.id', message.id));
            return yield this.getRepo()
                .findRecord(query);
        });
    }
};
MessageContentService = __decorate([
    injectable(),
    listener('MessageContent'),
    mixin([LogoutClearable])
], MessageContentService);
export { MessageContentService };
const messageContentService = new MessageContentService(MessageContentModel);
export default messageContentService;
//# sourceMappingURL=message-content.js.map