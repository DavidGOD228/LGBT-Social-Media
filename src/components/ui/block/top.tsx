import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockTop = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockTop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
})
