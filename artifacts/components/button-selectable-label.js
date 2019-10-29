import React from 'react';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';
import UiBlockHorizontal from './ui/block/horizontal';
import TextNormal from './global/text/basic/text-normal';
import UiBlockBasic from './ui/block/basic';
import UiBlockVerticalCenter from './ui/block/vertical-center';
const ButtonSelectableLabel = ({ item, label, onPress }) => {
    return (React.createElement(TouchableOpacity, { onPress: onPress, style: [styles.floatButton, item.isSelected && styles.floatButtonSelected] },
        React.createElement(UiBlockHorizontal, null,
            label ? label : React.createElement(View, { style: styles.label }),
            React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(TextNormal, { style: [styles.floatButtonText, item.isSelected && styles.floatButtonTextSelected] }, item.value.value))))));
};
export default ButtonSelectableLabel;
const styles = StyleSheet.create({
    floatButton: {
        backgroundColor: 'rgb(242, 242, 242)',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 3,
        paddingRight: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#A5B4BD'
    },
    label: {
        marginTop: 1,
        marginBottom: 1,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    floatButtonSelected: {
        backgroundColor: 'rgb(77, 146, 223)',
    },
    floatButtonText: {
        fontSize: 14,
        color: 'rgb(92, 92, 92)',
        textAlign: 'center'
    },
    floatButtonTextSelected: {
        color: '#fff',
    },
    labelText: {
        color: 'white',
        fontSize: 18,
        width: 16,
        height: 16,
        textAlign: 'center',
        justifyContent: 'center'
    }
});
//# sourceMappingURL=button-selectable-label.js.map