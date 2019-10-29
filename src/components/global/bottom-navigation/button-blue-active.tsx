import React from 'react'
import {StyleSheet} from 'react-native'
import TextButton from './text-button'

interface Props {
  onPress: () => void,
  isActive?: boolean,
  children?: any
}

const NavigationButtonBlueActive = (props: Props) => (
  <TextButton
    style={[styles.blueButton, !props.isActive && styles.buttonDisabled]}
    onPress={props.onPress}
    disabled={false}>
    {props.children}
  </TextButton>
)

export default NavigationButtonBlueActive

const styles = StyleSheet.create({
  blueButton: {
    color: '#5DA4E5',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonDisabled: {
    color: '#ABABAB',
    textShadowColor: undefined
  }
})
