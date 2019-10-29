import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import TextNormal from './global/text/basic/text-normal'

interface Props {
  onPress: () => void
}

const SubmitButton = (props: Props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={styles.floatButton}
  >
    <TextNormal
      style={styles.floatButtonText}
    >
      Submit
    </TextNormal>
  </TouchableOpacity>
)

export default SubmitButton

const styles: any = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 150,
    height: 50,
    bottom: 0,
    right: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderBottomWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatButtonText: {
    flex: 1,
    fontSize: 18,
    color: '#4685c2',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
