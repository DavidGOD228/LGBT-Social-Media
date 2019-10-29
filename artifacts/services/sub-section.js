var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import DefaultBaseService from './base/impl/default';
import { injectable } from 'inversify';
import SubSectionModel from '../models/sub-section';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
let SubSectionService = class SubSectionService extends DefaultBaseService {
};
SubSectionService = __decorate([
    injectable(),
    listener('SubSection'),
    mixin([LogoutClearable])
], SubSectionService);
export { SubSectionService };
const subSectionService = new SubSectionService(SubSectionModel);
export default subSectionService;
//# sourceMappingURL=sub-section.js.map