import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockRight from '../ui/block/right';
const ModalCloseBtn = ({ onPress }) => (React.createElement(UiBlockRight, null,
    React.createElement(TouchableOpacity, { style: styles.modalClose, onPress: onPress },
        React.createElement(Image, { source: require('Musl/images/global/icon-btn-close.png') }))));
export default ModalCloseBtn;
const styles = StyleSheet.create({
    modalWindow: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.90)'
    },
    modalClose: {
        paddingRight: 20
    }
});
//# sourceMappingURL=modal-close-btn.js.map