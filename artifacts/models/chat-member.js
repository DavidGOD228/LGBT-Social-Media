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
import { attr, modelName, optional, primaryKey, toOne } from '../annotations/model';
import ChatModel from './chat';
let ChatMemberModel = class ChatMemberModel extends DefaultModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], ChatMemberModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], ChatMemberModel.prototype, "profileId", void 0);
__decorate([
    attr(),
    toOne('Chat'),
    __metadata("design:type", ChatModel)
], ChatMemberModel.prototype, "chat", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], ChatMemberModel.prototype, "score", void 0);
__decorate([
    attr(),
    optional(),
    __metadata("design:type", Number)
], ChatMemberModel.prototype, "invitingProfileId", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], ChatMemberModel.prototype, "lastViewedOrderNumber", void 0);
__decorate([
    attr('string'),
    __metadata("design:type", String)
], ChatMemberModel.prototype, "memberRole", void 0);
__decorate([
    attr(),
    __metadata("design:type", Boolean)
], ChatMemberModel.prototype, "chatHidden", void 0);
ChatMemberModel = __decorate([
    modelName('ChatMember')
], ChatMemberModel);
export default ChatMemberModel;
//# sourceMappingURL=chat-member.js.map