import React, { Component } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextNormal from '../global/text/basic/text-normal';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import UiBlockBasic from '../ui/block/basic';
import UiBlockSpace from '../ui/block/space';
import UiBlockRight from '../ui/block/right';
import configuration from '../../configs/index';
import PhotoView from 'react-native-photo-view';
import NCView from '../global/non-clipping-view';
export default class ChatItemMe extends Component {
    constructor(props) {
        super(props);
        this.togglePicture = () => {
            this.setState(prevState => (Object.assign({}, this.state, { showPicture: !prevState.showPicture })));
        };
        this.state = {
            showPicture: false
        };
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(UiBlockRight, null,
                React.createElement(NCView, { style: styles.messageBaloonContainer },
                    this.props.type === 'TEXT' ? (React.createElement(View, { style: styles.messageBaloon },
                        React.createElement(TextNormal, { style: styles.message }, this.props.message))) : (React.createElement(View, { style: styles.messageBaloon },
                        React.createElement(TouchableOpacity, { onPress: this.togglePicture },
                            React.createElement(Image, { style: styles.picture, source: { uri: `${configuration.remoteApi.base}/medias/download/${this.props.message}?type=SMALL` } })),
                        React.createElement(Modal, { visible: this.state.showPicture, transparent: false, onRequestClose: this.togglePicture },
                            React.createElement(PhotoView, { style: { flex: 1 }, source: { uri: `${configuration.remoteApi.base}/medias/download/${this.props.message}` } }),
                            React.createElement(TouchableOpacity, { style: styles.closeBtn, onPress: this.togglePicture },
                                React.createElement(Image, { source: require('Musl/images/global/btn-close.png') }))))),
                    React.createElement(Image, { style: styles.borderArrow, resizeMode: 'stretch', source: require('Musl/images/messages/arrow-gray.png') })),
                React.createElement(UiBlockSpaceHorizontal, { width: 12 }),
                React.createElement(Image, { style: styles.userPicture, source: this.props.userPicture })),
            React.createElement(UiBlockSpace, { height: 10 })));
    }
}
const styles = StyleSheet.create({
    userPicture: {
        width: 56,
        height: 56,
        borderRadius: 28
    },
    closeBtn: {
        position: 'absolute',
        right: 15,
        bottom: 8
    },
    picture: {
        flex: 1,
        height: 300
    },
    messageBaloonContainer: {
        flex: 1,
        paddingRight: 10
    },
    messageBaloon: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#A4A4A4',
        borderRadius: 5,
        padding: 10
    },
    message: {
        color: 'black',
        lineHeight: 20
    },
    borderArrow: {
        position: 'absolute',
        top: 0,
        right: -1,
        width: 20,
        height: 15
    }
});
//# sourceMappingURL=chat-item-me.js.map