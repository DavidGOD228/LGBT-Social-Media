import React, { Component } from 'react';
import UiBlockBasic from '../ui/block/basic';
import PopupHeader from '../global/popup/header';
import i18n from '../../locales/i18n';
import UiBlockSpace from '../ui/block/space';
import TextNormal from '../global/text/basic/text-normal';
import SelectableButtonsList from '../selectable-buttons-list';
import LineFullWidth from '../global/line-full-width';
import { StyleSheet, TextInput, View } from 'react-native';
import PopupTwoButtonsContainer from '../global/popup/two-buttons-container';
import PopupButton from '../global/popup/button';
export default class ReportUserComponent extends Component {
    constructor(props) {
        super(props);
        this.messageChanged = (text) => {
            this.setState(Object.assign({}, this.state, { message: text }));
        };
        this.сategorySelected = (item) => {
            item.isSelected = !item.isSelected;
            this.setState(Object.assign({}, this.state));
        };
        this.submitButtonPressed = () => {
            this.setState(Object.assign({}, this.state, { submitted: true }));
            this.props.onSubmitReportPressed(this.state.message, this.state.categories);
        };
        this.state = Object.assign({}, this.state, { submitted: false, message: '', categories: [
                {
                    value: 'inappropriateBehavior',
                    title: 'Inappropriate Behaviour',
                    isSelected: false,
                    key: 'behaviour'
                },
                {
                    value: 'wrongUniverse',
                    title: 'Wrong Universe',
                    isSelected: false,
                    key: 'universe'
                },
                {
                    value: 'harassingMe',
                    title: 'Harassing Me',
                    isSelected: false,
                    key: 'harassing'
                }
            ] });
    }
    render() {
        return (React.createElement(UiBlockBasic, null,
            React.createElement(PopupHeader, null, i18n.t('profile.report.popup.title')),
            React.createElement(UiBlockSpace, { height: 15 }),
            this.state.submitted ? (React.createElement(UiBlockBasic, { style: {
                    paddingLeft: 30,
                    paddingRight: 30
                } },
                React.createElement(TextNormal, { style: { fontSize: 16, lineHeight: 18 } }, i18n.t('profile.report.popup.response')),
                React.createElement(UiBlockSpace, { height: 40 }))) : (React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockBasic, { style: {
                        paddingLeft: 30,
                        paddingRight: 30
                    } },
                    React.createElement(SelectableButtonsList, { items: this.state.categories, onItemSelected: this.сategorySelected })),
                React.createElement(UiBlockSpace, { height: 20 }),
                React.createElement(UiBlockBasic, { style: {
                        paddingLeft: 30,
                        paddingRight: 30
                    } },
                    React.createElement(TextNormal, { style: { fontSize: 18 } }, "Other:"),
                    React.createElement(UiBlockSpace, { height: 7 }),
                    React.createElement(LineFullWidth, null),
                    React.createElement(UiBlockSpace, { height: 5 }),
                    React.createElement(TextInput, { multiline: true, numberOfLines: 5, editable: true, placeholder: 'Tell MUSL what`s going on', placeholderTextColor: '#8D8D8D', style: styles.reportInput, value: this.state.message, onChangeText: this.messageChanged })))),
            React.createElement(UiBlockBasic, { style: {
                    paddingLeft: 30,
                    paddingRight: 30
                } },
                React.createElement(LineFullWidth, null),
                React.createElement(UiBlockSpace, { height: 15 })),
            this.state.submitted ? (React.createElement(PopupTwoButtonsContainer, null,
                React.createElement(View, null),
                React.createElement(PopupButton, { onPress: this.props.onCloseReportPopupPressed }, i18n.t('common.buttons.close')))) : (React.createElement(PopupTwoButtonsContainer, null,
                React.createElement(PopupButton, { onPress: this.props.onCancelReportPressed }, i18n.t('common.buttons.cancel')),
                React.createElement(PopupButton, { onPress: this.submitButtonPressed }, i18n.t('common.buttons.submit')))),
            React.createElement(UiBlockSpace, { height: 15 })));
    }
}
const styles = StyleSheet.create({
    reportInput: {
        color: 'rgb(46, 46, 46)',
        textAlignVertical: 'top',
        fontSize: 17,
        height: 80
    }
});
//# sourceMappingURL=report-user.js.map