import React from 'react'
import {
  Animated,
  StyleSheet
} from 'react-native'
import ModalSlideBottom from '../modal/modal-slide-bottom'
import View = Animated.View
import {globalParams} from '../../../assets/styles/style'

interface Props {
  visible: boolean,
  style?: any,
  children: any,
  countBottomPanel?: boolean
}

const PopupSlideBottom = ({visible, style, children, countBottomPanel = true}: Props) => (
  <ModalSlideBottom visible={visible}>
    <View style={[styles.container, !countBottomPanel && {paddingBottom: 0}]}>
      <View style={[styles.popup, style]}>
        {children}
      </View>
    </View>
  </ModalSlideBottom>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: globalParams.bottomPanelHeight
  },
  popup: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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

export default PopupSlideBottom
