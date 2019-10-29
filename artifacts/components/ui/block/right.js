import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockRight = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockRight;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});
//# sourceMappingURL=right.js.map