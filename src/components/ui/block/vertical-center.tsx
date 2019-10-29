import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockVerticalCenter = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockVerticalCenter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})
