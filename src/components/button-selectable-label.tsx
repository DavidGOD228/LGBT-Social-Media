import React from 'react'
import {
  StyleSheet,
  TouchableOpacity, View,
} from 'react-native'
import UiBlockHorizontal from './ui/block/horizontal'
import TextNormal from './global/text/basic/text-normal'
import UiBlockBasic from './ui/block/basic'
import UiBlockVerticalCenter from './ui/block/vertical-center'

interface Props {
  item: SelectableItem,
  label: any,
  onPress: () => void
}

export interface SelectableItem {
  value: any
  title: string
  isSelected: boolean
  key: any
}

const ButtonSelectableLabel = ({item, label, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.floatButton, item.isSelected && styles.floatButtonSelected]}
    >
      <UiBlockHorizontal>
        {label ? label : <View style={styles.label}></View>}
        <UiBlockBasic>
          <UiBlockVerticalCenter>
            <TextNormal
              style={[styles.floatButtonText, item.isSelected && styles.floatButtonTextSelected]}
            >
              {item.value.value}
            </TextNormal>
          </UiBlockVerticalCenter>
        </UiBlockBasic>
      </UiBlockHorizontal>
    </TouchableOpacity>
  )
}

export default ButtonSelectableLabel

const styles: any = StyleSheet.create({
  floatButton: {
    backgroundColor: 'rgb(242, 242, 242)',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 3,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A5B4BD'
  },
  label: {
    marginTop: 1,
    marginBottom: 1,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  floatButtonSelected: {
    backgroundColor: 'rgb(77, 146, 223)',
  },
  floatButtonText: {
    fontSize: 14,
    color: 'rgb(92, 92, 92)',
    textAlign: 'center'
  },
  floatButtonTextSelected: {
    color: '#fff',
  },
  labelText: {
    color: 'white',
    fontSize: 18,
    width: 16,
    height: 16,
    textAlign: 'center',
    justifyContent: 'center'
  }
})
