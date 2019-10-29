import React from 'react'
import {StyleSheet} from 'react-native'
import CollapsingSection from '../collapsing-section'
import i18n from '../../locales/i18n'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
import SettingsRadioButton from './radio-button'
import TextNormal from '../global/text/basic/text-normal'

export interface AlertsComponentData {
  all: boolean
  notifications: boolean
  sound: boolean
  vibrate: boolean
}

interface Props {
  alerts: AlertsComponentData
  alertsAllChanged: (value: boolean) => void
  alertsNotificationsChanged: (value: boolean) => void
  alertsSoundChanged: (value: boolean) => void
  alertsVibrationChanged: (value: boolean) => void
  infoPressed: () => void
}

const AlertsSection = (props: Props) => (
  <CollapsingSection
    title={i18n.t('settings.alerts.sectionTitle')}
    infoPressed={props.infoPressed}
    completed={false}>
    <UiBlockSpace height={10}/>
    <LineFullWidth style={styles.titleBottomBorder}/>
    <UiBlockSpace height={10}/>
    <UiBlockBasic style={styles.fieldsContainer}>
      {/*<SettingsRadioButton value={props.alerts.all} onChange={val => props.alertsAllChanged(val)}>*/}
      {/*<TextNormal>*/}
      {/*{i18n.t('settings.alerts.all')}*/}
      {/*</TextNormal>*/}
      {/*</SettingsRadioButton>*/}
      {/*<UiBlockSpace height={10}/>*/}
      <SettingsRadioButton value={props.alerts.notifications} onChange={val => props.alertsNotificationsChanged(val)}>
        <TextNormal>
          {i18n.t('settings.alerts.notifications')}
        </TextNormal>
      </SettingsRadioButton>
      <UiBlockSpace height={10}/>
      <SettingsRadioButton value={props.alerts.sound} onChange={val => props.alertsSoundChanged(val)}>
        <TextNormal>
          {i18n.t('settings.alerts.sound')}
        </TextNormal>
      </SettingsRadioButton>
    </UiBlockBasic>
  </CollapsingSection>
)

const styles = StyleSheet.create({
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  fieldsContainer: {
    paddingLeft: 15,
    paddingRight: 7
  }
})

export default AlertsSection
