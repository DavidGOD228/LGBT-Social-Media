import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import {globalParams} from '../../../assets/styles/style'

const UiBlockBottomPanel = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default UiBlockBottomPanel

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: globalParams.bottomPanelHeight,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
})
