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
import SearchSectionModel from '../models/search/search-section';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import Restrictions from '../lib/smart-criteria/restrictions';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
import { memo } from '../annotations/eval';
let SearchSectionService = class SearchSectionService extends DefaultBaseService {
    getAllByProfileTypeCode(profileTypeCode) {
        const query = new Query();
        query.add(Restrictions.equal('profileType', profileTypeCode));
        // todo: add sort condition here
        return this.getRepo()
            .find(query);
    }
};
__decorate([
    memo(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchSectionService.prototype, "getAllByProfileTypeCode", null);
SearchSectionService = __decorate([
    injectable(),
    listener('SearchSection'),
    mixin([LogoutClearable])
], SearchSectionService);
export { SearchSectionService };
const searchSectionService = new SearchSectionService(SearchSectionModel);
export default searchSectionService;
//# sourceMappingURL=search-section.js.map