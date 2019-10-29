import React from 'react'
import {StyleSheet} from 'react-native'
import TextMedium from '../global/text/basic/text-medium'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
interface Props {
  children?: any,
  styles?: any,
  title?: string
}

const StatsSection = (props: Props) => (
  <UiBlockBasic>
    <UiBlockSpace height={20}/>
    <TextMedium style={styles.sectionTitle}>{props.title}</TextMedium>
    <UiBlockSpace height={13}/>
    {props.children}
    <UiBlockSpace height={15}/>
    <LineFullWidth style={styles.titleBottomBorder}/>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  sectionTitle: {
    color: 'black',
    fontSize: 18
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
})

export default StatsSection

