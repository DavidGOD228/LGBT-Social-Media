import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockVertical = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockVertical;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    }
});
//# sourceMappingURL=vertical.js.map