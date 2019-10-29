var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { attr, modelName, optional, primaryKey } from '../annotations/model';
import ProfileInteractionToggleModel from './base/profile-interaction-toggle';
let FlexModel = class FlexModel extends ProfileInteractionToggleModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], FlexModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], FlexModel.prototype, "sourceProfileId", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], FlexModel.prototype, "targetProfileId", void 0);
__decorate([
    attr(),
    __metadata("design:type", String)
], FlexModel.prototype, "startDate", void 0);
__decorate([
    attr(),
    optional(),
    __metadata("design:type", String)
], FlexModel.prototype, "endDate", void 0);
FlexModel = __decorate([
    modelName('Flex')
], FlexModel);
export default FlexModel;
//# sourceMappingURL=flex.js.map