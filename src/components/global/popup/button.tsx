import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import TextNormal from '../text/basic/text-normal'

interface Props {
  children: any
  onPress?: () => void
}

const PopupButton = (props: Props) => (
  <TouchableOpacity onPress={props.onPress}>
    <TextNormal style={styles.text}>{props.children}</TextNormal>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  text: {
    color: '#5DA4E5'
  }
})

export default PopupButton
