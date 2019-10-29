import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const TextButton = (props) => (React.createElement(TouchableOpacity, { onPress: props.onPress, disabled: props.disabled },
    React.createElement(Text, { style: props.style }, props.children)));
export default TextButton;
//# sourceMappingURL=text-button.js.map