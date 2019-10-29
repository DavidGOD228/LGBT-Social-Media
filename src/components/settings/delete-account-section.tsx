import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
import i18n from '../../locales/i18n'
import TextBold from '../global/text/basic/text-bold'

const DeleteAccountSection = ({onDeletePress}) => (
  <UiBlockBasic>
    <LineFullWidth style={styles.titleBottomBorder}/>
    <UiBlockSpace height={15}/>
    <UiBlockBasic style={styles.content}>
      <TouchableOpacity onPress={onDeletePress}>
        <TextBold style={styles.text}>{i18n.t('settings.deleteAccount.delete')}</TextBold>
      </TouchableOpacity>
    </UiBlockBasic>
    <UiBlockSpace height={13}/>
    <LineFullWidth style={styles.titleBottomBorder}/>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: '#CE0724',
    fontSize: 18
  }
})

export default DeleteAccountSection
