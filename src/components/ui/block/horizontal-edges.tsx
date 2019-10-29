import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const UiBlockHorizontalEdges = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockHorizontalEdges

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
