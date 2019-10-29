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
  showChildren: boolean
}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default class ModalSlideBottom extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      modalY: new Animated.Value(windowHeight),
      showChildren: false
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
        {this.state.showChildren ? this.props.children : null}
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
    this.setState({
      ...this.state,
      showChildren: true
    })

    Animated.timing(this.state.modalY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true
            })
            .start()
  }

  private hideModal = () => {
    Animated.timing(this.state.modalY, {
              toValue: windowHeight,
              duration: 300,
              useNativeDriver: true
            })
            .start(() => {
              this.setState({
                ...this.state,
                showChildren: false
              })
            })
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: windowWidth,
    height: windowHeight
  }
})

