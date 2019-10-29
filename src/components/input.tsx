import React from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {TextField} from 'react-native-material-textfield'
import UiBlockBasic from './ui/block/basic'

interface Props {
  value?: string,
  placeholder?: string,
  textColor?: string,
  baseColor?: string,
  error?: string,
  keyboardType?: string,
  autoCapitalize?: string,
  secureTextEntry?: boolean,
  onChangeText?: (text: string) => void,
  showInfo?: boolean,
  onInfoPress?: any,
  maxLength?: number
}

const Input = (props: Props) => {
  const {
    maxLength,
    placeholder,
    value,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    secureTextEntry = false,
    onChangeText,
    error,
    showInfo = false,
    onInfoPress,
    textColor = '#000',
    baseColor = 'rgb(46, 46, 46)'
  } = props

  const infoButton = (
    <TouchableOpacity style={styles.infoSign} onPress={onInfoPress}>
      <Image source={require('Musl/images/global/icon-btn-info.png')}/>
    </TouchableOpacity>
  )

  return (
    <UiBlockBasic>
      <TextField
        maxLength={maxLength}
        label={placeholder}
        value={value}
        error={error}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        textColor={textColor}
        baseColor={baseColor}
      />
      {showInfo ? infoButton : null}
    </UiBlockBasic>
  )
}

export default Input

const styles = StyleSheet.create({
  infoSign: {
    position: 'absolute',
    right: 0,
    top: 33
  }
})
