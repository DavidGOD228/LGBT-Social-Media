import React from 'react'
import {StyleSheet} from 'react-native'
import TextMedium from '../global/text/basic/text-medium'
import UiBlockRight from '../ui/block/right'
import UiBlockBasic from '../ui/block/basic'
interface Props {
  children?: any,
  styles?: any
}

const StatsValue = (props: Props) => (
  <UiBlockBasic style={styles.valueContainer}>
    <UiBlockRight>
      <TextMedium style={[styles.value, props.styles]}>{props.children}</TextMedium>
    </UiBlockRight>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  valueContainer: {
    width: 70,
    paddingRight: 10
  },
  value: {
    fontSize: 24,
  },
})

export default StatsValue
