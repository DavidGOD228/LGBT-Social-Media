import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import CollapsingSection from '../collapsing-section'
import i18n from '../../locales/i18n'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
import SettingsRadioButton from './radio-button'
import UiBlockHorizontalEdges from '../ui/block/horizontal-edges'
import TextNormal from '../global/text/basic/text-normal'
import Time from '../../models/time'

export interface QuietHoursComponentData {
  on: boolean
  timeTmp: Time
  timeStart: Time
  timeEnd: Time
  showIosSelector: boolean
  currentParameter: 'start' | 'end'
}

interface Props {
  quietHours: QuietHoursComponentData
  onQuietHoursToggle: (value: boolean) => void
  onInfoPress: () => void
  onTimeStartPress: () => void
  onTimeEndPress: () => void
}

const QuietHoursSection = (props: Props) => (
  <CollapsingSection
    title={i18n.t('settings.quietHours.sectionTitle')}
    completed={false}
    infoPressed={props.onInfoPress}>
    <UiBlockSpace height={10}/>
    <LineFullWidth style={styles.titleBottomBorder}/>
    <UiBlockSpace height={10}/>
    <UiBlockBasic style={styles.fieldsContainer}>
      <SettingsRadioButton value={props.quietHours.on} onChange={val => props.onQuietHoursToggle(val)}>
        <TextNormal>
          {i18n.t('settings.quietHours.onOff')}
        </TextNormal>
      </SettingsRadioButton>
      <UiBlockSpace height={20}/>

      <UiBlockHorizontalEdges>
        <UiBlockBasic>
          <TouchableOpacity onPress={props.onTimeStartPress}>
            <TextNormal>Begin</TextNormal>
            <UiBlockSpace height={10}/>
            <TextNormal style={styles.timeValue}>
              {props.quietHours.timeStart.getTimeToDisplay()}
            </TextNormal>
          </TouchableOpacity>
        </UiBlockBasic>

        <UiBlockBasic style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={props.onTimeEndPress}>
            <TextNormal>End</TextNormal>
            <UiBlockSpace height={10}/>
            <TextNormal style={styles.timeValue}>
              {props.quietHours.timeEnd.getTimeToDisplay()}
            </TextNormal>
          </TouchableOpacity>
        </UiBlockBasic>
      </UiBlockHorizontalEdges>

      {/*<CircularSlider*/}
      {/*startAngle={props.quietHours.startAngle}*/}
      {/*angleLength={props.quietHours.angleLength}*/}
      {/*onUpdate={props.onQuietHoursUpdate}*/}
      {/*segments={5}*/}
      {/*strokeWidth={34}*/}
      {/*radius={130}*/}
      {/*gradientColorFrom="#A2BEDD"*/}
      {/*gradientColorTo="#A2BEDD"*/}
      {/*showClockFace={true}*/}
      {/*clockFaceColor="#9d9d9d"*/}
      {/*bgCircleColor="#F2F2F2"*/}
      {/*/>*/}

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
  },
  timeValue: {
    fontSize: 26
  }
})

export default QuietHoursSection
