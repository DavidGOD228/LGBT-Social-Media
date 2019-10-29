var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Switch } from 'react-native';
import { FieldValueService } from '../../services/field-value';
import { lazy } from '../../annotations/inversify';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
import UiBlockRight from '../ui/block/right';
import UiBlockSpace from '../ui/block/space';
import TextNormal from '../global/text/basic/text-normal';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import UiBlockVerticalCenter from '../ui/block/vertical-center';
import i18n from '../../locales/i18n';
class FieldValueBooleanSwitchClass extends Component {
    constructor(props) {
        super(props);
        this.calcValue = () => {
            return this.props.fieldData.fieldValues
                .map(it => it.value)
                .toString() === 'true';
        };
        this.onChange = (value) => __awaiter(this, void 0, void 0, function* () {
            this.setState(prevState => (Object.assign({}, prevState, { value })));
            return this.persist(value);
        });
        this.wrapValue = (text) => {
            return this.createFieldValue(text ? 'true' : 'false');
        };
        this.createFieldValue = (value) => {
            return this.fieldValueService
                .createNew(this.props.section, this.props.subSection, this.props.field, value);
        };
        this.state = {
            value: this.calcValue()
        };
    }
    render() {
        const { section, subSection, field } = this.props;
        const fieldName = i18n.t(`profile.details.sections.${section.name}.subSections.${subSection.name}.fields.${field.name}.name`);
        return (React.createElement(UiBlockBasic, null,
            React.createElement(LineFullWidth, { style: { backgroundColor: '#E3E9EF' } }),
            React.createElement(UiBlockSpace, { height: 3 }),
            React.createElement(UiBlockRight, null,
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(TextNormal, { style: { fontSize: 13 } }, fieldName))),
                React.createElement(UiBlockSpaceHorizontal, { width: 10 }),
                React.createElement(Switch, { value: this.state.value, onValueChange: this.onChange }))));
    }
    persist(text) {
        this.wrapValue(text)
            .then(fieldValue => this.props.onValueUpdated([fieldValue]));
    }
}
__decorate([
    lazy('FieldValueService'),
    __metadata("design:type", FieldValueService)
], FieldValueBooleanSwitchClass.prototype, "fieldValueService", void 0);
const FieldValueBooleanSwitch = ({ section, subSection, field, fieldData, onValueUpdated }) => (React.createElement(FieldValueBooleanSwitchClass, { field: field, fieldData: fieldData, onValueUpdated: onValueUpdated, section: section, subSection: subSection }));
export default FieldValueBooleanSwitch;
//# sourceMappingURL=boolean-switch.js.map