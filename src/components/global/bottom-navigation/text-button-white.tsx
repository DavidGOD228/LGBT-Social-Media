import React from 'react'
import {StyleSheet} from 'react-native'
import TextButton from './text-button'

interface Props {
  disabled?: boolean,
  onPress: () => void,
  children?: any
}

const NavigationTextButtonWhite = (props: Props) => (
  <TextButton
    style={[styles.whiteButton, props.disabled && styles.whiteButtonDisabled]}
    onPress={props.onPress}
    disabled={props.disabled}>
    {props.children}
  </TextButton>
)

export default NavigationTextButtonWhite

const styles = StyleSheet.create({
  whiteButton: {
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1
  },
  whiteButtonDisabled: {
    color: '#ABABAB',
    textShadowColor: undefined
  }
})
