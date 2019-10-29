import React from 'react';
import TextRangeSlider from './text-range-slider';
const MultiSlider = (props) => {
    return React.createElement(TextRangeSlider, { values: props.value, min: props.min, max: props.max, onValuesChangeFinish: props.onUpdate });
};
export default MultiSlider;
//# sourceMappingURL=multi-slider.js.map