var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import UiBlockBasic from '../ui/block/basic';
import UiBlockBottom from '../ui/block/bottom';
import UiBlockSpace from '../ui/block/space';
class ProfileViewMessage extends Component {
    constructor(props) {
        super(props);
        this.textChanged = (text) => {
            this.changeValue(text);
        };
        this.changeValue = (text) => __awaiter(this, void 0, void 0, function* () {
            this.setState(prevState => (Object.assign({}, prevState, { value: text, changed: text.length > 0, saved: false })));
        });
        this.state = {
            value: this.props.body,
            changed: false,
            saved: false
        };
    }
    get placeholder() {
        return this.props.placeholder;
    }
    render() {
        return (React.createElement(UiBlockBasic, { style: { flex: 1 } },
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(View, { style: styles.textContainer },
                React.createElement(TextInput, { multiline: true, numberOfLines: 5, editable: true, placeholder: this.placeholder, placeholderTextColor: '#8D8D8D', value: this.state.value, style: styles.textInput, onChangeText: this.textChanged })),
            React.createElement(UiBlockBottom, null,
                React.createElement(View, { style: styles.bottomContainer },
                    React.createElement(View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center'
                        } }),
                    this.state.changed ? (React.createElement(TouchableOpacity, { onPress: () => this.props.onValueUpdated(this.state.value) },
                        React.createElement(Image, { source: require('Musl/images/messages/icon-chat-reply.png') }))) : (null)))));
    }
}
const styles = StyleSheet.create({
    textContainer: {
        width: '100%',
        height: 130
    },
    textInput: {
        color: 'rgb(46, 46, 46)',
        textAlignVertical: 'top',
        fontSize: 17
    },
    smallButton: {
        width: 22,
        height: 22
    },
    btnContainer: {
        width: 22,
        height: 22
    },
    linkText: {
        color: 'rgb(169, 169, 169)',
        fontSize: 16,
        textAlignVertical: 'center'
    },
    bottomContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
export default ProfileViewMessage;
//# sourceMappingURL=message-view.js.map