import React from 'react';
import { StyleSheet, Text } from 'react-native';
const TextNormal = ({ style, children, numberOfLines, onPress }) => (React.createElement(Text, { onPress: onPress, numberOfLines: numberOfLines, style: [styles.text, style] }, children));
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Uniform',
        fontSize: 16,
        color: 'rgb(46, 46, 46)'
    }
});
export default TextNormal;
//# sourceMappingURL=text-normal.js.map