var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import DefaultBaseService from './base/impl/default';
import FieldValueModel from '../models/field-value';
import Query from '../lib/smart-criteria/query';
import { injectable } from 'inversify';
import Restrictions from '../lib/smart-criteria/restrictions';
import { LogoutClearable } from './mixins/logout-clearable';
import { mixin } from '../annotations/common';
import { listener } from '../annotations/event';
let FieldValueService = class FieldValueService extends DefaultBaseService {
    createNew(section, subSection, field, value) {
        const path = `${section.profileType}.${section.name}.${subSection.name}.${field.name}`;
        const repo = this.getRepo();
        const query = new Query().add(Restrictions.equal('path', path))
            .add(Restrictions.equal('value', value.toString()));
        try {
            return repo.peekRecord(`path = "${path}" AND value = "${value.toString()}"`)
                .then(fieldValue => fieldValue || repo.findRecord(query))
                .then(fieldValue => fieldValue || repo.createRecord()
                .set('path', path)
                .set('value', value.toString())
                .save());
        }
        catch (error) {
            return repo.findRecord(query)
                .then(fieldValue => fieldValue || repo.createRecord()
                .set('path', path)
                .set('value', value.toString())
                .save());
        }
    }
};
FieldValueService = __decorate([
    injectable(),
    listener('FieldValue'),
    mixin([LogoutClearable])
], FieldValueService);
export { FieldValueService };
const fieldValueService = new FieldValueService(FieldValueModel);
export default fieldValueService;
//# sourceMappingURL=field-value.js.map