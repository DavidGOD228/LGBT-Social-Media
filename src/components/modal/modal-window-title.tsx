import React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

const ModalWindowTitle = ({children}: { children?: any }) => (
  <Text style={styles.title}>
    {children}
  </Text>
)

export default ModalWindowTitle

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  }
})
