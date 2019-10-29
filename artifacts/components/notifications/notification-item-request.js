import React from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import TextNormal from '../global/text/basic/text-normal';
import UiBlockVerticalCenter from '../ui/block/vertical-center';
import UiBlockHorizontal from '../ui/block/horizontal';
var View = Animated.View;
const NotificationItemRequest = (props) => {
    const renderApproveButton = () => {
        if (props.state === 'approved') {
            return React.createElement(Image, { source: require('Musl/images/notifications/icon-request-approved.png') });
        }
        return React.createElement(Image, { source: require('Musl/images/notifications/icon-request-approve.png') });
    };
    const renderDenyButton = () => {
        if (props.state === 'denied') {
            return React.createElement(Image, { source: require('Musl/images/notifications/icon-request-denied.png') });
        }
        return React.createElement(Image, { source: require('Musl/images/notifications/icon-request-deny.png') });
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(UiBlockVerticalCenter, null,
            React.createElement(View, null,
                React.createElement(TextNormal, { onPress: props.onNickNamePress, style: styles.nickName }, props.nickName),
                React.createElement(UiBlockSpaceHorizontal, { width: 5 }),
                React.createElement(TextNormal, null, props.action))),
        props.state !== 'approved' && props.state !== 'denied' ? (React.createElement(View, { style: {
                flexDirection: 'column',
                justifyContent: 'center'
            } },
            React.createElement(UiBlockHorizontal, null,
                React.createElement(TouchableOpacity, { onPress: props.requestApprovePress }, renderApproveButton()),
                React.createElement(UiBlockSpaceHorizontal, { width: 10 }),
                React.createElement(TouchableOpacity, { onPress: props.requestDenyPress }, renderDenyButton())))) : null));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    nickName: {
        color: '#5DA4E5'
    }
});
export default NotificationItemRequest;
//# sourceMappingURL=notification-item-request.js.map