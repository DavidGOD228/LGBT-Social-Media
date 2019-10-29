import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import UiBlockBasic from './ui/block/basic';
const Input = (props) => {
    const { maxLength, placeholder, value, keyboardType = 'default', autoCapitalize = 'sentences', secureTextEntry = false, onChangeText, error, showInfo = false, onInfoPress, textColor = '#000', baseColor = 'rgb(46, 46, 46)' } = props;
    const infoButton = (React.createElement(TouchableOpacity, { style: styles.infoSign, onPress: onInfoPress },
        React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') })));
    return (React.createElement(UiBlockBasic, null,
        React.createElement(TextField, { maxLength: maxLength, label: placeholder, value: value, error: error, keyboardType: keyboardType, autoCapitalize: autoCapitalize, secureTextEntry: secureTextEntry, onChangeText: onChangeText, textColor: textColor, baseColor: baseColor }),
        showInfo ? infoButton : null));
};
export default Input;
const styles = StyleSheet.create({
    infoSign: {
        position: 'absolute',
        right: 0,
        top: 33
    }
});
//# sourceMappingURL=input.js.map