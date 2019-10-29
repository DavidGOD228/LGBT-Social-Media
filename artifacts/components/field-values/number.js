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
import { Platform, StyleSheet } from 'react-native';
import UiBlockBasic from '../ui/block/basic';
import { FieldValueService } from '../../services/field-value';
import { lazy } from '../../annotations/inversify';
import UiBlockLeft from '../ui/block/left';
import TextNormal from '../global/text/basic/text-normal';
import LineFullWidth from '../global/line-full-width';
import UiBlockSpace from '../ui/block/space';
import UiBlockBottom from '../ui/block/bottom';
import i18n from '../../locales/i18n';
import TextBold from '../global/text/basic/text-bold';
import DefaultInput from './number/default-input';
import HeightInput from './number/height-input';
import WeightInput from './number/weight-input';
import { LocalSettingsService } from '../../services/local-settings';
const numberInputView = {
    'Height': HeightInput,
    'Weight': WeightInput,
    'default': DefaultInput
};
class FieldValueNumberStateful extends Component {
    constructor(props) {
        super(props);
        this.inputView = (fieldName) => {
            const key = fieldName in numberInputView ? fieldName : 'default';
            const view = numberInputView[key];
            return new view({
                fieldData: this.props.fieldData,
                metrics: this.metrics,
                persist: this.persist,
                metricsType: this.props.metricsType
            });
        };
        this.persist = (text) => {
            this.setState(Object.assign({}, this.state, { error: '' }));
            this.wrapText(text)
                .then(fieldValue => this.props.onValueUpdated([fieldValue]))
                .catch(this.displayError);
        };
        this.displayError = (error) => __awaiter(this, void 0, void 0, function* () {
            error = yield error.json();
            if (error && error.errors && error.errors['Validation Errors']) {
                let errorMessage = error.errors['Validation Errors'];
                if (this.props.field.name === 'Height') {
                    errorMessage = i18n.t(`profile.details.sections.AboutMe.subSections.` +
                        `Details.fields.Height.error.${this.state.userMetrics}`);
                }
                if (this.props.field.name === 'Weight') {
                    errorMessage = i18n.t(`profile.details.sections.AboutMe.subSections.` +
                        `Details.fields.Weight.error.${this.state.userMetrics}`);
                }
                this.setState(Object.assign({}, this.state, { error: errorMessage }));
            }
        });
        this.wrapText = (text) => {
            return this.createFieldValue(text);
        };
        this.createFieldValue = (value) => {
            return this.fieldValueService.createNew(this.props.section, this.props.subSection, this.props.field, value);
        };
        this.state = {
            error: '',
            userMetrics: ''
        };
        this.localSettingsService.getUserMetrics()
            .then(val => this.setState(Object.assign({}, this.state, { userMetrics: val })));
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockSpace, { height: 20 }),
            React.createElement(UiBlockLeft, null,
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBottom, null,
                        React.createElement(TextNormal, { style: styles.label }, this.label))),
                this.inputView(this.props.field.name)),
            React.createElement(LineFullWidth, { style: styles.line }),
            this.state.error ? (React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockSpace, { height: 5 }),
                React.createElement(TextBold, { style: styles.error }, this.state.error))) : (null)));
    }
    get label() {
        return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
            `${this.props.subSection.name}.fields.${this.props.field.name}.name`);
    }
    get metrics() {
        return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
            `${this.props.subSection.name}.fields.${this.props.field.name}.metrics`);
    }
}
__decorate([
    lazy('FieldValueService'),
    __metadata("design:type", FieldValueService)
], FieldValueNumberStateful.prototype, "fieldValueService", void 0);
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], FieldValueNumberStateful.prototype, "localSettingsService", void 0);
const FieldValueNumber = ({ fieldData, field, onValueUpdated, subSection, section, metricsType }) => (React.createElement(FieldValueNumberStateful, { key: field.id, fieldData: fieldData, field: field, onValueUpdated: onValueUpdated, subSection: subSection, section: section, metricsType: metricsType }));
const textBottomMargin = Platform.OS === 'android' ? -16 : 0;
const styles = StyleSheet.create({
    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textContainer: {
        flex: 1,
        marginBottom: textBottomMargin,
        paddingRight: 10
    },
    textInput: {
        textAlign: 'right',
        color: 'rgb(46, 46, 46)'
    },
    label: {
        color: '#8C8C8C',
        paddingRight: 10
    },
    metrics: {
        color: '#8C8C8C'
    },
    line: {
        backgroundColor: '#A6B4BD'
    },
    error: {
        color: '#D9242B',
        fontSize: 14
    }
});
export default FieldValueNumber;
//# sourceMappingURL=number.js.map