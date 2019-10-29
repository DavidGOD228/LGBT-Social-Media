var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import DefaultModel from './base/impl/default-model';
import { attr, modelName, primaryKey, toOne } from '../annotations/model';
import ChatModel from './chat';
import ChatMemberModel from './chat-member';
let MessageModel = class MessageModel extends DefaultModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], MessageModel.prototype, "id", void 0);
__decorate([
    attr(),
    toOne('Chat'),
    __metadata("design:type", ChatModel)
], MessageModel.prototype, "chat", void 0);
__decorate([
    attr('string'),
    __metadata("design:type", String)
], MessageModel.prototype, "messageType", void 0);
__decorate([
    attr(),
    toOne('ChatMember'),
    __metadata("design:type", ChatMemberModel)
], MessageModel.prototype, "chatMember", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], MessageModel.prototype, "orderNumber", void 0);
MessageModel = __decorate([
    modelName('Message')
], MessageModel);
export default MessageModel;
//# sourceMappingURL=message.js.map