import React from 'react'
import {StyleSheet, Text} from 'react-native'

interface Props {
  style?: any,
  children?: any
}

const TextMedium = ({style, children}: Props) => (
  <Text style={[styles.text, style]}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Uniform-Medium',
    fontSize: 16,
    color: 'rgb(46, 46, 46)'
  }
})

export default TextMedium
