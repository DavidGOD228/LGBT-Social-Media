import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockSpace from '../../../../components/ui/block/space';
import i18n from '../../../../locales/i18n';
import TextNormal from '../../../../components/global/text/basic/text-normal';
import UiBlockHorizontalEdges from '../../../../components/ui/block/horizontal-edges';
const LinkRequestSentComponent = (props) => {
    return (React.createElement(View, null,
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(TextNormal, { style: styles.linkAccountNote }, i18n.t(`profile.details.sections.LinkProfile.note.${props.profileType}`)),
        React.createElement(UiBlockSpace, { height: 40 }),
        React.createElement(TextNormal, { style: styles.data }, props.partnerEmail),
        React.createElement(UiBlockSpace, { height: 25 }),
        React.createElement(TextNormal, { style: styles.data }, props.partnerNickname),
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(UiBlockHorizontalEdges, null,
            React.createElement(View, { style: { width: 200 } },
                React.createElement(TextNormal, { style: { color: '#9B9B9B' } }, i18n.t('profile.details.sections.LinkProfile.requestSent'))),
            React.createElement(TouchableOpacity, { onPress: () => props.onResendPressed(props.partnerEmail, props.partnerNickname) },
                React.createElement(TextNormal, { style: styles.submit }, "Resend")))));
};
const styles = StyleSheet.create({
    linkAccountNote: {
        color: 'rgb(46, 46, 46)',
        fontSize: 14,
        lineHeight: 20
    },
    submit: {
        padding: 15,
        color: '#5DA4E5',
        fontSize: 20
    },
    data: {
        fontSize: 18,
        color: 'black'
    }
});
export default LinkRequestSentComponent;
//# sourceMappingURL=link-request-sent.js.map