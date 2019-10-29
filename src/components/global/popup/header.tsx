import React from 'react'
import {StyleSheet, View} from 'react-native'
import TextMedium from '../text/basic/text-medium'

interface Props {
  children: any
}

const PopupHeader = (props: Props) => (
  <View style={styles.container}>
    <TextMedium style={styles.text}>
      {props.children}
    </TextMedium>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F0D17F',
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    color: '#000000',
    fontSize: 18
  }
})

export default PopupHeader
