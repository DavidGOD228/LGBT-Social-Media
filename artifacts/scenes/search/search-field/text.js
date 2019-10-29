import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import UiBlockBasic from '../../../components/ui/block/basic';
import UiBlockRight from '../../../components/ui/block/right';
class FieldValueTextInputStateful extends Component {
    constructor(props) {
        super(props);
        this.onChange = (text) => {
            this.setState(prevState => (Object.assign({}, prevState, { value: text })));
            this.props.onUpdate(text);
        };
        this.state = {
            value: props.value
        };
    }
    get placeholder() {
        return this.props.placeHolder;
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(TextInput, { multiline: true, numberOfLines: 5, editable: true, placeholder: this.placeholder, placeholderTextColor: '#8D8D8D', value: this.state.value, style: styles.textInput, onChangeText: this.onChange }),
            React.createElement(UiBlockRight, null)));
    }
}
const FieldValueTextInput = ({ value, onUpdate, placeHolder }) => (React.createElement(FieldValueTextInputStateful, { value: value, onUpdate: onUpdate, placeHolder: placeHolder }));
const styles = StyleSheet.create({
    textInput: {
        color: 'rgb(46, 46, 46)',
        textAlignVertical: 'top'
    },
    counter: {
        color: '#AABFE3',
        fontSize: 16,
        textAlignVertical: 'center'
    },
    smallButton: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5
    }
});
export default FieldValueTextInput;
//# sourceMappingURL=text.js.map