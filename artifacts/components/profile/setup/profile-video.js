import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import {PickerImage} from '../../../utils/media-picker'
import VideoPlayer from 'react-native-video-controls';
const renderPlaceholder = (props) => (React.createElement(TouchableOpacity, { onPress: () => {
        console.log('stub');
    } },
    React.createElement(View, { style: [styles.placeholder, {
                width: props.containerWidth,
                height: props.containerWidth
            }] },
        React.createElement(Image, { style: styles.addVideoIcon, source: require('Musl/images/profile/btn-photo-add.png') }))));
const renderVideo = (props) => (React.createElement(VideoPlayer, { source: { uri: props.video[0].mediaUrl }, key: props.video[0].mediaUrl }));
const ProfileVideo = (props) => {
    if (props.video && props.video.length) {
        console.log('VIDOS: ', props.video[0].mediaUrl);
        return renderVideo(props);
    }
    return renderPlaceholder(props);
};
const styles = StyleSheet.create({
    placeholder: {
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addVideoIcon: {
        width: 50,
        height: 50
    }
});
export default ProfileVideo;
//# sourceMappingURL=profile-video.js.map