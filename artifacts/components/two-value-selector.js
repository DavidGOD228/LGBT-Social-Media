import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockHorizontalEdges from './ui/block/horizontal-edges';
import UiBlockBasic from './ui/block/basic';
import TextNormal from './global/text/basic/text-normal';
const SelectorItem = (props) => (React.createElement(UiBlockBasic, { style: { flex: 1 } },
    React.createElement(TouchableOpacity, { onPress: props.buttonPressed },
        React.createElement(UiBlockBasic, { style: [styles.button, props.selected && styles.selectedButton] },
            React.createElement(TextNormal, { style: [styles.buttonText, props.selected && styles.selectedButtonText] }, props.value)))));
const TwoValueSelector = ({ valLeft, valRight, selectedValue, valSelected }) => {
    return (React.createElement(UiBlockHorizontalEdges, null,
        React.createElement(SelectorItem, { value: valLeft, selected: selectedValue === valLeft, buttonPressed: () => valSelected(valLeft) }),
        React.createElement(SelectorItem, { value: valRight, selected: selectedValue === valRight, buttonPressed: () => valSelected(valRight) })));
};
const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'rgb(46, 46, 46)',
        fontSize: 14
    },
    selectedButton: {
        backgroundColor: '#4D92DF'
    },
    selectedButtonText: {
        color: 'white'
    }
});
export default TwoValueSelector;
//# sourceMappingURL=two-value-selector.js.map