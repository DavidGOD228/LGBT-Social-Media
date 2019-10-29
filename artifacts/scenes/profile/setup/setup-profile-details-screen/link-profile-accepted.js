import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockSpace from '../../../../components/ui/block/space';
import i18n from '../../../../locales/i18n';
import TextNormal from '../../../../components/global/text/basic/text-normal';
import UiBlockLeft from '../../../../components/ui/block/left';
import UiBlockSpaceHorizontal from '../../../../components/ui/block/space-horizontal';
import UiBlockBasic from '../../../../components/ui/block/basic';
import UiBlockVerticalCenter from '../../../../components/ui/block/vertical-center';
const LinkProfileAcceptedComponent = (props) => {
    const unlinkPressed = () => {
        props.onUnlink();
    };
    return (React.createElement(View, null,
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(TextNormal, { style: styles.linkAccountNote }, i18n.t(`profile.details.sections.LinkProfile.note.${props.profileType}`)),
        React.createElement(UiBlockSpace, { height: 30 }),
        React.createElement(UiBlockLeft, null,
            React.createElement(TouchableOpacity, { onPress: props.onProfilePress },
                React.createElement(Image, { style: styles.partnerAvatar, source: props.avatar })),
            React.createElement(UiBlockSpaceHorizontal, { width: 10 }),
            React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(TouchableOpacity, { onPress: props.onProfilePress },
                        React.createElement(TextNormal, { style: styles.partnerName }, props.partnerNickname)),
                    React.createElement(TextNormal, null, i18n.t('profile.details.sections.LinkProfile.linkedText')))),
            React.createElement(UiBlockSpaceHorizontal, { width: 18 }),
            React.createElement(UiBlockVerticalCenter, null,
                React.createElement(TouchableOpacity, { onPress: unlinkPressed },
                    React.createElement(Image, { source: require('Musl/images/profile/icon-unlink-profile.png') }))))));
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
    },
    partnerName: {
        color: '#5DA4E5'
    },
    partnerAvatar: {
        width: 50,
        height: 50
    }
});
export default LinkProfileAcceptedComponent;
//# sourceMappingURL=link-profile-accepted.js.map