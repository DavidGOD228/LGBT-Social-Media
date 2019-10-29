import React from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockBasic from '../ui/block/basic'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import i18n from '../../locales/i18n'
import SettingsRadioButton from './radio-button'
import TextBold from '../global/text/basic/text-bold'

const SwitcherSection = ({usePhotos = false, onChangeUsePhotos, onInfoPress}) => (
  <UiBlockBasic>
    <LineFullWidth style={styles.titleBottomBorder}/>
    <UiBlockSpace height={10}/>

    <SettingsRadioButton value={usePhotos} onChange={onChangeUsePhotos}>
      <UiBlockBasic>
        <TextBold>
          {i18n.t('settings.switcher.usePhotos')}
        </TextBold>
        <TouchableOpacity style={styles.infoIcon} onPress={onInfoPress}>
          <Image source={require('Musl/images/global/icon-btn-info.png')}/>
        </TouchableOpacity>
      </UiBlockBasic>
    </SettingsRadioButton>

    <UiBlockSpace height={10}/>
    <LineFullWidth style={styles.titleBottomBorder}/>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  infoIcon: {
    position: 'absolute',
    top: -7,
    right: -30
  }
})

export default SwitcherSection
