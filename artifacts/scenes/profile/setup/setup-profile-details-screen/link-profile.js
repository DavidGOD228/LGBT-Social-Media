import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockSpace from '../../../../components/ui/block/space';
import i18n from '../../../../locales/i18n';
import TextNormal from '../../../../components/global/text/basic/text-normal';
import Input from '../../../../components/input';
import TextBold from '../../../../components/global/text/basic/text-bold';
import UiBlockRight from '../../../../components/ui/block/right';
const LinkProfileComponent = (props) => {
    let email = '';
    let nickname = '';
    return (React.createElement(View, null,
        React.createElement(UiBlockSpace, { height: 20 }),
        !props.error && (React.createElement(TextNormal, { style: styles.linkAccountNote }, i18n.t(`profile.details.sections.LinkProfile.note.${props.profileType}`))),
        props.error && (React.createElement(TextBold, { style: styles.error }, props.error.message)),
        React.createElement(Input, { placeholder: 'Email Address', keyboardType: 'email-address', autoCapitalize: 'none', textColor: props.error ? 'rgb(213, 0, 0)' : undefined, baseColor: props.error ? 'rgb(213, 0, 0)' : undefined, onChangeText: text => email = text }),
        React.createElement(Input, { placeholder: 'Username', textColor: props.error ? 'rgb(213, 0, 0)' : undefined, baseColor: props.error ? 'rgb(213, 0, 0)' : undefined, onChangeText: text => nickname = text }),
        React.createElement(UiBlockSpace, { height: 10 }),
        React.createElement(UiBlockRight, null,
            React.createElement(TouchableOpacity, { onPress: () => props.onSubmitPressed(email, nickname) },
                React.createElement(TextNormal, { style: styles.submit }, i18n.t('common.buttons.submit'))))));
};
const styles = StyleSheet.create({
    linkAccountNote: {
        color: 'rgb(46, 46, 46)',
        fontSize: 14,
        lineHeight: 20
    },
    error: {
        color: 'rgb(213, 0, 0)'
    },
    submit: {
        padding: 15,
        color: '#5DA4E5',
        fontSize: 20
    }
});
export default LinkProfileComponent;
//# sourceMappingURL=link-profile.js.map