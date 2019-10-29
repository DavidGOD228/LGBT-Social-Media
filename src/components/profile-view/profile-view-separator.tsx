import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

const ProfileViewSeparator = () => (
  <View style={styles.separator}/>
)

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgb(179, 190, 198)'
  }
})

export default ProfileViewSeparator
