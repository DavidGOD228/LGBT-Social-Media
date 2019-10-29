import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockHeightThird = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockHeightThird

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '33.333%'
  }
})
