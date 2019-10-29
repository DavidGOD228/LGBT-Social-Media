import React, {Component} from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native'
import View = Animated.View

interface Props {
  visible: boolean
}

interface State {
  modalY: any
}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default class ModalSlideTop extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      modalY: new Animated.Value(-windowHeight)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.visible !== nextProps.visible) {
      this.toggleModal(nextProps.visible)
    }
  }

  render() {
    return (
      <View style={[styles.modal, {transform: [{translateY: this.state.modalY}]}]}>
        {this.props.children}
      </View>
    )
  }

  private toggleModal = (visible: boolean) => {
    if (visible) {
      this.showModal()
    } else {
      this.hideModal()
    }
  }

  private showModal = () => {
    Animated.timing(this.state.modalY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  private hideModal = () => {
    Animated.timing(this.state.modalY, {
      toValue: -windowHeight,
      duration: 300,
      useNativeDriver: true
    }).start()
  }
}

const styles = StyleSheet.create({
  modal: {
    zIndex: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowWidth,
    height: windowHeight
  }
})

