import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import TextNormal from '../../global/text/basic/text-normal';
import UiBlockSpaceHorizontal from '../../ui/block/space-horizontal';
const MultichatItemRightWithActions = (props) => (React.createElement(View, { style: styles.container },
    React.createElement(UiBlockSpaceHorizontal, { width: 3 }),
    props.added && (React.createElement(Image, { style: styles.avatar, source: props.avatar })),
    React.createElement(UiBlockSpaceHorizontal, { width: 3 }),
    React.createElement(TextNormal, { numberOfLines: 1, style: [styles.nickname, !props.added && { color: '#8C8C8C' }] }, props.nickname),
    React.createElement(UiBlockSpaceHorizontal, { width: 5 }),
    React.createElement(TouchableOpacity, { onPress: props.onToggleLinkedProfile }, props.added ? (React.createElement(Image, { style: styles.action, source: require('Musl/images/messages/icon-unlink-profile.png') })) : (React.createElement(Image, { style: styles.action, source: require('Musl/images/messages/icon-link-profile.png') })))));
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    avatar: {
        width: 26,
        height: 26
    },
    nickname: {
        fontSize: 14,
        color: 'black',
        flex: 1
    },
    action: {
        width: 26,
        height: 26
    }
});
export default MultichatItemRightWithActions;
//# sourceMappingURL=item-right-with-actions.js.map