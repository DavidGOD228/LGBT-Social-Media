import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockSpaceHorizontal = ({width}: { width?: number }) => (
  <View style={[styles.container, width ? {width} : {}]}/>
)

export default UiBlockSpaceHorizontal

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: 10
  }
})
