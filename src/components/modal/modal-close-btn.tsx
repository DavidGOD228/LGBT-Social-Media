import React from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockRight from '../ui/block/right'

interface Props {
  onPress: () => void
}

const ModalCloseBtn = ({onPress}: Props) => (
  <UiBlockRight>
    <TouchableOpacity
      style={styles.modalClose}
      onPress={onPress}>
      <Image source={require('Musl/images/global/icon-btn-close.png')}/>
    </TouchableOpacity>
  </UiBlockRight>
)

export default ModalCloseBtn

const styles = StyleSheet.create({
  modalWindow: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.90)'
  },
  modalClose: {
    paddingRight: 20
  }
})
