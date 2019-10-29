import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import UiBlockVerticalCenter from '../ui/block/vertical-center';
import UiBlockLeft from '../ui/block/left';
const ModalLeftBtn = (props) => (React.createElement(UiBlockLeft, null,
    React.createElement(TouchableOpacity, { style: styles.modalAcceptBtn, onPress: props.onPress, disabled: props.disabled },
        React.createElement(UiBlockVerticalCenter, null,
            React.createElement(Text, { style: [styles.modalAcceptBtnText, props.disabled ? styles.modalAcceptBtnTextDisabled : {}] }, props.children)))));
export default ModalLeftBtn;
const styles = StyleSheet.create({
    modalAcceptBtn: {
        backgroundColor: '#5BDAFD',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    modalAcceptBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    },
    modalAcceptBtnTextDisabled: {
        color: '#ABABAB'
    }
});
//# sourceMappingURL=modal-left-btn.js.map