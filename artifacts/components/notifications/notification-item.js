import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockHorizontal from '../ui/block/horizontal';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import UiBlockSpace from '../ui/block/space';
import UiBlockBasic from '../ui/block/basic';
import NotificationItemMessage from './notification-item-message';
import NotificationItemFavorite from './notification-item-favorite';
import NotificationItemView from './notification-item-view';
import NotificationItemFlex from './notification-item-flex';
import NotificationItemRequest from './notification-item-request';
const notificationsTypes = {
    ["PROFILE_WAS_VIEWED" /* profileViewed */]: NotificationItemView,
    ["PROFILE_WAS_FAVORITE" /* profileFavorited */]: NotificationItemFavorite,
    ["PROFILE_WAS_FLEXED" /* profileFlexed */]: NotificationItemFlex,
    ["MESSAGE" /* message */]: NotificationItemMessage,
    ["MEDIA_REQUEST" /* mediaRequest */]: NotificationItemRequest
};
export default class NotificationItem extends Component {
    constructor() {
        super(...arguments);
        this.renderItemContent = () => {
            const { type } = this.props;
            const component = notificationsTypes[type];
            return component(this.props);
        };
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(UiBlockHorizontal, null,
                React.createElement(TouchableOpacity, { onPress: this.props.onNickNamePress },
                    React.createElement(Image, { style: styles.userPicture, source: this.props.userPicture })),
                React.createElement(UiBlockSpaceHorizontal, { width: 10 }),
                this.renderItemContent()),
            React.createElement(UiBlockSpace, { height: 10 })));
    }
}
const styles = StyleSheet.create({
    userPicture: {
        width: 45,
        height: 45,
        borderRadius: 23
    },
    notificationContent: {
        flex: 1,
        flexDirection: 'row'
    }
});
//# sourceMappingURL=notification-item.js.map