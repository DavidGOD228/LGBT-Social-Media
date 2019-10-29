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
import { attr, modelName, primaryKey } from '../annotations/model';
let NotificationContentModel = class NotificationContentModel extends DefaultModel {
    get parsedContent() {
        return JSON.parse(this.content);
    }
    set parsedContent(value) {
        this.content = JSON.stringify(value);
    }
};
__decorate([
    attr('int'),
    primaryKey(),
    __metadata("design:type", Number)
], NotificationContentModel.prototype, "id", void 0);
__decorate([
    attr(),
    __metadata("design:type", String)
], NotificationContentModel.prototype, "content", void 0);
NotificationContentModel = __decorate([
    modelName('NotificationContent')
], NotificationContentModel);
export default NotificationContentModel;
//# sourceMappingURL=notification-content.js.map