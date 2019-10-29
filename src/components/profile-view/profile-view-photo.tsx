import React, {Component} from 'react'
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import PhotoView from 'react-native-photo-view'
import {ProfileTypeDict} from '../../configs/dicts'

interface Props {
  data: ProfileTypeDict
  position: number
}

interface State {
  showPicture: boolean
}

export default class ProfileViewPhoto extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      showPicture: false
    }
  }

  render() {
    const {data, position} = this.props

    return (
      <View style={[styles.photoContainer, position === 0 && styles.firstPhotoContainer]}>
        <TouchableOpacity onPress={this.togglePicture}>
          <Image source={data.photo} style={[styles.photo, position === 0 && styles.firstPhoto]} />
        </TouchableOpacity>
        <Modal visible={this.state.showPicture} transparent={false} onRequestClose={this.togglePicture}>
          <PhotoView
            style={{flex: 1}}
            source={data.photo}
          />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={this.togglePicture}
          >
            <Image source={require('Musl/images/global/btn-close.png')}/>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }

  private togglePicture = () => {
    this.setState(prevState => ({
      ...this.state,
      showPicture: !prevState.showPicture
    }))
  }
}

const styles = StyleSheet.create({
  photoContainer: {
    margin: 0,
    padding: 0,
    height: '100%',
    width: Dimensions.get('window').width,
  },
  firstPhotoContainer: {
    width: Dimensions.get('window').width - 50,
  },
  photo: {
    height: '100%',
    width: Dimensions.get('window').width,
  },
  firstPhoto: {
    width: Dimensions.get('window').width - 50,
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    bottom: 8
  }
})