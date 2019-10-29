import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockTop = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockTop;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
});
//# sourceMappingURL=top.js.map