import React from 'react';
import { StyleSheet } from 'react-native';
import TextButton from './text-button';
const NavigationTextButtonWhite = (props) => (React.createElement(TextButton, { style: [styles.whiteButton, props.disabled && styles.whiteButtonDisabled], onPress: props.onPress, disabled: props.disabled }, props.children));
export default NavigationTextButtonWhite;
const styles = StyleSheet.create({
    whiteButton: {
        alignSelf: 'flex-start',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1
        },
        textShadowRadius: 1
    },
    whiteButtonDisabled: {
        color: '#ABABAB',
        textShadowColor: undefined
    }
});
//# sourceMappingURL=text-button-white.js.map