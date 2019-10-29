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
import AccountInfoModel from './account-info';
import { attr, indexed, modelName, optional, primaryKey, remoteBaseUrl, remotePathUrl, toMany, toOne } from '../annotations/model';
import configuration from '../configs/index';
let AccountModel = class AccountModel extends DefaultModel {
};
__decorate([
    attr('int'),
    primaryKey(),
    indexed() // default for primary key
    ,
    __metadata("design:type", Number)
], AccountModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", String)
], AccountModel.prototype, "email", void 0);
__decorate([
    attr(),
    optional(),
    __metadata("design:type", String)
], AccountModel.prototype, "password", void 0);
__decorate([
    attr(),
    __metadata("design:type", Boolean)
], AccountModel.prototype, "confirmed", void 0);
__decorate([
    attr(),
    toMany('Profile'),
    __metadata("design:type", Array)
], AccountModel.prototype, "profiles", void 0);
__decorate([
    attr(),
    toOne('AccountInfo'),
    optional(),
    __metadata("design:type", AccountInfoModel)
], AccountModel.prototype, "accountInfo", void 0);
AccountModel = __decorate([
    modelName('Account'),
    remoteBaseUrl(configuration.remoteApi.base) // default value
    ,
    remotePathUrl('accounts') // default - pluralized and lowerCased name of model
], AccountModel);
export default AccountModel;
//# sourceMappingURL=account.js.map