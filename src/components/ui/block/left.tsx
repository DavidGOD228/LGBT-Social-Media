import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockLeft = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockLeft

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
