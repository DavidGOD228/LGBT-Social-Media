import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import TextNormal from '../../global/text/basic/text-normal';
import UiBlockSpaceHorizontal from '../../ui/block/space-horizontal';
const MultichatItemLeft = (props) => (React.createElement(View, { style: styles.container },
    React.createElement(UiBlockSpaceHorizontal, { width: 3 }),
    React.createElement(Image, { style: styles.avatar, source: props.avatar }),
    React.createElement(UiBlockSpaceHorizontal, { width: 3 }),
    React.createElement(TextNormal, { style: styles.nickname, numberOfLines: 1 }, props.nickname)));
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    }
});
export default MultichatItemLeft;
//# sourceMappingURL=item-left.js.map