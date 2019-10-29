import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockBasic = ({children, style = {}}) => (
  <View style={[styles.container, style]}>
    {children}
  </View>
)

export default UiBlockBasic

const styles = StyleSheet.create({
  container: {}
})
