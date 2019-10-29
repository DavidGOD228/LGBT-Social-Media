import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
const ModalWindowTransparent = (props) => (React.createElement(Modal, { transparent: true, visible: props.visible, onRequestClose: () => console.log('close'), animationType: 'slide' },
    React.createElement(View, { style: styles.modalWindow }, props.children)));
export default ModalWindowTransparent;
const styles = StyleSheet.create({
    modalWindow: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'flex-end'
    }
});
//# sourceMappingURL=modal-window-transparent.js.map