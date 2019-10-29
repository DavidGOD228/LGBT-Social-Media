import React from 'react';
import { StyleSheet, View } from 'react-native';
const UiBlockSpace = ({ height }) => (React.createElement(View, { style: [styles.container, height ? { height } : {}] }));
export default UiBlockSpace;
const styles = StyleSheet.create({
    container: {
        height: 10,
        width: 1
    }
});
//# sourceMappingURL=space.js.map