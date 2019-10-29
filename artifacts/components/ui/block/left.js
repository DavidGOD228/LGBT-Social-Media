import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockLeft = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockLeft;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
});
//# sourceMappingURL=left.js.map