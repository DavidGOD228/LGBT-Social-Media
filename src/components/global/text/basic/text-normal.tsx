import React from 'react'
import {StyleSheet, Text} from 'react-native'

interface Props {
  style?: any,
  children?: any,
  numberOfLines?: any,
  onPress?: any
}

const TextNormal = ({style, children, numberOfLines, onPress}: Props) => (
  <Text onPress={onPress} numberOfLines={numberOfLines} style={[styles.text, style]}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Uniform',
    fontSize: 16,
    color: 'rgb(46, 46, 46)'
  }
})

export default TextNormal
