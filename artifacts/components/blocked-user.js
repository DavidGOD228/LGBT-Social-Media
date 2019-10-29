import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockBasic from './ui/block/basic';
import UiBlockSpace from './ui/block/space';
import UiBlockLeft from './ui/block/left';
import UiBlockSpaceHorizontal from './ui/block/space-horizontal';
import TextNormal from './global/text/basic/text-normal';
import UiBlockVerticalCenter from './ui/block/vertical-center';
export default class BlockedUser extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(UiBlockLeft, null,
                React.createElement(Image, { style: styles.userPicture, source: this.props.userPicture }),
                React.createElement(UiBlockSpaceHorizontal, { width: 12 }),
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(TextNormal, null, this.props.userName)),
                React.createElement(UiBlockSpaceHorizontal, { width: 12 }),
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(TouchableOpacity, { onPress: this.props.onUnblockPress },
                        React.createElement(Image, { source: require('Musl/images/notifications/icon-request-approved.png') })))),
            React.createElement(UiBlockSpace, { height: 10 })));
    }
}
const styles = StyleSheet.create({
    userPicture: {
        width: 56,
        height: 56,
        borderRadius: 28
    }
});
//# sourceMappingURL=blocked-user.js.map