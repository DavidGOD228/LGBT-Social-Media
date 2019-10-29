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
import DatePicker from 'react-native-datepicker';
import UiBlockBasic from '../../../components/ui/block/basic';
import UiBlockLeft from '../../../components/ui/block/left';
import UiBlockBottom from '../../../components/ui/block/bottom';
import TextNormal from '../../../components/global/text/basic/text-normal';
import UiBlockSpace from '../../../components/ui/block/space';
import LineFullWidth from '../../../components/global/line-full-width';
class FieldValueDateClass extends Component {
    constructor(props) {
        super(props);
        this.onChange = (date) => __awaiter(this, void 0, void 0, function* () {
            this.setState(prevState => (Object.assign({}, prevState, { value: date })));
            this.props.restrictionMap[this.props.restrictionPath] = {
                field: this.props.restrictionPath,
                values: [date],
                operator: 'In'
            };
        });
        this.calcValue = () => {
            const restriction = this.props.restrictionMap[this.props.restrictionPath];
            return restriction ? new Date(+restriction.values.toString()) : undefined;
        };
        this.state = {
            value: this.calcValue()
        };
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
                    }, style: { flex: 1 }, date: this.state.value, mode: "date", maxDate: this.getMaxDate(), androidMode: "calendar", format: "MMM DD YYYY", confirmBtnText: "Confirm", cancelBtnText: "Cancel", placeholder: "Choose date", onDateChange: this.onChange })),
            React.createElement(UiBlockSpace, { height: 3 }),
            React.createElement(LineFullWidth, { style: styles.line })));
    }
}
const FieldValueDate = ({ field, section, subSection, restrictionMap, restrictionPath }) => (React.createElement(FieldValueDateClass, { field: field, subSection: subSection, section: section, restrictionMap: restrictionMap, restrictionPath: restrictionPath }));
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
    }
});
export default FieldValueDate;
//# sourceMappingURL=date.js.map