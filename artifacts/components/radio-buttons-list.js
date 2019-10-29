import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioButtonItem from './radio-button-item';
const RadioButtonsList = (props) => {
    if (props.items === null || props.items.length === 0) {
        return null;
    }
    return (React.createElement(View, { style: styles.buttonContainer }, props.items.map(item => React.createElement(RadioButtonItem, { key: item.key, item: item, onPress: () => props.onItemSelected(item) }))));
};
export default RadioButtonsList;
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'column'
    }
});
//# sourceMappingURL=radio-buttons-list.js.map