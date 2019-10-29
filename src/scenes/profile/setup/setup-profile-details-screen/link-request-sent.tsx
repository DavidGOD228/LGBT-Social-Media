import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockSpace from '../../../../components/ui/block/space'
import i18n from '../../../../locales/i18n'
import TextNormal from '../../../../components/global/text/basic/text-normal'
import UiBlockHorizontalEdges from '../../../../components/ui/block/horizontal-edges'

interface Props {
  profileType: string
  partnerEmail: string
  partnerNickname: string
  onResendPressed: (email: string, nickname: string) => {}
}

const LinkRequestSentComponent = (props: Props) => {

  return (
    <View>
      <UiBlockSpace height={20}/>
      <TextNormal style={styles.linkAccountNote}>
        {i18n.t(`profile.details.sections.LinkProfile.note.${props.profileType}`)}
      </TextNormal>
      <UiBlockSpace height={40}/>
      <TextNormal style={styles.data}>{props.partnerEmail}</TextNormal>
      <UiBlockSpace height={25}/>
      <TextNormal style={styles.data}>{props.partnerNickname}</TextNormal>
      <UiBlockSpace height={20}/>

      <UiBlockHorizontalEdges>
        <View style={{width: 200}}>
          <TextNormal style={{color: '#9B9B9B'}}>
            {i18n.t('profile.details.sections.LinkProfile.requestSent')}
          </TextNormal>
        </View>

        <TouchableOpacity onPress={() => props.onResendPressed(props.partnerEmail, props.partnerNickname)}>
          <TextNormal style={styles.submit}>Resend</TextNormal>
        </TouchableOpacity>
      </UiBlockHorizontalEdges>
    </View>
  )
}

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
})

export default LinkRequestSentComponent
