import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockBottom = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockBottom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
})
