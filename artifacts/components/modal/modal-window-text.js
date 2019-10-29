import React from 'react';
import { StyleSheet, Text } from 'react-native';
const ModalWindowText = ({ children }) => (React.createElement(Text, { style: styles.text }, children));
export default ModalWindowText;
const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});
//# sourceMappingURL=modal-window-text.js.map