import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import TextNormal from '../global/text/basic/text-normal';
var View = Animated.View;
import reactStringReplace from 'react-string-replace';
const NotificationItemMessage = (props) => {
    const notificationText = reactStringReplace(props.action, 'message', (match) => {
        return (React.createElement(TextNormal, { style: styles.messageLabel, onPress: props.onPress }, match));
    });
    return (React.createElement(View, { style: {
            flex: 1,
            justifyContent: 'center'
        } },
        React.createElement(View, null,
            React.createElement(TextNormal, { onPress: props.onNickNamePress, style: styles.nickName }, props.nickName),
            React.createElement(UiBlockSpaceHorizontal, { width: 5 }),
            React.createElement(TextNormal, null, notificationText))));
};
const styles = StyleSheet.create({
    nickName: {
        color: '#5DA4E5'
    },
    messageLabel: {
        color: '#5DA4E5'
    }
});
export default NotificationItemMessage;
//# sourceMappingURL=notification-item-message.js.map