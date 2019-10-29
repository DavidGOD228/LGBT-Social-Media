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
import moment from 'moment';
import { injectable } from 'inversify';
import DefaultBaseService from './impl/default';
import Query from '../../lib/smart-criteria/query';
import Restrictions from '../../lib/smart-criteria/restrictions';
let ProfileInteractionToggleService = class ProfileInteractionToggleService extends DefaultBaseService {
    doAction(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeProfileId = this.profileService.getActiveProfileId();
            const alreadyHasAction = yield this.getActiveAction(profileId);
            return alreadyHasAction || this.getRepo()
                .createRecord()
                .set('sourceProfileId', activeProfileId)
                .set('targetProfileId', profileId);
        });
    }
    getActiveAction(profileId) {
        const activeProfileId = this.profileService.getActiveProfileId();
        const query = new Query();
        query.add(Restrictions.equal('sourceProfileId', activeProfileId))
            .add(Restrictions.equal('targetProfileId', profileId))
            .add(Restrictions.isNull('endDate'))
            .setSort(Restrictions.desc('id'))
            .setLimit(1);
        return this.getRepo()
            .findRecord(query);
    }
    getActiveActions() {
        const activeProfileId = this.profileService.getActiveProfileId();
        const query = new Query();
        query.add(Restrictions.equal('sourceProfileId', activeProfileId))
            .add(Restrictions.isNull('endDate'))
            .setSort(Restrictions.desc('id'));
        return this.getRepo()
            .find(query);
    }
    undoAction(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeAction = yield this.getActiveAction(profileId);
            if (!activeAction) {
                throw new Error('there is no active action');
            }
            const now = moment()
                .format();
            activeAction.set('endDate', now);
            return activeAction.save();
        });
    }
};
ProfileInteractionToggleService = __decorate([
    injectable()
], ProfileInteractionToggleService);
export default ProfileInteractionToggleService;
//# sourceMappingURL=profile-interaction-toggle.js.map