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
let SearchSubSectionModel = class SearchSubSectionModel extends DefaultModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], SearchSubSectionModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", String)
], SearchSubSectionModel.prototype, "name", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], SearchSubSectionModel.prototype, "sort", void 0);
__decorate([
    attr(),
    toMany('SearchField'),
    __metadata("design:type", Array)
], SearchSubSectionModel.prototype, "searchFields", void 0);
SearchSubSectionModel = __decorate([
    modelName('SearchSubSection')
], SearchSubSectionModel);
export default SearchSubSectionModel;
//# sourceMappingURL=search-sub-section.js.map