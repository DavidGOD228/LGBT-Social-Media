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
import { StyleSheet } from 'react-native';
// import RNExitApp from 'react-native-exit-app';
import DatePicker from 'react-native-datepicker';
import UiBlockBasic from '../ui/block/basic';
import UiBlockLeft from '../ui/block/left';
import UiBlockBottom from '../ui/block/bottom';
import TextNormal from '../global/text/basic/text-normal';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import { FieldValueService } from '../../services/field-value';
import { lazy } from '../../annotations/inversify';
import moment from 'moment';
import TextBold from '../global/text/basic/text-bold';
const YEARS_18 = 568036800000;
class FieldValueDateClass extends Component {
    constructor(props) {
        super(props);
        this.isLessThan18 = (date) => {
            return ((new Date()).getTime() - (new Date(date)).getTime()) < YEARS_18;
        };
        this.onCloseModal = (date) => {
            if (this.isLessThan18(date)) {
                this.props.onCloseModal(date);
            }
        };
        this.onChange = (date) => __awaiter(this, void 0, void 0, function* () {
            if (this.isLessThan18(date)) {
                this.onCloseModal(date);
                this.onChange(new Date(this.state.value || '01-01-2000'));
                return;
            }
            this.setState(prevState => (Object.assign({}, prevState, { value: date, error: '' })));
            return this.persist(date);
        });
        this.wrapValue = (value) => {
            return this.createFieldValue(value);
        };
        this.calcValue = () => {
            const value = this.props.fieldData.fieldValues
                .map(it => it.value)
                .toString();
            if (this.isLessThan18(value)) {
                return new Date('01-01-2000');
            }
            return value && !Number.isNaN(+value) ? new Date(+value) : new Date('01-01-2000');
        };
        this.createFieldValue = (value) => {
            return this.fieldValueService
                .createNew(this.props.section, this.props.subSection, this.props.field, value);
        };
        this.state = Object.assign({}, this.state, { value: this.calcValue() });
    }
    getMaxDate() {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date;
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockSpace, { height: 20 }),
            React.createElement(UiBlockLeft, null,
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBottom, null,
                        React.createElement(TextNormal, { style: styles.label }, "Birthday"))),
                React.createElement(DatePicker, { showIcon: false, customStyles: {
                        dateTouchBody: styles.dateTouchBody,
                        dateInput: styles.dateInput
                    }, style: { flex: 1 }, date: this.state.value, mode: "date", androidMode: "calendar", format: "MMM DD YYYY", confirmBtnText: "Confirm", cancelBtnText: "Cancel", placeholder: "Choose date", onDateChange: this.onChange, onCloseModal: this.onCloseModal })),
            React.createElement(UiBlockSpace, { height: 3 }),
            React.createElement(LineFullWidth, { style: styles.line }),
            this.state.error ? (React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(TextBold, { style: styles.error }, this.state.error))) : (null)));
    }
    persist(date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isLessThan18(date)) {
                return;
            }
            const parsedDate = moment(date, 'MMM DD YYYY');
            this.wrapValue(parsedDate.toDate()
                .valueOf())
                .then(fieldValue => {
                return this.props.onValueUpdated([fieldValue]);
            })
                .catch((error) => __awaiter(this, void 0, void 0, function* () {
                error = (yield error) ? error.json() : error;
                if (error && error.errors && error.errors['Validation Errors']) {
                    this.setState(Object.assign({}, this.state, { error: error.errors['Validation Errors'] }));
                }
            }));
        });
    }
}
__decorate([
    lazy('FieldValueService'),
    __metadata("design:type", FieldValueService)
], FieldValueDateClass.prototype, "fieldValueService", void 0);
const FieldValueDate = ({ field, fieldData, onValueUpdated, section, subSection, onCloseModal }) => (React.createElement(FieldValueDateClass, { key: field.id, onValueUpdated: onValueUpdated, fieldData: fieldData, field: field, subSection: subSection, section: section, onCloseModal: onCloseModal }));
const styles = StyleSheet.create({
    dateTouchBody: {
        height: 30
    },
    dateInput: {
        height: 30,
        borderWidth: 1,
        borderColor: '#B7B7B7'
    },
    label: {
        color: '#8C8C8C',
        paddingRight: 10
    },
    line: {
        backgroundColor: '#A6B4BD'
    },
    error: {
        color: '#D9242B',
        fontSize: 14
    }
});
export default FieldValueDate;
//# sourceMappingURL=date.js.map