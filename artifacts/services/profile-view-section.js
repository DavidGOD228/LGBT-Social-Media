var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import DefaultBaseService from './base/impl/default';
import ProfileViewSectionModel from '../models/profile-view/profile-view-section';
import Query from '../lib/smart-criteria/query';
import Restrictions from '../lib/smart-criteria/restrictions';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import { injectable } from 'inversify';
import { memo } from '../annotations/eval';
let ProfileViewSectionService = class ProfileViewSectionService extends DefaultBaseService {
    getAllByProfileTypeCode(profileTypeCode) {
        const query = new Query();
        query.add(Restrictions.equal('profileType', profileTypeCode));
        return this.getRepo()
            .find(query);
    }
};
__decorate([
    memo(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileViewSectionService.prototype, "getAllByProfileTypeCode", null);
ProfileViewSectionService = __decorate([
    injectable(),
    listener('ProfileViewSection'),
    mixin([LogoutClearable])
], ProfileViewSectionService);
export { ProfileViewSectionService };
const profileViewSectionService = new ProfileViewSectionService(ProfileViewSectionModel);
export default profileViewSectionService;
//# sourceMappingURL=profile-view-section.js.map