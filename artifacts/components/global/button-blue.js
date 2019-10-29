import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import UiBlockVerticalCenter from '../ui/block/vertical-center';
import UiBlockLeft from '../ui/block/left';
const ButtonBlue = (props) => (React.createElement(UiBlockLeft, null,
    React.createElement(TouchableOpacity, { style: styles.button, onPress: props.onPress, disabled: props.disabled },
        React.createElement(UiBlockVerticalCenter, null,
            React.createElement(Text, { style: [styles.buttonText, props.disabled ? styles.buttonTextDisabled : {}] }, props.children)))));
export default ButtonBlue;
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5BDAFD',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    },
    buttonTextDisabled: {
        color: '#ABABAB'
    }
});
//# sourceMappingURL=button-blue.js.map