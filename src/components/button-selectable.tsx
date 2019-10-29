import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import TextNormal from './global/text/basic/text-normal'

interface Props {
  item: SelectableItem,
  onPress: () => void
}

export interface SelectableItem {
  value: any
  title?: string
  isSelected?: boolean
  key: any
}

const ButtonSelectable = ({item, onPress}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={item.isSelected ? styles.floatButtonSelected : styles.floatButton}
  >
    <TextNormal
      style={item.isSelected ? styles.floatButtonTextSelected : styles.floatButtonText}
    >
      {item.title || item}
    </TextNormal>
  </TouchableOpacity>
)

export default ButtonSelectable

const styles: any = StyleSheet.create({
  floatButtonSelected: {
    backgroundColor: 'rgb(77, 146, 223)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A5B4BD'
  },
  floatButtonTextSelected: {
    fontSize: 12,
    color: '#fff'
  },
  floatButton: {
    backgroundColor: 'rgb(242, 242, 242)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A5B4BD'
  },
  floatButtonText: {
    fontSize: 12,
    color: 'rgb(92, 92, 92)'
  }
})
