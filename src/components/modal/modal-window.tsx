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

const ModalWindow = (props: Props) => (
  <Modal
    transparent={true}
    visible={props.visible}
    onRequestClose={() => console.log('close')}
  >
    <View style={styles.modalWindow}>
      {props.children}
    </View>
  </Modal>
)

export default ModalWindow

const styles = StyleSheet.create({
  modalWindow: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.90)'
  }
})
