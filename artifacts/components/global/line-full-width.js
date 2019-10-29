import React from 'react';
import { View, StyleSheet } from 'react-native';
const LineFullWidth = (props) => (React.createElement(View, { style: [styles.line, props.style] }));
export default LineFullWidth;
const styles = StyleSheet.create({
    line: {
        height: 1,
        alignSelf: 'stretch',
        backgroundColor: 'grey'
    }
});
//# sourceMappingURL=line-full-width.js.map