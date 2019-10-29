var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import UiBlockBasic from '../../../components/ui/block/basic';
import UiBlockLeft from '../../../components/ui/block/left';
import TextNormal from '../../../components/global/text/basic/text-normal';
import LineFullWidth from '../../../components/global/line-full-width';
import UiBlockSpace from '../../../components/ui/block/space';
import UiBlockBottom from '../../../components/ui/block/bottom';
import i18n from '../../../locales/i18n';
import UiBlockRight from '../../../components/ui/block/right';
class FieldValueNumberStateful extends Component {
    constructor(props) {
        super(props);
        this.calcValue = () => {
            const restriction = this.props.restrictionMap[this.props.restrictionPath];
            return restriction && restriction.values.toString();
        };
        this.onChange = (text) => __awaiter(this, void 0, void 0, function* () {
            this.setState(prevState => (Object.assign({}, prevState, { value: text })));
            this.props.restrictionMap[this.props.restrictionPath] = {
                field: this.props.restrictionPath,
                values: [text],
                operator: 'In'
            };
        });
        this.state = {
            value: this.calcValue()
        };
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockSpace, { height: 20 }),
            React.createElement(UiBlockLeft, null,
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBottom, null,
                        React.createElement(TextNormal, { style: styles.label }, this.label))),
                React.createElement(View, { style: { flex: 3 } },
                    React.createElement(TextInput, { multiline: false, editable: true, keyboardType: 'numeric', value: this.state.value, style: styles.textInput, onChangeText: this.onChange })),
                React.createElement(UiBlockRight, null,
                    React.createElement(UiBlockBasic, null,
                        React.createElement(UiBlockBottom, null,
                            React.createElement(TextNormal, { style: styles.metrics }, this.metrics))))),
            React.createElement(LineFullWidth, { style: styles.line })));
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
const FieldValueNumber = ({ field, subSection, section, restrictionMap, restrictionPath }) => (React.createElement(FieldValueNumberStateful, { field: field, restrictionMap: restrictionMap, restrictionPath: restrictionPath, subSection: subSection, section: section }));
const styles = StyleSheet.create({
    textInput: {
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
    }
});
export default FieldValueNumber;
//# sourceMappingURL=number.js.map