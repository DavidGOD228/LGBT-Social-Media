import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
import i18n from '../../locales/i18n';
import TextBold from '../global/text/basic/text-bold';
const LogoutSection = ({ onLogoutPress }) => (React.createElement(UiBlockBasic, null,
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
    React.createElement(UiBlockSpace, { height: 15 }),
    React.createElement(UiBlockBasic, { style: styles.content },
        React.createElement(TouchableOpacity, { onPress: onLogoutPress },
            React.createElement(TextBold, { style: styles.text }, i18n.t('settings.logout.logout')))),
    React.createElement(UiBlockSpace, { height: 13 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder })));
const styles = StyleSheet.create({
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        color: '#4D92DF',
        fontSize: 18
    }
});
export default LogoutSection;
//# sourceMappingURL=log-out-section.js.map