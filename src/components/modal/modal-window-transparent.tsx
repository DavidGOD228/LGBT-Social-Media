import React from 'react'
import {
  Modal,
  StyleSheet,
  View
} from 'react-native'

interface Props {
  visible: boolean,
  children?: any
}

const ModalWindowTransparent = (props: Props) => (
  <Modal
    transparent={true}
    visible={props.visible}
    onRequestClose={() => console.log('close')}
    animationType={'slide'}
  >
    <View style={styles.modalWindow}>
      {props.children}
    </View>
  </Modal>
)

export default ModalWindowTransparent

const styles = StyleSheet.create({
  modalWindow: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'flex-end'
  }
})
