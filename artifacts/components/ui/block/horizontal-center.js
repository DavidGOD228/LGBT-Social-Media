import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockHorizontalCenter = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockHorizontalCenter;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
//# sourceMappingURL=horizontal-center.js.map