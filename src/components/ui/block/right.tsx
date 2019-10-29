import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockRight = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockRight

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
