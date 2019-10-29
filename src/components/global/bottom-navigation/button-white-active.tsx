import React from 'react'
import {StyleSheet} from 'react-native'
import TextButton from './text-button'

interface Props {
  isActive?: boolean,
  onPress: () => void,
  children?: any
}

const NavigationButtonWhiteActive = (props: Props) => (
  <TextButton
    style={[styles.whiteButton, !props.isActive && styles.whiteButtonDisabled]}
    onPress={props.onPress}
    disabled={false}>
    {props.children}
  </TextButton>
)

export default NavigationButtonWhiteActive

const styles = StyleSheet.create({
  whiteButton: {
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
