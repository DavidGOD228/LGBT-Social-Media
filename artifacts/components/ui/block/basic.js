import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockBasic = ({ children, style = {} }) => (React.createElement(View, { style: [styles.container, style] }, children));
export default UiBlockBasic;
const styles = StyleSheet.create({
    container: {}
});
//# sourceMappingURL=basic.js.map