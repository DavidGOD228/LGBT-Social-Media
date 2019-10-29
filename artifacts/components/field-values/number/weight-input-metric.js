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
import { debounce } from '../../../annotations/eval';
class WeightInputMetricStateful extends Component {
    constructor(props) {
        super(props);
        this.weightChanged = (text) => __awaiter(this, void 0, void 0, function* () {
            this.setState(Object.assign({}, this.state, { value: text }));
            return this.persistWeight();
        });
        this.submitWeightPressed = () => {
            return this.props.persist(this.state.value);
        };
        this.calcValue = () => {
            return this.props.fieldData.fieldValues
                .map(it => Math.round(+it.value))
                .toString();
        };
        this.state = Object.assign({}, this.state, { value: this.calcValue() });
    }
    render() {
        return (React.createElement(View, { style: styles.rightContent },
            React.createElement(View, { style: styles.textContainer },
                React.createElement(TextInput, { multiline: false, editable: true, keyboardType: 'numeric', returnKeyType: 'done', onEndEditing: this.submitWeightPressed, value: this.state.value, style: styles.textInput, onChangeText: this.weightChanged })),
            React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockBottom, null,
                    React.createElement(TextNormal, { style: styles.metrics }, "kg")))));
    }
    persistWeight() {
        if (!this.state.value) {
            return;
        }
        return this.props.persist(this.state.value);
    }
}
__decorate([
    debounce(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WeightInputMetricStateful.prototype, "persistWeight", null);
const WeightInputMetric = ({ fieldData, persist, metrics }) => (React.createElement(WeightInputMetricStateful, { fieldData: fieldData, metrics: metrics, persist: persist }));
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
    metrics: {
        color: '#8C8C8C'
    }
});
export default WeightInputMetric;
//# sourceMappingURL=weight-input-metric.js.map