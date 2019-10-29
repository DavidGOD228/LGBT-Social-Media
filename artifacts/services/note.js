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
import { injectable } from 'inversify';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import NoteModel from '../models/note';
import ProfileInteractionService from './base/profile-interaction';
import { ProfileService } from './profile';
import { lazy } from '../annotations/inversify';
let NoteService = class NoteService extends ProfileInteractionService {
    addToProfile(profileId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.doAction(profileId, true);
            return note.set('description', text)
                .save();
        });
    }
    getForProfile(profileId) {
        return this.getActiveAction(profileId);
    }
};
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], NoteService.prototype, "profileService", void 0);
NoteService = __decorate([
    injectable(),
    listener('Note'),
    mixin([LogoutClearable])
], NoteService);
export { NoteService };
const noteService = new NoteService(NoteModel);
export default noteService;
//# sourceMappingURL=note.js.map