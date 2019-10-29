import React from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'

interface Props {
  disabled?: boolean,
  style?: any,
  onPress: () => void,
  children?: any
}

const TextButton = (props: Props) => (
  <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
    <Text style={props.style}>{props.children}</Text>
  </TouchableOpacity>
)

export default TextButton
