import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import UiBlockBasic from '../ui/block/basic';
import TextNormal from '../global/text/basic/text-normal';
import UiBlockSpace from '../ui/block/space';
import TextBold from '../global/text/basic/text-bold';
export default class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.textChanged = (text) => {
            this.changeAnswer(text);
        };
        this.sendButtonPressed = () => {
            this.props.onSendButtonPressed(this.state.answer);
        };
        this.changeAnswer = (text) => {
            this.setState(Object.assign({}, this.state, { answer: text }));
        };
        this.state = Object.assign({}, this.state);
    }
    render() {
        const { author, message, userPressed, messagePressed, deleteButtonPressed } = this.props;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.content },
                React.createElement(TouchableOpacity, { onPress: userPressed },
                    React.createElement(UiBlockBasic, { style: styles.userPictureContainer }, author && (React.createElement(Image, { style: styles.userPicture, source: author.avatar })))),
                React.createElement(View, { style: styles.messageContainer },
                    React.createElement(UiBlockBasic, { style: styles.messageTextContainer },
                        React.createElement(TouchableOpacity, { onPress: messagePressed },
                            React.createElement(TextNormal, { numberOfLines: 3, style: styles.messageText },
                                React.createElement(TextBold, null, author ? author.nickname : ''),
                                ': ' + message))),
                    React.createElement(TouchableOpacity, { onPress: deleteButtonPressed },
                        React.createElement(Image, { style: styles.trash, source: require('Musl/images/messages/icon-trash.png') })))),
            React.createElement(View, { style: styles.actions },
                React.createElement(TextInput, { onChangeText: this.textChanged, onFocus: this.props.onItemFocus, value: this.state.answer, style: styles.input, placeholder: 'Reply' }),
                React.createElement(TouchableOpacity, { onPress: () => this.sendButtonPressed() },
                    React.createElement(Image, { style: styles.reply, source: require('Musl/images/messages/icon-reply.png') }))),
            React.createElement(UiBlockSpace, { height: 30 })));
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    content: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userPictureContainer: {
        width: 55,
        height: 55
    },
    userPicture: {
        width: 45,
        height: 45,
        borderRadius: 23
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageTextContainer: {
        flex: 1
    },
    messageText: {
        fontSize: 18,
        lineHeight: 20,
        color: '#797979'
    },
    trash: {
        width: 26,
        height: 26,
        marginLeft: 10
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 55,
        borderWidth: 1,
        borderColor: '#EEF1F4',
        borderRadius: 3,
        paddingLeft: 7
    },
    input: {
        flex: 1,
        height: 37,
        color: '#000000'
    },
    reply: {
        marginLeft: 7,
        marginRight: 7
    },
    swipeButtonContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    }
});
//# sourceMappingURL=message-item.js.map