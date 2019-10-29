import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
const ModalWindow = (props) => (React.createElement(Modal, { transparent: true, visible: props.visible, onRequestClose: () => console.log('close') },
    React.createElement(View, { style: styles.modalWindow }, props.children)));
export default ModalWindow;
const styles = StyleSheet.create({
    modalWindow: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.90)'
    }
});
//# sourceMappingURL=modal-window.js.map