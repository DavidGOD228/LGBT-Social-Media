import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native'

const KeyboardAvoidingWrapper = (props: {
  children: any,
  style?: any,
  behavior?: any,
  keyboardVerticalOffset?: number
}) => {
  if (Platform.OS === 'android') {
    return (
      <View style={props.style}>
        {props.children}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior={props.behavior || 'padding'}
                          style={props.style}
                          keyboardVerticalOffset={props.keyboardVerticalOffset || 0}>
      {props.children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingWrapper
