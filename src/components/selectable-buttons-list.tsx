import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import ButtonSelectable, {SelectableItem} from './button-selectable'

interface Props {
  items: SelectableItem[],
  onItemSelected: (item: SelectableItem) => void
}

const SelectableButtonsList = (props: Props) => {
  if (props.items === null || props.items.length === 0) {
    return null
  }

  return (
    <View style={styles.buttonContainer}>
      {props.items.map(item =>
        <ButtonSelectable key={item.key} item={item} onPress={() => props.onItemSelected(item)}/>
      )}
    </View>
  )
}

export default SelectableButtonsList

const styles: any = StyleSheet.create({
  buttonContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  }
})

export {SelectableItem} from './button-selectable'
