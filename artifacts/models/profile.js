var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import DefaultModel from './base/impl/default-model';
import ProfileTypeModel from './profile-type';
import { attr, modelName, optional, primaryKey, toOne } from '../annotations/model';
import configuration from '../configs/index';
let ProfileModel = class ProfileModel extends DefaultModel {
    get avatar() {
        return { uri: `${configuration.remoteApi.base}/medias/download/${this.mediaId}?type=SMALL` };
    }
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], ProfileModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", String)
], ProfileModel.prototype, "nickname", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], ProfileModel.prototype, "mediaId", void 0);
__decorate([
    attr(),
    __metadata("design:type", Boolean)
], ProfileModel.prototype, "active", void 0);
__decorate([
    attr(),
    __metadata("design:type", Boolean)
], ProfileModel.prototype, "invisible", void 0);
__decorate([
    attr(),
    optional(),
    __metadata("design:type", Boolean)
], ProfileModel.prototype, "completed", void 0);
__decorate([
    attr(),
    toOne('ProfileType'),
    __metadata("design:type", ProfileTypeModel)
], ProfileModel.prototype, "profileType", void 0);
ProfileModel = __decorate([
    modelName('Profile')
], ProfileModel);
export default ProfileModel;
//# sourceMappingURL=profile.js.map