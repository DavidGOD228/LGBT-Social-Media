import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockVerticalCenter = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockVerticalCenter;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
//# sourceMappingURL=vertical-center.js.map