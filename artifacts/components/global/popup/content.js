import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextNormal from '../text/basic/text-normal';
import LineFullWidth from '../line-full-width';
import UiBlockSpace from '../../ui/block/space';
const PopupContent = (props) => (React.createElement(View, { style: styles.container },
    React.createElement(TextNormal, { style: styles.text }, props.children),
    React.createElement(UiBlockSpace, { height: 15 }),
    React.createElement(LineFullWidth, null)));
const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30
    },
    text: {
        lineHeight: 20
    }
});
export default PopupContent;
//# sourceMappingURL=content.js.map