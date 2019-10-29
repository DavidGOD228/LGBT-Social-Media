import React from 'react';
import { StyleSheet, Text } from 'react-native';
const ModalWindowTitle = ({ children }) => (React.createElement(Text, { style: styles.title }, children));
export default ModalWindowTitle;
const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    }
});
//# sourceMappingURL=modal-window-title.js.map