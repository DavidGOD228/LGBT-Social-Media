import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import UiBlockVerticalCenter from '../ui/block/vertical-center'
import UiBlockHorizontalCenter from '../ui/block/horizontal-center'

interface Props {
  onPress: () => void,
  disabled?: boolean,
  children?: any
}

const ModalFullWidthBtn = (props: Props) => (
  <TouchableOpacity
    style={styles.modalAcceptBtn}
    onPress={props.onPress}
    disabled={props.disabled}
  >
    <UiBlockVerticalCenter>
      <UiBlockHorizontalCenter>
        <Text style={[styles.buttonText, props.disabled ? styles.buttonTextDisabled : {}]}>
          {props.children}
        </Text>
      </UiBlockHorizontalCenter>
    </UiBlockVerticalCenter>
  </TouchableOpacity>
)

export default ModalFullWidthBtn

const styles = StyleSheet.create({
  modalAcceptBtn: {
    backgroundColor: '#5BDAFD',
    height: 50
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22
  },
  buttonTextDisabled: {
    color: '#ABABAB'
  }
})
