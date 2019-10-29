import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
import TextNormal from '../global/text/basic/text-normal';
const BlockedUsersSection = ({ onBlockedUsersPress }) => (React.createElement(UiBlockBasic, null,
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(UiBlockBasic, { style: styles.content },
        React.createElement(TouchableOpacity, { onPress: onBlockedUsersPress },
            React.createElement(View, { style: styles.button },
                React.createElement(TextNormal, { style: styles.buttonText }, "Review Blocked Users")))),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder })));
const styles = StyleSheet.create({
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        backgroundColor: '#F2F2F2',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black'
    }
});
export default BlockedUsersSection;
//# sourceMappingURL=blocked-users-section.js.map