import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UiBlockHorizontal from './ui/block/horizontal';
import UiBlockBasic from './ui/block/basic';
import TextBold from './global/text/basic/text-bold';
import NCView from './global/non-clipping-view';
const ActionItem = (props) => (React.createElement(NCView, { style: styles.itemContainer },
    React.createElement(TouchableOpacity, { onPress: props.onItemClick },
        React.createElement(UiBlockHorizontal, null,
            React.createElement(UiBlockBasic, null,
                React.createElement(Image, { source: props.actionImage })),
            React.createElement(Text, { style: styles.actionText }, props.children))),
    props.counter ? (React.createElement(View, { style: styles.newNotification },
        React.createElement(TextBold, { style: styles.newNotificationText }, props.counter))) : (null)));
export default ActionItem;
const styles = StyleSheet.create({
    itemContainer: {
        paddingBottom: 20
    },
    actionText: {
        color: 'grey',
        marginLeft: 10
    },
    newNotification: {
        position: 'absolute',
        left: 15,
        top: -10,
        zIndex: 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#CE0B24',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    newNotificationText: {
        color: 'white',
        fontSize: 13
    }
});
//# sourceMappingURL=action-item.js.map