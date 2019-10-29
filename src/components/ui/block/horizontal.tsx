import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockHorizontal = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockHorizontal

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
