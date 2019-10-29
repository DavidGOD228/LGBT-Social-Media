import React, {Component} from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal'
import UiBlockBasic from '../ui/block/basic'
import UiBlockSpace from '../ui/block/space'
import UiBlockRight from '../ui/block/right'
import configuration from '../../configs/index'
import PhotoView from 'react-native-photo-view'
import NCView from '../global/non-clipping-view'

interface Props {
  userPicture: any
  message: string
  type: string
}

interface State {
  showPicture: boolean
}

export default class ChatItemMe extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      showPicture: false
    }
  }

  render() {
    return (
      <UiBlockBasic>
        <UiBlockSpace height={10}/>
        <UiBlockRight>

          <NCView style={styles.messageBaloonContainer}>
            {this.props.type === 'TEXT' ? (
              <View style={styles.messageBaloon}>
                <TextNormal style={styles.message}>
                  {this.props.message}
                </TextNormal>
              </View>
            ) : (
              <View style={styles.messageBaloon}>
                <TouchableOpacity onPress={this.togglePicture}>
                  <Image
                    style={styles.picture}
                    source={{uri: `${configuration.remoteApi.base}/medias/download/${this.props.message}?type=SMALL`}}
                  />
                </TouchableOpacity>
                <Modal visible={this.state.showPicture} transparent={false} onRequestClose={this.togglePicture}>
                  <PhotoView
                    style={{flex: 1}}
                    source={{uri: `${configuration.remoteApi.base}/medias/download/${this.props.message}`}}
                  />
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={this.togglePicture}
                  >
                    <Image source={require('Musl/images/global/btn-close.png')}/>
                  </TouchableOpacity>
                </Modal>
              </View>
            )}
            <Image style={styles.borderArrow} resizeMode={'stretch'}
                   source={require('Musl/images/messages/arrow-gray.png')}/>
          </NCView>

          <UiBlockSpaceHorizontal width={12}/>

          <Image style={styles.userPicture} source={this.props.userPicture}/>

        </UiBlockRight>
        <UiBlockSpace height={10}/>
      </UiBlockBasic>
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
  userPicture: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    bottom: 8
  },
  picture: {
    flex: 1,
    height: 300
  },
  messageBaloonContainer: {
    flex: 1,
    paddingRight: 10
  },
  messageBaloon: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A4A4A4',
    borderRadius: 5,
    padding: 10
  },
  message: {
    color: 'black',
    lineHeight: 20
  },
  borderArrow: {
    position: 'absolute',
    top: 0,
    right: -1,
    width: 20,
    height: 15
  }
})
