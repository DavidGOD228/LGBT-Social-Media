import React from 'react'
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockBasic from '../ui/block/basic'
import CollapsingSection from '../collapsing-section'
import i18n from '../../locales/i18n'
import UiBlockSpace from '../ui/block/space'
import TextNormal from '../global/text/basic/text-normal'
import Image = Animated.Image

interface Props {
  email
  onEmailInfoPressed
  onPasswordInfoPressed
  onChangeEmailPressed
  onChangePasswordPressed
}

const AccountDetailsSection = (props: Props) => (
  <CollapsingSection title={i18n.t('settings.accountDetails.sectionTitle')} completed={false}>
    <UiBlockSpace height={15}/>
    <UiBlockBasic>
      <View style={styles.fieldContainer}>
        <TextNormal style={styles.label}>Your Email</TextNormal>
        <TouchableOpacity onPress={props.onEmailInfoPressed}>
          <Image source={require('Musl/images/global/icon-btn-info.png')}/>
        </TouchableOpacity>
      </View>
      <TextNormal style={styles.email}>{props.email}</TextNormal>
      <UiBlockSpace height={5}/>
      <TouchableOpacity onPress={props.onChangeEmailPressed}>
        <TextNormal style={styles.updateBtn}>Change Email</TextNormal>
      </TouchableOpacity>
    </UiBlockBasic>
    <UiBlockSpace height={15}/>
    <UiBlockBasic>
      <View style={styles.fieldContainer}>
        <TextNormal style={styles.label}>Password</TextNormal>
        <TouchableOpacity onPress={props.onPasswordInfoPressed}>
          <Image source={require('Musl/images/global/icon-btn-info.png')}/>
        </TouchableOpacity>
      </View>
      <TextNormal style={styles.email}>{'\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}</TextNormal>
      <UiBlockSpace height={5}/>
      <TouchableOpacity onPress={props.onChangePasswordPressed}>
        <TextNormal style={styles.updateBtn}>Change Password</TextNormal>
      </TouchableOpacity>
    </UiBlockBasic>
  </CollapsingSection>
)

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
})

export default AccountDetailsSection
