import React from 'react'
import {
  ImageURISource,
  View
} from 'react-native'
import UiBlockSpace from '../../../../components/ui/block/space'
import CollapsingSection from '../../../../components/collapsing-section'
import i18n from '../../../../locales/i18n'
import LinkRequestSentComponent from './link-request-sent'
import LinkProfileComponent from './link-profile'
import LinkProfileAcceptedComponent from './link-profile-accepted'

interface Props {
  profileType: string
  requestSent: boolean
  requestAccepted: boolean
  partnerEmail: string
  partnerNickname: string
  error?: any
  onSubmitPress: any
  onUnlinkPress: any
  avatar?: ImageURISource
  onProfilePress: any
}

const LinkProfileSection = (props: Props) => {
  return (
    <View>
      <UiBlockSpace height={20}/>
      <CollapsingSection
        title={i18n.t('profile.details.sections.LinkProfile.name')}
        completed={props.requestAccepted}>

        {props.requestSent && (
          <LinkRequestSentComponent
            profileType={props.profileType}
            partnerEmail={props.partnerEmail}
            partnerNickname={props.partnerNickname}
            onResendPressed={props.onSubmitPress}
          />
        )}

        {props.requestAccepted && props.avatar && props && (
          <LinkProfileAcceptedComponent
            onUnlink={props.onUnlinkPress}
            profileType={props.profileType}
            avatar={props.avatar}
            partnerNickname={props.partnerNickname}
            onProfilePress={props.onProfilePress}
          />
        )}

        {(!props.requestSent && !props.requestAccepted) && (
          <LinkProfileComponent
            error={props.error}
            profileType={props.profileType}
            onSubmitPressed={props.onSubmitPress}/>
        )}

      </CollapsingSection>
    </View>
  )
}

export default LinkProfileSection
