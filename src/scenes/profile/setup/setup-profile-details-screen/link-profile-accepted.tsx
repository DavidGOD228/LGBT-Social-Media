import React from 'react'
import {
  Image,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockSpace from '../../../../components/ui/block/space'
import i18n from '../../../../locales/i18n'
import TextNormal from '../../../../components/global/text/basic/text-normal'
import UiBlockLeft from '../../../../components/ui/block/left'
import UiBlockSpaceHorizontal from '../../../../components/ui/block/space-horizontal'
import UiBlockBasic from '../../../../components/ui/block/basic'
import UiBlockVerticalCenter from '../../../../components/ui/block/vertical-center'

interface Props {
  profileType: string
  avatar: ImageURISource
  partnerNickname: string
  onProfilePress?: any
  onUnlink?: any
}

const LinkProfileAcceptedComponent = (props: Props) => {
  const unlinkPressed = () => {
    props.onUnlink()
  }

  return (
    <View>
      <UiBlockSpace height={20}/>
      <TextNormal style={styles.linkAccountNote}>
        {i18n.t(`profile.details.sections.LinkProfile.note.${props.profileType}`)}
      </TextNormal>

      <UiBlockSpace height={30}/>

      <UiBlockLeft>
        <TouchableOpacity onPress={props.onProfilePress}>
          <Image style={styles.partnerAvatar}
                 source={props.avatar}/>
        </TouchableOpacity>
        <UiBlockSpaceHorizontal width={10}/>

        <UiBlockBasic>
          <UiBlockVerticalCenter>
            <TouchableOpacity onPress={props.onProfilePress}>
              <TextNormal style={styles.partnerName}>{props.partnerNickname}</TextNormal>
            </TouchableOpacity>
            <TextNormal>{i18n.t('profile.details.sections.LinkProfile.linkedText')}</TextNormal>
          </UiBlockVerticalCenter>
        </UiBlockBasic>
        <UiBlockSpaceHorizontal width={18}/>

        <UiBlockVerticalCenter>
          <TouchableOpacity onPress={unlinkPressed}>
            <Image source={require('Musl/images/profile/icon-unlink-profile.png')}/>
          </TouchableOpacity>
        </UiBlockVerticalCenter>
      </UiBlockLeft>
    </View>
  )
}

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
})

export default LinkProfileAcceptedComponent
