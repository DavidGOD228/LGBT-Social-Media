import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import UiBlockVerticalCenter from '../ui/block/vertical-center';
import UiBlockHorizontalCenter from '../ui/block/horizontal-center';
const ModalFullWidthBtn = (props) => (React.createElement(TouchableOpacity, { style: styles.modalAcceptBtn, onPress: props.onPress, disabled: props.disabled },
    React.createElement(UiBlockVerticalCenter, null,
        React.createElement(UiBlockHorizontalCenter, null,
            React.createElement(Text, { style: [styles.buttonText, props.disabled ? styles.buttonTextDisabled : {}] }, props.children)))));
export default ModalFullWidthBtn;
const styles = StyleSheet.create({
    modalAcceptBtn: {
        backgroundColor: '#5BDAFD',
        height: 50
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
//# sourceMappingURL=modal-fullwidth-btn.js.map