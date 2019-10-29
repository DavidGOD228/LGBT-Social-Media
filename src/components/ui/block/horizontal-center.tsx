import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockHorizontalCenter = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockHorizontalCenter

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
