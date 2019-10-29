import React from 'react'
import {
  StyleSheet,
  Switch,
  View
} from 'react-native'
import UiBlockRight from '../ui/block/right'

interface Props {
  value: boolean
  onChange: any
  children: any
}

const SettingsRadioButton = (props: Props) => (
  <UiBlockRight>
    <View style={styles.textContainer}>
      {props.children}
    </View>
    <Switch value={props.value} onValueChange={props.onChange}/>
  </UiBlockRight>
)

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

export default SettingsRadioButton
