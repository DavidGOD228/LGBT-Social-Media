import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter, 
// NativeModules,
requireNativeComponent, View
// NativeModules
 } from 'react-native';
// import {
//   // VideoPlayer,
//   // ProcessingManager
// } from 'react-native-video-processing'
import Spinner from 'react-native-loading-spinner-overlay';
const iface = {
    name: 'VideoClipper',
    propTypes: Object.assign({ videoUri: PropTypes.string, maxDuration: PropTypes.number }, View.propTypes)
};
const TEXT_PROCESSING = 'Processing...';
const TEXT_UPLOADING = 'Uploading...';
export default class VideoTrimmer extends Component {
    constructor(props) {
        super(props);
        this.compressVideo = (trimmedSource) => {
            console.log('TRIMMED SOURCE', trimmedSource);
            // const options = {
            //   width: 270,
            //   height: 480
            // }
            this.onVideoCompressed('file://' + trimmedSource.path)
                .then(() => {
                setTimeout(() => this.setState(Object.assign({}, this.state, { showSpinner: false })), 1);
                this.props.onVideoFinished();
            });
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
        };
        this.onVideoProcessingStarted = () => {
            return this.setState(Object.assign({}, this.state, { showSpinner: true, spinnerText: TEXT_PROCESSING }));
        };
        this.onVideoTrimmed = (trimmedSource) => {
            this.onVideoProcessingStarted();
            return this.compressVideo(trimmedSource);
        };
        this.onVideoCompressed = (compressedSource) => {
            this.setState(Object.assign({}, this.state, { spinnerText: TEXT_UPLOADING }));
            return this.props.onVideoCompressed(compressedSource);
        };
        this.state = {
            showSpinner: false,
            spinnerText: TEXT_PROCESSING,
            clipperComponent: requireNativeComponent('VideoClipper', iface)
        };
    }
    componentWillMount() {
        DeviceEventEmitter.addListener('VIDEOCROPPED', this.onVideoTrimmed);
    }
    componentWillUnmount() {
        DeviceEventEmitter.removeListener('VIDEOCANCELLED', this.props.onVideoCancelled);
    }
    render() {
        const VideoClipperNative = this.state.clipperComponent;
        return React.createElement(View, { style: { flex: 1 } },
            React.createElement(VideoClipperNative, { videoUri: this.props.videoUri, maxDuration: this.props.maxDuration, style: { flex: 1 } }),
            React.createElement(Spinner, { visible: this.state.showSpinner, textContent: this.state.spinnerText, textStyle: { color: '#FFF' } }));
    }
}
//# sourceMappingURL=video-clipper.js.map