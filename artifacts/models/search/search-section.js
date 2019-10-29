var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import DefaultModel from '../base/impl/default-model';
import { attr, modelName, primaryKey, toMany } from '../../annotations/model';
let SearchSectionModel = class SearchSectionModel extends DefaultModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], SearchSectionModel.prototype, "id", void 0);
__decorate([
    attr('string'),
    __metadata("design:type", String)
], SearchSectionModel.prototype, "profileType", void 0);
__decorate([
    attr(),
    __metadata("design:type", String)
], SearchSectionModel.prototype, "name", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], SearchSectionModel.prototype, "sort", void 0);
__decorate([
    attr(),
    toMany('SearchSubSection'),
    __metadata("design:type", Array)
], SearchSectionModel.prototype, "searchSubSections", void 0);
SearchSectionModel = __decorate([
    modelName('SearchSection')
], SearchSectionModel);
export default SearchSectionModel;
//# sourceMappingURL=search-section.js.map