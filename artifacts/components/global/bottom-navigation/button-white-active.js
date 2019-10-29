import React from 'react';
import { StyleSheet } from 'react-native';
import TextButton from './text-button';
const NavigationButtonWhiteActive = (props) => (React.createElement(TextButton, { style: [styles.whiteButton, !props.isActive && styles.whiteButtonDisabled], onPress: props.onPress, disabled: false }, props.children));
export default NavigationButtonWhiteActive;
const styles = StyleSheet.create({
    whiteButton: {
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
//# sourceMappingURL=button-white-active.js.map