import React from 'react';
import { StyleSheet } from 'react-native';
import TextMedium from '../global/text/basic/text-medium';
import UiBlockRight from '../ui/block/right';
import UiBlockBasic from '../ui/block/basic';
const StatsValue = (props) => (React.createElement(UiBlockBasic, { style: styles.valueContainer },
    React.createElement(UiBlockRight, null,
        React.createElement(TextMedium, { style: [styles.value, props.styles] }, props.children))));
const styles = StyleSheet.create({
    valueContainer: {
        width: 70,
        paddingRight: 10
    },
    value: {
        fontSize: 24,
    },
});
export default StatsValue;
//# sourceMappingURL=value.js.map