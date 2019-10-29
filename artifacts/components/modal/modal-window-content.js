import React from 'react';
import { StyleSheet, View } from 'react-native';
import UiBlockLeft from '../ui/block/left';
const ModalWindowContent = ({ children }) => (React.createElement(UiBlockLeft, null,
    React.createElement(View, { style: styles.container }, children)));
export default ModalWindowContent;
const styles = StyleSheet.create({
    container: {
        paddingLeft: 40,
        paddingRight: 40
    }
});
//# sourceMappingURL=modal-window-content.js.map