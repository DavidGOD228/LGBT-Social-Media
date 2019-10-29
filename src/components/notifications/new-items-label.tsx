import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import TextBold from '../global/text/basic/text-bold'

interface Props {
  children: any,
  style?: any
}

const NewItemsLabel = (props: Props) => (
  <View style={[styles.label, props.style]}>
    <TextBold style={styles.labelText}>{props.children}</TextBold>
  </View>
)

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    height: 19,
    minWidth: 19,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CE0B24'
  },
  labelText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }
})

export default NewItemsLabel
