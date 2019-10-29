import React from 'react'
import {
  Animated,
  StyleSheet
} from 'react-native'
import ModalSlideTop from '../modal/modal-slide-top'
import View = Animated.View

interface Props {
  visible: boolean,
  style?: any,
  children: any
}

const PopupSlideTop = (props: Props) => (
  <ModalSlideTop visible={props.visible}>
    <View style={styles.container}>
      <View style={[styles.popup, props.style]}>
        {props.children}
      </View>
    </View>
  </ModalSlideTop>
)

const styles = StyleSheet.create({
  container: {
    zIndex: 20,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  popup: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.6
  }
})

export default PopupSlideTop
