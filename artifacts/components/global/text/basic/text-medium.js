import React from 'react';
import { StyleSheet, Text } from 'react-native';
const TextMedium = ({ style, children }) => (React.createElement(Text, { style: [styles.text, style] }, children));
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Uniform-Medium',
        fontSize: 16,
        color: 'rgb(46, 46, 46)'
    }
});
export default TextMedium;
//# sourceMappingURL=text-medium.js.map