import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextMedium from '../text/basic/text-medium';
const PopupHeader = (props) => (React.createElement(View, { style: styles.container },
    React.createElement(TextMedium, { style: styles.text }, props.children)));
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        backgroundColor: '#F0D17F',
        paddingLeft: 30,
        paddingRight: 30,
    },
    text: {
        color: '#000000',
        fontSize: 18
    }
});
export default PopupHeader;
//# sourceMappingURL=header.js.map