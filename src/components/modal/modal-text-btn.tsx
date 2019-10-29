import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import UiBlockHorizontalCenter from '../ui/block/horizontal-center'

interface Props {
  onPress: () => void,
  children?: any
}

const ModalTextBtn = (props: Props) => (
  <TouchableOpacity onPress={props.onPress}>
    <UiBlockHorizontalCenter>
      <Text style={styles.modalDeclineBtnText}>
        {props.children}
      </Text>
    </UiBlockHorizontalCenter>
  </TouchableOpacity>
)

export default ModalTextBtn

const styles = StyleSheet.create({
  modalDeclineBtnText: {
    color: '#6B8090',
    fontWeight: 'bold',
    fontSize: 18
  }
})
