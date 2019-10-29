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
import { attr, modelName, primaryKey, toOne } from '../annotations/model';
import configuration from '../configs/index';
import AlbumModel from './album';
let AlbumMediaModel = class AlbumMediaModel extends DefaultModel {
    get mediaUrl() {
        return `${configuration.uploadApi.base}/medias/download/${this.mediaId}?type=SMALL`;
    }
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], AlbumMediaModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], AlbumMediaModel.prototype, "mediaId", void 0);
__decorate([
    attr(),
    __metadata("design:type", Number)
], AlbumMediaModel.prototype, "sort", void 0);
__decorate([
    attr(),
    toOne('Album'),
    __metadata("design:type", AlbumModel)
], AlbumMediaModel.prototype, "album", void 0);
AlbumMediaModel = __decorate([
    modelName('AlbumMedia')
], AlbumMediaModel);
export default AlbumMediaModel;
//# sourceMappingURL=album-media.js.map