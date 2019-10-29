import React from 'react'
import {StyleSheet} from 'react-native'
import i18n from '../../locales/i18n'
import TwoValueSelector from '../two-value-selector'
import UiBlockBasic from '../ui/block/basic'
import LineFullWidth from '../global/line-full-width'
import UiBlockSpace from '../ui/block/space'

interface Props {
  metricsType: string
  onMetricsSelected: (type: string) => void
}

const MetricsSection = (props: Props) => (
<UiBlockBasic>
  <LineFullWidth style={styles.titleBottomBorder}/>
  <UiBlockSpace height={10}/>

  <UiBlockBasic style={styles.twoValueSwitcherContainer}>
    <TwoValueSelector valLeft={i18n.t('settings.metrics.imperial')}
                      valRight={i18n.t('settings.metrics.metric')}
                      selectedValue={props.metricsType}
                      valSelected={props.onMetricsSelected}/>
  </UiBlockBasic>

  <UiBlockSpace height={10}/>
  <LineFullWidth style={styles.titleBottomBorder}/>
</UiBlockBasic>
)

const styles = StyleSheet.create({
  twoValueSwitcherContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
})

export default MetricsSection
