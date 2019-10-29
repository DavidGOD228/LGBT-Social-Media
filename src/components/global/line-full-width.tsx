import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

interface Props {
  style?: any
}

const LineFullWidth = (props: Props) => (
  <View style={[styles.line, props.style]}/>
)

export default LineFullWidth

const styles = StyleSheet.create({
  line: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: 'grey'
  }
})
