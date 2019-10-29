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

const LogoutSection = ({onLogoutPress}) => (
  <UiBlockBasic>
    <LineFullWidth style={styles.titleBottomBorder}/>
    <UiBlockSpace height={15}/>
    <UiBlockBasic style={styles.content}>
      <TouchableOpacity onPress={onLogoutPress}>
        <TextBold style={styles.text}>{i18n.t('settings.logout.logout')}</TextBold>
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
    color: '#4D92DF',
    fontSize: 18
  }
})

export default LogoutSection
