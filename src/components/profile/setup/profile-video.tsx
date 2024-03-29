import React from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
// import {PickerImage} from '../../../utils/media-picker'
import VideoPlayer from 'react-native-video-controls'

interface Props {
  containerWidth: number,
  video?: any,
  videoSelected: (videoSource: any) => void,
}

const renderPlaceholder = (props: Props) => (
  <TouchableOpacity onPress={() => {
    console.log('stub')
  }
  }>
    <View style={[styles.placeholder, {
      width: props.containerWidth,
      height: props.containerWidth
    }]}>
      <Image style={styles.addVideoIcon} source={require('Musl/images/profile/btn-photo-add.png')}/>
    </View>
  </TouchableOpacity>
)

const renderVideo = (props: Props) => (
  <VideoPlayer source={{uri: props.video[0].mediaUrl}}
               key={props.video[0].mediaUrl}
  />
  // <Image style={[styles.placeholder, {
  //   width: props.containerWidth,
  //   height: props.containerWidth
  // }]} source={props.video}>
  //   <Image source={require('Musl/images/profile/btn-video-play.png')}/>
  // </Image>
)

const ProfileVideo = (props: Props) => {
  if (props.video && props.video.length) {
    console.log('VIDOS: ', props.video[0].mediaUrl)

    return renderVideo(props)
  }
  return renderPlaceholder(props)
}

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
})

export default ProfileVideo
