import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockSpace = ({height}: { height?: number }) => (
  <View style={[styles.container, height ? {height} : {}]}/>
)

export default UiBlockSpace

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: 1
  }
})
