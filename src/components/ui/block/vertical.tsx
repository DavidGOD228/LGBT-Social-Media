import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockVertical = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockVertical

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
})
