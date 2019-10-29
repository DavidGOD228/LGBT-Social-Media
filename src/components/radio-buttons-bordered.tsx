import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import {SelectableItem} from './button-selectable'
import RadioButtonBordered from './radio-button-bordered'

interface Props {
  items: SelectableItem[],
  onItemSelected: (item: SelectableItem) => void
}

const RadioButtonsBordered = (props: Props) => {
  if (props.items === null || props.items.length === 0) {
    return null
  }

  return (
    <View style={styles.buttonContainer}>
      {props.items.map(item =>
        <RadioButtonBordered key={item.key} item={item} onPress={() => props.onItemSelected(item)}/>
      )}
    </View>
  )
}

export default RadioButtonsBordered

const styles: any = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '75%'
  }
})
