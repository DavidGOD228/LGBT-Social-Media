import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockHorizontalEdges from './ui/block/horizontal-edges'
import UiBlockBasic from './ui/block/basic'
import TextNormal from './global/text/basic/text-normal'

interface Props {
  valLeft: string
  valRight: string
  selectedValue: string
  valSelected: any
}

const SelectorItem = (props: { value: string, selected: boolean, buttonPressed: any }) => (
  <UiBlockBasic style={{flex: 1}}>
    <TouchableOpacity onPress={props.buttonPressed}>
      <UiBlockBasic style={[styles.button, props.selected && styles.selectedButton]}>
        <TextNormal style={[styles.buttonText, props.selected && styles.selectedButtonText]}>
          {props.value}
        </TextNormal>
      </UiBlockBasic>
    </TouchableOpacity>
  </UiBlockBasic>
)

const TwoValueSelector = ({valLeft, valRight, selectedValue, valSelected}: Props) => {
  return (
    <UiBlockHorizontalEdges>
      <SelectorItem
        value={valLeft}
        selected={selectedValue === valLeft}
        buttonPressed={() => valSelected(valLeft)}/>

      <SelectorItem
        value={valRight}
        selected={selectedValue === valRight}
        buttonPressed={() => valSelected(valRight)}/>
    </UiBlockHorizontalEdges>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'rgb(46, 46, 46)',
    fontSize: 14
  },
  selectedButton: {
    backgroundColor: '#4D92DF'
  },
  selectedButtonText: {
    color: 'white'
  }
})

export default TwoValueSelector
