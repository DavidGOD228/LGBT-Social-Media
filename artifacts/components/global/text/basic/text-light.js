import React from 'react';
import { StyleSheet, Text } from 'react-native';
const TextLight = ({ style, children }) => (React.createElement(Text, { style: [styles.text, style] }, children));
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Uniform-Light',
        fontSize: 16,
        color: 'rgb(46, 46, 46)'
    }
});
export default TextLight;
//# sourceMappingURL=text-light.js.map