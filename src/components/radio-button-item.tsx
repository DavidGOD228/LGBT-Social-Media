import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import TextNormal from './global/text/basic/text-normal'
import {PROFILE_SEX_ROLE} from '../configs/dicts'
import {SelectableItem} from './button-selectable'

interface Props {
  item: SelectableItem,
  onPress: () => void
}

const RadioButtonItem = ({item, onPress}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}
  >
    <Image source={PROFILE_SEX_ROLE[item.value.value]}/>
    <TextNormal
      style={item.isSelected ? styles.textSelected : styles.text}
    >
      {item.title || item.value || item}
    </TextNormal>
  </TouchableOpacity>
)

export default RadioButtonItem

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10
  },
  textSelected: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'rgb(77, 146, 223)'
  },
  text: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'rgb(92, 92, 92)'
  }
})
