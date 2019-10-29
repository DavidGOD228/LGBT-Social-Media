import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
const KeyboardAvoidingWrapper = (props) => {
    if (Platform.OS === 'android') {
        return (React.createElement(View, { style: props.style }, props.children));
    }
    return (React.createElement(KeyboardAvoidingView, { behavior: props.behavior || 'padding', style: props.style, keyboardVerticalOffset: props.keyboardVerticalOffset || 0 }, props.children));
};
export default KeyboardAvoidingWrapper;
//# sourceMappingURL=keyboard-avoiding-wrapper.js.map