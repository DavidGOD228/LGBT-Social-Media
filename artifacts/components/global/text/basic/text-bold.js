import React from 'react';
import { StyleSheet, Text } from 'react-native';
const TextBold = ({ style, children, ellipsizeMode }) => (React.createElement(Text, { style: [styles.text, style], ellipsizeMode: ellipsizeMode }, children));
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Uniform-Bold',
        fontSize: 16,
        color: 'rgb(46, 46, 46)'
    }
});
export default TextBold;
//# sourceMappingURL=text-bold.js.map