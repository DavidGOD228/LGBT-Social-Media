import React from 'react'
import {
  Component
} from 'react'

import PropTypes from 'prop-types'
import {
  DeviceEventEmitter,
  // NativeModules,
  requireNativeComponent,
  View
  // NativeModules
} from 'react-native'
// import {
//   // VideoPlayer,
//   // ProcessingManager
// } from 'react-native-video-processing'
import Spinner from 'react-native-loading-spinner-overlay'

const iface = {
  name: 'VideoClipper',
  propTypes: {
    videoUri: PropTypes.string,
    maxDuration: PropTypes.number,
    ...View.propTypes
  }
}

const TEXT_PROCESSING = 'Processing...'
const TEXT_UPLOADING = 'Uploading...'

interface Props {
  videoUri: any,
  maxDuration: any,
  onVideoCompressed: (compressedUri: string) => Promise<any>
  onVideoCancelled: () => void
  onVideoFinished: () => void
}

interface State {
  showSpinner: boolean,
  spinnerText: string,
  clipperComponent: any
}

export default class VideoTrimmer extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      showSpinner: false,
      spinnerText: TEXT_PROCESSING,
      clipperComponent: requireNativeComponent('VideoClipper', iface)
    }
  }

  compressVideo = (trimmedSource: any) => {
    console.log('TRIMMED SOURCE', trimmedSource)

    // const options = {
    //   width: 270,
    //   height: 480
    // }
    this.onVideoCompressed('file://' + trimmedSource.path)
        .then(() => {
          setTimeout(() => this.setState({
            ...this.state,
            showSpinner: false
          }), 1)
          this.props.onVideoFinished()

        })
    /*
     ProcessingManager.compress(trimmedSource.path, options)
     .then((data) => {
     return this.onVideoCompressed(data.source)
     })
     .then((tempFile: string) => {
     setTimeout(() => this.setState({
     ...this.state,
     showSpinner: false
     }), 1)
     NativeModules.VideoClipperModule.clearCache(tempFile)
     NativeModules.VideoClipperModule.clearCache(trimmedSource.path)
     this.props.onVideoFinished()
     })
     .catch((reason: any) => {
     console.log("UPLOAD FAILED:", reason)
     this.setState({
     ...this.state,
     showSpinner: false
     })
     })
     */
  }

  onVideoProcessingStarted = () => {
    return this.setState({
      ...this.state,
      showSpinner: true,
      spinnerText: TEXT_PROCESSING
    })
  }

  onVideoTrimmed = (trimmedSource: any) => {
    this.onVideoProcessingStarted()
    return this.compressVideo(trimmedSource)
  }

  onVideoCompressed = (compressedSource: string): Promise<any> => {
    this.setState({
      ...this.state,
      spinnerText: TEXT_UPLOADING
    })
    return this.props.onVideoCompressed(compressedSource)
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('VIDEOCROPPED', this.onVideoTrimmed)
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('VIDEOCANCELLED', this.props.onVideoCancelled)
  }

  render() {
    const VideoClipperNative = this.state.clipperComponent
    return <View style={{flex: 1}}>
      <VideoClipperNative
        videoUri={this.props.videoUri}
        maxDuration={this.props.maxDuration}
        style={{flex: 1}}
      />
      <Spinner visible={this.state.showSpinner} textContent={this.state.spinnerText} textStyle={{color: '#FFF'}}/>
    </View>
  }
}
