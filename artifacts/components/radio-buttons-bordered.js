import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioButtonBordered from './radio-button-bordered';
const RadioButtonsBordered = (props) => {
    if (props.items === null || props.items.length === 0) {
        return null;
    }
    return (React.createElement(View, { style: styles.buttonContainer }, props.items.map(item => React.createElement(RadioButtonBordered, { key: item.key, item: item, onPress: () => props.onItemSelected(item) }))));
};
export default RadioButtonsBordered;
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '75%'
    }
});
//# sourceMappingURL=radio-buttons-bordered.js.map