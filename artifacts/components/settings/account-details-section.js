import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockBasic from '../ui/block/basic';
import CollapsingSection from '../collapsing-section';
import i18n from '../../locales/i18n';
import UiBlockSpace from '../ui/block/space';
import TextNormal from '../global/text/basic/text-normal';
var Image = Animated.Image;
const AccountDetailsSection = (props) => (React.createElement(CollapsingSection, { title: i18n.t('settings.accountDetails.sectionTitle'), completed: false },
    React.createElement(UiBlockSpace, { height: 15 }),
    React.createElement(UiBlockBasic, null,
        React.createElement(View, { style: styles.fieldContainer },
            React.createElement(TextNormal, { style: styles.label }, "Your Email"),
            React.createElement(TouchableOpacity, { onPress: props.onEmailInfoPressed },
                React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') }))),
        React.createElement(TextNormal, { style: styles.email }, props.email),
        React.createElement(UiBlockSpace, { height: 5 }),
        React.createElement(TouchableOpacity, { onPress: props.onChangeEmailPressed },
            React.createElement(TextNormal, { style: styles.updateBtn }, "Change Email"))),
    React.createElement(UiBlockSpace, { height: 15 }),
    React.createElement(UiBlockBasic, null,
        React.createElement(View, { style: styles.fieldContainer },
            React.createElement(TextNormal, { style: styles.label }, "Password"),
            React.createElement(TouchableOpacity, { onPress: props.onPasswordInfoPressed },
                React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') }))),
        React.createElement(TextNormal, { style: styles.email }, '\u2022\u2022\u2022\u2022\u2022\u2022\u2022'),
        React.createElement(UiBlockSpace, { height: 5 }),
        React.createElement(TouchableOpacity, { onPress: props.onChangePasswordPressed },
            React.createElement(TextNormal, { style: styles.updateBtn }, "Change Password")))));
const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        color: '#B5ABAB',
        fontSize: 14
    },
    email: {
        fontSize: 22,
        color: 'black'
    },
    updateBtn: {
        fontSize: 14,
        color: '#4D92DF'
    }
});
export default AccountDetailsSection;
//# sourceMappingURL=account-details-section.js.map