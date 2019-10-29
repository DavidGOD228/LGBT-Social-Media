var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockBottom from '../../ui/block/bottom';
import TextNormal from '../../global/text/basic/text-normal';
import { debounce } from '../../../annotations/eval';
import UnitConverter from '../../../utils/unit-converter';
class HeightInputMetricStateful extends Component {
    constructor(props) {
        super(props);
        this.submitHeightPressed = () => {
            return this.props.persist(UnitConverter.heightCmToM(this.state.cm));
        };
        this.heightChanged = (text) => {
            this.setState(Object.assign({}, this.state, { cm: text }));
            this.persistHeight();
        };
        this.calcValueHeight = () => {
            return this.props.fieldData.fieldValues
                .map(it => UnitConverter.heightMToCm(it.value))
                .toString();
        };
        this.state = Object.assign({}, this.state, { cm: this.calcValueHeight() });
    }
    render() {
        return (React.createElement(View, { style: {
                flex: 1,
                flexDirection: 'row'
            } },
            React.createElement(View, { style: styles.rightContent },
                React.createElement(View, { style: styles.textContainer },
                    React.createElement(TextInput, { multiline: false, editable: true, keyboardType: 'numeric', returnKeyType: 'done', onEndEditing: this.submitHeightPressed, value: +this.state.cm > 0 ? this.state.cm : '', style: styles.textInput, onChangeText: this.heightChanged })),
                React.createElement(UiBlockBasic, null,
                    React.createElement(UiBlockBottom, null,
                        React.createElement(TextNormal, { style: styles.metrics }, "cm"))))));
    }
    persistHeight() {
        if (!this.state.cm) {
            return;
        }
        return this.props.persist(UnitConverter.heightCmToM(this.state.cm));
    }
}
__decorate([
    debounce(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HeightInputMetricStateful.prototype, "persistHeight", null);
const HeightInputMetric = ({ fieldData, persist, metrics }) => (React.createElement(HeightInputMetricStateful, { fieldData: fieldData, metrics: metrics, persist: persist }));
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
export default HeightInputMetric;
//# sourceMappingURL=height-input-metric.js.map