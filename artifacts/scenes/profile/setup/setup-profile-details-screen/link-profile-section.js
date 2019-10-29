import React from 'react';
import { View } from 'react-native';
import UiBlockSpace from '../../../../components/ui/block/space';
import CollapsingSection from '../../../../components/collapsing-section';
import i18n from '../../../../locales/i18n';
import LinkRequestSentComponent from './link-request-sent';
import LinkProfileComponent from './link-profile';
import LinkProfileAcceptedComponent from './link-profile-accepted';
const LinkProfileSection = (props) => {
    return (React.createElement(View, null,
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(CollapsingSection, { title: i18n.t('profile.details.sections.LinkProfile.name'), completed: props.requestAccepted },
            props.requestSent && (React.createElement(LinkRequestSentComponent, { profileType: props.profileType, partnerEmail: props.partnerEmail, partnerNickname: props.partnerNickname, onResendPressed: props.onSubmitPress })),
            props.requestAccepted && props.avatar && props && (React.createElement(LinkProfileAcceptedComponent, { onUnlink: props.onUnlinkPress, profileType: props.profileType, avatar: props.avatar, partnerNickname: props.partnerNickname, onProfilePress: props.onProfilePress })),
            (!props.requestSent && !props.requestAccepted) && (React.createElement(LinkProfileComponent, { error: props.error, profileType: props.profileType, onSubmitPressed: props.onSubmitPress })))));
};
export default LinkProfileSection;
//# sourceMappingURL=link-profile-section.js.map