import React from 'react'
import {StyleSheet} from 'react-native'
import TextButton from './text-button'

interface Props {
  onPress: () => void,
  disabled?: boolean,
  children?: any
}

const NavigationTextButtonBlue = (props: Props) => (
  <TextButton
    style={[styles.blueButton, props.disabled && styles.buttonDisabled]}
    onPress={props.onPress}
    disabled={props.disabled}>
    {props.children}
  </TextButton>
)

export default NavigationTextButtonBlue

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
