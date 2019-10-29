import React from 'react';
import MultiSlider from 'react-native-multi-slider';
import WhiteMarker from './white-marker';
import { View } from 'react-native';
const RangeSlider = (props) => {
    const values = props.values || [props.min, props.max];
    const onValuesChangeFinish = (rangeValues) => (props.onValuesChangeFinish && props.onValuesChangeFinish(rangeValues));
    const onValuesChange = (rangeValues) => (props.onValuesChange && props.onValuesChange(rangeValues));
    const me = this;
    const measureSliderLength = (event) => {
        me.sliderLength = event.nativeEvent.layout.width;
    };
    return (React.createElement(View, { style: { flex: 1 }, onLayout: measureSliderLength },
        React.createElement(MultiSlider, { values: values, min: props.min, max: props.max, onValuesChangeFinish: onValuesChangeFinish, onValuesChange: onValuesChange, unselectedStyle: { backgroundColor: '#b9b9b9' }, selectedStyle: { backgroundColor: '#4990E2' }, containerStyle: {
                height: 28,
                marginTop: 28
            }, trackStyle: { height: 3 }, customMarker: WhiteMarker, sliderLength: me.sliderLength })));
};
export default RangeSlider;
//# sourceMappingURL=range-slider.js.map