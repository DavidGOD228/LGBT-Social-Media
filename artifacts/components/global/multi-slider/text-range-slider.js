import React, { Component } from 'react';
import UiBlockHorizontalEdges from '../../ui/block/horizontal-edges';
import TextNormal from '../text/basic/text-normal';
import RangeSlider from './range-slider';
import { View } from 'react-native';
export default class TextRangeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.values || [props.min, props.max],
            min: props.min,
            max: props.max
        };
    }
    render() {
        return React.createElement(View, { style: { width: '100%' } },
            React.createElement(UiBlockHorizontalEdges, null,
                React.createElement(TextNormal, { style: { color: '#a9a9a9' } }, this.props.min),
                React.createElement(TextNormal, { style: { fontSize: 24 } },
                    `${this.state.values[0]} - ${this.state.values[1]}`,
                    this.state.values[1] === this.props.max ? '+' : ''),
                React.createElement(TextNormal, { style: { color: '#a9a9a9' } },
                    this.props.max,
                    "+")),
            React.createElement(RangeSlider, { min: this.props.min, max: this.props.max, values: this.props.values, onValuesChange: (values) => this.setState(Object.assign({}, this.state, { values })), onValuesChangeFinish: this.props.onValuesChangeFinish }));
    }
}
//# sourceMappingURL=text-range-slider.js.map