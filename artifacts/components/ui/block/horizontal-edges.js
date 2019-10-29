import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockHorizontalEdges = ({ children }) => (React.createElement(View, { style: styles.container }, children));
export default UiBlockHorizontalEdges;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
//# sourceMappingURL=horizontal-edges.js.map