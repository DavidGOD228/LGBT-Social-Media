import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonSelectable from './button-selectable';
const SelectableButtonsList = (props) => {
    if (props.items === null || props.items.length === 0) {
        return null;
    }
    return (React.createElement(View, { style: styles.buttonContainer }, props.items.map(item => React.createElement(ButtonSelectable, { key: item.key, item: item, onPress: () => props.onItemSelected(item) }))));
};
export default SelectableButtonsList;
const styles = StyleSheet.create({
    buttonContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    }
});
//# sourceMappingURL=selectable-buttons-list.js.map