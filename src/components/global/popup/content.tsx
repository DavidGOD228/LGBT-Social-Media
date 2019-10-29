import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import TextNormal from '../text/basic/text-normal'
import LineFullWidth from '../line-full-width'
import UiBlockSpace from '../../ui/block/space'

interface Props {
  children: any
}

const PopupContent = (props: Props) => (
  <View style={styles.container}>
    <TextNormal style={styles.text}>
      {props.children}
    </TextNormal>
    <UiBlockSpace height={15} />
    <LineFullWidth />
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30
  },
  text: {
    lineHeight: 20
  }
})

export default PopupContent
