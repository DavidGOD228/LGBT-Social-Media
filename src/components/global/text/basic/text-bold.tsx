import React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

interface Props {
  style?: any,
  children?: any
  ellipsizeMode?: any
}

const TextBold = ({style, children, ellipsizeMode}: Props) => (
  <Text style={[styles.text, style]} ellipsizeMode={ellipsizeMode}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Uniform-Bold',
    fontSize: 16,
    color: 'rgb(46, 46, 46)'
  }
})

export default TextBold
