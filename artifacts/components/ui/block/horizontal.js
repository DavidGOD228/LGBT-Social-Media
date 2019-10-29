import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockHorizontal = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockHorizontal;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});
//# sourceMappingURL=horizontal.js.map