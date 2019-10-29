import React from 'react'
import {StyleSheet} from 'react-native'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockLeft from '../../ui/block/left'

interface Props {
  children: any
}

const PopupButtonsContainer = (props: Props) => (
  <UiBlockBasic style={styles.container}>
    <UiBlockLeft>
      {props.children}
    </UiBlockLeft>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30
  }
})

export default PopupButtonsContainer
