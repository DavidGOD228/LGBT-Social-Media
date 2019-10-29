import React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

const ModalWindowSubtext = ({children}: { children?: any }) => (
  <Text style={styles.text}>
    {children}
  </Text>
)

export default ModalWindowSubtext

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
})
