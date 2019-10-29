var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import DefaultBaseService from './base/impl/default';
import ProfileTypeModel from '../models/profile-type';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import Restrictions from '../lib/smart-criteria/restrictions';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
let ProfileTypeService = class ProfileTypeService extends DefaultBaseService {
    getByCode(name) {
        const query = new Query();
        query.add(Restrictions.equal('code', name.toUpperCase()));
        // console.log(query.generate())
        return this.getRepo()
            .findRecord(query);
    }
};
ProfileTypeService = __decorate([
    injectable(),
    listener('ProfileType'),
    mixin([LogoutClearable])
], ProfileTypeService);
export { ProfileTypeService };
const profileTypeService = new ProfileTypeService(ProfileTypeModel);
export default profileTypeService;
//# sourceMappingURL=profile-type.js.map