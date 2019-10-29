import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import TextNormal from '../global/text/basic/text-normal';
var View = Animated.View;
const NotificationItemFavorite = (props) => {
    return (React.createElement(View, { style: {
            flex: 1,
            justifyContent: 'center'
        } },
        React.createElement(View, null,
            React.createElement(TextNormal, { onPress: props.onNickNamePress, style: styles.nickName }, props.nickName),
            React.createElement(UiBlockSpaceHorizontal, { width: 5 }),
            React.createElement(TextNormal, { onPress: props.onPress }, props.action))));
};
const styles = StyleSheet.create({
    nickName: {
        color: '#5DA4E5'
    }
});
export default NotificationItemFavorite;
//# sourceMappingURL=notification-item-favorite.js.map