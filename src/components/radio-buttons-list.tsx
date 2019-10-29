import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import RadioButtonItem from './radio-button-item'
import {SelectableItem} from './button-selectable'

interface Props {
  items: SelectableItem[],
  onItemSelected: (item: SelectableItem) => void
}

const RadioButtonsList = (props: Props) => {
  if (props.items === null || props.items.length === 0) {
    return null
  }

  return (
    <View style={styles.buttonContainer}>
      {props.items.map(item =>
        <RadioButtonItem key={item.key} item={item} onPress={() => props.onItemSelected(item)}/>
      )}
    </View>
  )
}

export default RadioButtonsList

const styles: any = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column'
  }
})
