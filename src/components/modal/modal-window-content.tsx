import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import UiBlockLeft from '../ui/block/left'

const ModalWindowContent = ({children}: { children?: any }) => (
  <UiBlockLeft>
    <View style={styles.container}>
      {children}
    </View>
  </UiBlockLeft>
)

export default ModalWindowContent

const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40
  }
})
