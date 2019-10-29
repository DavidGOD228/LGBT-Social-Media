var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { attr, modelName, primaryKey, remotePathUrl, toMany, toOne } from '../../annotations/model';
import FieldDataModel from './field-data';
import FieldModel from '../field';
let ProfileDataModel = class ProfileDataModel extends FieldDataModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], ProfileDataModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], ProfileDataModel.prototype, "profileId", void 0);
__decorate([
    attr(),
    toOne('Field'),
    __metadata("design:type", FieldModel)
], ProfileDataModel.prototype, "field", void 0);
__decorate([
    attr(),
    toMany('FieldValue'),
    __metadata("design:type", Array)
], ProfileDataModel.prototype, "fieldValues", void 0);
ProfileDataModel = __decorate([
    modelName('ProfileData'),
    remotePathUrl('profile-datas')
], ProfileDataModel);
export default ProfileDataModel;
//# sourceMappingURL=profile-data.js.map