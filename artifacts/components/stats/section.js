import React from 'react';
import { StyleSheet } from 'react-native';
import TextMedium from '../global/text/basic/text-medium';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
const StatsSection = (props) => (React.createElement(UiBlockBasic, null,
    React.createElement(UiBlockSpace, { height: 20 }),
    React.createElement(TextMedium, { style: styles.sectionTitle }, props.title),
    React.createElement(UiBlockSpace, { height: 13 }),
    props.children,
    React.createElement(UiBlockSpace, { height: 15 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder })));
const styles = StyleSheet.create({
    sectionTitle: {
        color: 'black',
        fontSize: 18
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
});
export default StatsSection;
//# sourceMappingURL=section.js.map