import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import TextNormal from '../text/basic/text-normal';
const PopupButton = (props) => (React.createElement(TouchableOpacity, { onPress: props.onPress },
    React.createElement(TextNormal, { style: styles.text }, props.children)));
const styles = StyleSheet.create({
    text: {
        color: '#5DA4E5'
    }
});
export default PopupButton;
//# sourceMappingURL=button.js.map