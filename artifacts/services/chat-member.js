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
import ChatMemberModel from '../models/chat-member';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import Restrictions from '../lib/smart-criteria/restrictions';
import { ProfileService } from './profile';
import { lazy } from '../annotations/inversify';
let ChatMemberService = class ChatMemberService extends DefaultBaseService {
    newMemberToChat(profileId, chat, memberRole = 'MEMBER') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatMemberModel = yield this.getForChat(chat, profileId);
                if (chatMemberModel) {
                    return this.addMemberToChat(chatMemberModel, memberRole);
                }
            }
            catch (error) {
                console.log(error);
            }
            const activeProfileId = this.profileService.getActiveProfileId();
            const member = this.getRepo()
                .createRecord()
                .set('profileId', profileId)
                .set('chat', chat)
                .set('memberRole', memberRole);
            if (memberRole === 'GUEST') {
                member.set('invitingProfileId', activeProfileId);
            }
            return member.save();
        });
    }
    addMemberToChat(chatMember, memberRole = 'GUEST') {
        return chatMember.set('memberRole', memberRole)
            .save();
    }
    removeMemberFromChat(chatMember) {
        return chatMember.set('memberRole', 'OUT')
            .save();
    }
    getForChat(chat, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeMember = yield this.getRepo()
                .peekRecord(`profileId = ${profileId} AND chat.id = ${chat.id}`);
            if (maybeMember) {
                return maybeMember;
            }
            return this.fetchForChat(chat, profileId);
        });
    }
    fetchForChat(chat, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new Query();
            query.add(Restrictions.equal('chat.id', chat.id))
                .add(Restrictions.equal('profileId', profileId));
            const chatMember = yield this.getRepo()
                .findRecord(query);
            if (!chatMember) {
                throw new Error('chat member not found');
            }
            return chatMember;
        });
    }
    getMeForChat(chat) {
        const activeProfileId = this.profileService.getActiveProfileId();
        return this.getForChat(chat, activeProfileId);
    }
    getAllActiveForChat(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new Query();
            query.add(Restrictions.equal('chat.id', chat.id))
                .add(Restrictions.contain('memberRole', ['OWNER', 'MEMBER', 'GUEST']));
            // const mayBeLocal = await this.getRepo()
            //                              .peek(`chat.id = ${chat.id}`)
            return /*mayBeLocal.length ? mayBeLocal : */ yield this.getRepo()
                .find(query);
        });
    }
    getAllActiveForProfile(profileId) {
        const query = new Query();
        query.add(Restrictions.equal('profileId', profileId))
            .add(Restrictions.equal('chat.blocked', false))
            .add(Restrictions.equal('chatHidden', false))
            .add(Restrictions.contain('memberRole', ['OWNER', 'MEMBER', 'GUEST']))
            .setSort(Restrictions.desc('score'));
        return this.getRepo()
            .find(query);
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], ChatMemberService.prototype, "profileService", void 0);
ChatMemberService = __decorate([
    injectable(),
    listener('ChatMember'),
    mixin([LogoutClearable])
], ChatMemberService);
export { ChatMemberService };
const chatMemberService = new ChatMemberService(ChatMemberModel);
export default chatMemberService;
//# sourceMappingURL=chat-member.js.map