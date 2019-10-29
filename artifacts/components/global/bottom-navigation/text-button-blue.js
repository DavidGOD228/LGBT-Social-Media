import React from 'react';
import { StyleSheet } from 'react-native';
import TextButton from './text-button';
const NavigationTextButtonBlue = (props) => (React.createElement(TextButton, { style: [styles.blueButton, props.disabled && styles.buttonDisabled], onPress: props.onPress, disabled: props.disabled }, props.children));
export default NavigationTextButtonBlue;
const styles = StyleSheet.create({
    blueButton: {
        color: '#5DA4E5',
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonDisabled: {
        color: '#ABABAB',
        textShadowColor: undefined
    }
});
//# sourceMappingURL=text-button-blue.js.map