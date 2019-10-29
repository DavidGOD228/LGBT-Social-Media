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
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockBottom from '../../ui/block/bottom';
import TextNormal from '../../global/text/basic/text-normal';
import UnitConverter from '../../../utils/unit-converter';
import { debounce } from '../../../annotations/eval';
class HeightInputImperialStateful extends Component {
    constructor(props) {
        super(props);
        this.submitHeightPressed = () => {
            return this.props.persist(UnitConverter.heightImperialToMetric({
                ft: this.state.ft,
                inches: this.state.inches
            }));
        };
        this.heightChanged = (prop) => (text) => __awaiter(this, void 0, void 0, function* () {
            text = (prop === 'inches' && text > 11) ? 11 : text;
            this.setState(prevState => (Object.assign({}, prevState, { [prop]: text })));
            this.persistHeight();
        });
        this.calcValueHeight = () => {
            const value = this.props.fieldData.fieldValues
                .map(it => UnitConverter.heightMetricToImperial(it.value))
                .pop();
            return value ? value : {
                ft: 0,
                inches: 0
            };
        };
        this.state = Object.assign({}, this.state, this.calcValueHeight());
    }
    render() {
        return (React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row'
            } },
            React.createElement(View, { style: styles.rightContent },
                React.createElement(View, { style: styles.textContainer },
                    React.createElement(TextInput, { multiline: false, editable: true, keyboardType: 'numeric', returnKeyType: 'done', onEndEditing: this.submitHeightPressed, value: this.state.ft > 0 ? this.state.ft.toString() : '', style: styles.textInput, onChangeText: this.heightChanged('ft') })),
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBottom, null,
                        React.createElement(TextNormal, { style: styles.metrics }, "feet")))),
            React.createElement(View, { style: styles.rightContent },
                React.createElement(View, { style: styles.textContainer },
                    React.createElement(TextInput, { multiline: false, editable: true, keyboardType: 'numeric', returnKeyType: 'done', onEndEditing: this.submitHeightPressed, value: this.state.inches > 0 ? this.state.inches.toString() : '', style: styles.textInput, onChangeText: this.heightChanged('inches') })),
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBottom, null,
                        React.createElement(TextNormal, { style: styles.metrics }, "inches"))))));
    }
    persistHeight() {
        if (!this.state.ft && !this.state.inches) {
            return;
        }
        return this.props.persist(UnitConverter.heightImperialToMetric({
            ft: this.state.ft,
            inches: this.state.inches
        }));
    }
}
__decorate([
    debounce(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HeightInputImperialStateful.prototype, "persistHeight", null);
const HeightInputImperial = ({ fieldData, persist, metrics }) => (React.createElement(HeightInputImperialStateful, { fieldData: fieldData, metrics: metrics, persist: persist }));
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
    }
});
export default HeightInputImperial;
//# sourceMappingURL=height-input-imperial.js.map