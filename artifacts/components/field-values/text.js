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
import { StyleSheet, TextInput } from 'react-native';
import i18n from '../../locales/i18n';
import UiBlockBasic from '../ui/block/basic';
import UiBlockRight from '../ui/block/right';
import { FieldValueService } from '../../services/field-value';
import { lazy } from '../../annotations/inversify';
import { debounce } from '../../annotations/eval';
class FieldValueTextInputStateful extends Component {
    constructor(props) {
        super(props);
        this.calcValue = () => {
            return this.props.fieldData.fieldValues
                .map(it => it.value)
                .toString();
        };
        this.onChange = (text) => __awaiter(this, void 0, void 0, function* () {
            this.setState(prevState => (Object.assign({}, prevState, { value: text })));
            return this.persist(text);
        });
        this.wrapText = (text) => {
            return this.createFieldValue(text);
        };
        this.createFieldValue = (value) => {
            return this.fieldValueService
                .createNew(this.props.section, this.props.subSection, this.props.field, value);
        };
        this.state = {
            value: this.calcValue()
        };
    }
    get placeholder() {
        return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
            `${this.props.subSection.name}.fields.${this.props.field.name}.placeholder`);
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(TextInput, { multiline: true, numberOfLines: 5, editable: true, placeholder: this.placeholder, placeholderTextColor: '#8D8D8D', value: this.state.value, style: styles.textInput, onChangeText: this.onChange }),
            React.createElement(UiBlockRight, null)));
    }
    persist(text) {
        this.wrapText(text)
            .then(fieldValue => this.props.onValueUpdated([fieldValue]));
    }
}
__decorate([
    lazy('FieldValueService'),
    __metadata("design:type", FieldValueService)
], FieldValueTextInputStateful.prototype, "fieldValueService", void 0);
__decorate([
    debounce(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FieldValueTextInputStateful.prototype, "persist", null);
const FieldValueTextInput = ({ fieldData, field, onValueUpdated, subSection, section }) => (React.createElement(FieldValueTextInputStateful, { fieldData: fieldData, field: field, onValueUpdated: onValueUpdated, subSection: subSection, section: section, key: field.id }));
const styles = StyleSheet.create({
    textInput: {
        color: 'rgb(46, 46, 46)',
        textAlignVertical: 'top'
    },
    counter: {
        color: '#AABFE3',
        fontSize: 16,
        textAlignVertical: 'center'
    },
    smallButton: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5
    }
});
export default FieldValueTextInput;
//# sourceMappingURL=text.js.map