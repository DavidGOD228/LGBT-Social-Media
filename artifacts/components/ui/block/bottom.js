import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockBottom = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockBottom;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
});
//# sourceMappingURL=bottom.js.map