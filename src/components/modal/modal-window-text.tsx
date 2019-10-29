import React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

const ModalWindowText = ({children}: { children?: any }) => (
  <Text style={styles.text}>
    {children}
  </Text>
)

export default ModalWindowText

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
})
