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
import TextNormal from '../global/text/basic/text-normal';
import UiBlockBasic from '../ui/block/basic';
import UiBlockBottom from '../ui/block/bottom';
import UiBlockSpace from '../ui/block/space';
const maxValueLength = 400;
const getSymbolsRemained = (maxLength, text = '') => {
    return maxLength - text.length;
};
class ProfileViewTextInputStateful extends Component {
    constructor(props) {
        super(props);
        this.textChanged = (text) => {
            this.changeValue(text);
        };
        this.changeValue = (text) => __awaiter(this, void 0, void 0, function* () {
            this.setState(prevState => (Object.assign({}, prevState, { value: text, changed: true, saved: false })));
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
                React.createElement(TextInput, { multiline: true, numberOfLines: 5, editable: true, placeholder: this.placeholder, placeholderTextColor: '#8D8D8D', value: this.state.value, maxLength: maxValueLength, style: styles.textInput, onChangeText: this.textChanged })),
            React.createElement(UiBlockBottom, null,
                React.createElement(View, { style: styles.bottomRight },
                    React.createElement(TextNormal, { style: styles.counter }, getSymbolsRemained(maxValueLength, this.state.value)),
                    this.state.changed ? (React.createElement(TouchableOpacity, { style: styles.btnContainer, onPress: () => this.props.onValueUpdated(this.state.value) },
                        React.createElement(Image, { source: require('Musl/images/profile/icon-checkmark-save.png') }))) : (null),
                    this.state.saved ? (React.createElement(Image, { style: { marginLeft: 10 }, source: require('Musl/images/profile/icon-check.png') })) : (null)))));
    }
}
const ProfileViewTextInputLimited = ({ body, placeholder, onValueUpdated }) => (React.createElement(ProfileViewTextInputStateful, { body: body, placeholder: placeholder, onValueUpdated: onValueUpdated }));
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
    counter: {
        color: '#AABFE3',
        fontSize: 16
    },
    smallButton: {
        width: 22,
        height: 22
    },
    btnContainer: {
        marginLeft: 10
    },
    bottomRight: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
export default ProfileViewTextInputLimited;
//# sourceMappingURL=text-limited.js.map