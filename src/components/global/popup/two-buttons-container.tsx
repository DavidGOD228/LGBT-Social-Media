import React from 'react'
import {StyleSheet} from 'react-native'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockHorizontalEdges from '../../ui/block/horizontal-edges'

interface Props {
  children: any
}

const PopupTwoButtonsContainer = (props: Props) => (
  <UiBlockBasic style={styles.container}>
    <UiBlockHorizontalEdges>
      {props.children}
    </UiBlockHorizontalEdges>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30
  }
})

export default PopupTwoButtonsContainer
