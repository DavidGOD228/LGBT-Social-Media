import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import UiBlockHorizontalCenter from '../ui/block/horizontal-center';
const ModalTextBtn = (props) => (React.createElement(TouchableOpacity, { onPress: props.onPress },
    React.createElement(UiBlockHorizontalCenter, null,
        React.createElement(Text, { style: styles.modalDeclineBtnText }, props.children))));
export default ModalTextBtn;
const styles = StyleSheet.create({
    modalDeclineBtnText: {
        color: '#6B8090',
        fontWeight: 'bold',
        fontSize: 18
    }
});
//# sourceMappingURL=modal-text-btn.js.map