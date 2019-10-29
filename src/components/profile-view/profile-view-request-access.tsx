import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockHorizontal from '../ui/block/horizontal'
import TextBold from '../global/text/basic/text-bold'
import UiBlockHorizontalCenter from '../ui/block/horizontal-center'
import UiBlockSpace from '../ui/block/space'
import {MediaRequestService} from '../../services/media-request'
import {lazy} from '../../annotations/inversify'
import {AlbumService} from '../../services/album'
import AlbumModel from '../../models/album'
import MediaRequestModel from '../../models/media-request'

interface Props {
  profileId
}

interface State {
  photo?: AlbumModel
  photoRequest?: MediaRequestModel
  video?: AlbumModel
  videoRequest?: MediaRequestModel
  inboundPhotoRequest?: MediaRequestModel
  inboundVideoRequest?: MediaRequestModel
}

class ProfileViewRequestAccess extends Component<Props, State> {

  @lazy('MediaRequestService')
  private mediaRequestService: MediaRequestService

  @lazy('AlbumService')
  private albumService: AlbumService

  constructor(props) {
    super(props)

    this.syncState()
  }

  onPhotoRequestPressed = async () => {
    const photo = this.state.photo

    if (!photo) {
      throw new Error('no album')
    }

    const photoRequest = this.state.photoRequest

    if (photoRequest && ['AWAITING', 'APPROVED'].find(it => it === photoRequest.status)) {
      await this.mediaRequestService.cancel(photoRequest.id)
      return this.syncState()
    }

    await this.mediaRequestService.newOutboundRequest(photo.profileId, photo)
    return this.syncState()
  }

  onVideoRequestPressed = async () => {
    const video = this.state.video

    if (!video) {
      throw new Error('no album')
    }

    const videoRequest = this.state.videoRequest

    if (videoRequest && ['AWAITING', 'APPROVED'].find(it => it === videoRequest.status)) {
      return
    }

    await this.mediaRequestService.newOutboundRequest(video.profileId, video)
    return this.syncState()
  }

  onPhotoInboundRequestPressed = async () => {
    const profileId = this.props.profileId

    const inboundPhotoRequest = this.state.inboundPhotoRequest

    if (inboundPhotoRequest && ['AWAITING', 'APPROVED'].find(it => it === inboundPhotoRequest.status)) {
      await this.mediaRequestService.cancel(inboundPhotoRequest.id)
      return this.syncState()
    }

    const photoRequest = await this.mediaRequestService.newInboundPhotoRequest(profileId)
    photoRequest.set('status', 'APPROVED')
    await photoRequest.save()
    return this.syncState()
  }

  onVideoInboundRequestPressed = async () => {
    const profileId = this.props.profileId

    const inboundVideoRequest = this.state.inboundVideoRequest

    if (inboundVideoRequest && ['AWAITING', 'APPROVED'].find(it => it === inboundVideoRequest.status)) {
      return
    }

    await this.mediaRequestService.newInboundVideoRequest(profileId)
    return this.syncState()
  }

  render() {
    // const videoRequest = this.state ? this.state.videoRequest : null
    const photoRequest = this.state ? this.state.photoRequest : null
    const photo = this.state ? this.state.photo : null
    const inboundPhotoRequest = this.state ? this.state.inboundPhotoRequest : null
    // const inboundVideoRequest = this.state ? this.state.inboundVideoRequest : null

    return !photo ? null : (
      <Image source={require('Musl/images/profile/profile-view/photos-locked-background.png')}
             style={styles.backgroundImage}>
        <View style={styles.container}>
          <TextNormal style={styles.title}>These photos are private</TextNormal>
          <UiBlockHorizontal>
            <TouchableOpacity
              style={styles.requestBlock}
              onPress={this.onPhotoRequestPressed}
            >
              <UiBlockHorizontalCenter>
                <Image source={require('Musl/images/profile/profile-view/icon-photo.png')} style={styles.requestImage}/>
              </UiBlockHorizontalCenter>
              <UiBlockSpace/>
              <TextBold style={styles.requestText}>
                {photoRequest ? (
                  photoRequest.status === 'AWAITING' ? 'You\'ve requested access' :
                    photoRequest.status === 'EXPIRED' ? 'Your request access expired' :
                      photoRequest.status === 'APPROVED' ? 'Your request access was approved' :
                        'Your request access was declined'
                ) : (
                  'Request Photo Access'
                )}
              </TextBold>
            </TouchableOpacity>
            {/* <TouchableOpacity
           style={styles.requestBlock}
           onPress={this.onVideoRequestPressed}
           >
           <UiBlockHorizontalCenter>
           <Image source={require('Musl/images/profile/profile-view/icon-video.png')} style={styles.requestImage}/>
           </UiBlockHorizontalCenter>
           <UiBlockSpace/>
           <TextBold style={styles.requestText}>
           {videoRequest ? (
           videoRequest.status === 'AWAITING' ? 'You\'ve requested access' :
           videoRequest.status === 'EXPIRED' ? 'Your request access expired' :
           videoRequest.status === 'APPROVED' ? 'Your request access were approved' :
           'Your request access were declined'
           ) : (
           'Request Video Access'
           )}
           </TextBold>
           </TouchableOpacity>*/}
          </UiBlockHorizontal>
          <View style={styles.shareContainer}>
            <TouchableOpacity
              style={styles.shareBlock}
              onPress={this.onPhotoInboundRequestPressed}
            >
              <Image source={require('Musl/images/profile/profile-view/icon-photo-lock.png')}
                     style={styles.shareImage}/>
              <TextBold style={styles.shareText}>
                {inboundPhotoRequest ? (
                  inboundPhotoRequest.status === 'AWAITING' ? 'You\'ve shared access' :
                    inboundPhotoRequest.status === 'EXPIRED' ? 'Your shared access expired' :
                      inboundPhotoRequest.status === 'APPROVED' ? 'Your share access were approved' :
                        'Your shared access were declined'
                ) : (
                  'Share Photo Access'
                )}
              </TextBold>
            </TouchableOpacity>
            <View style={styles.shareBlockSeparator}/>
            {/*   <TouchableOpacity
           style={styles.shareBlock}
           onPress={this.onVideoInboundRequestPressed}
           >
           <Image source={require('Musl/images/profile/profile-view/icon-photo-lock.png')} style={styles.shareImage}/>
           <TextBold style={styles.shareText}>
           {inboundVideoRequest ? (
           inboundVideoRequest.status === 'AWAITING' ? 'You\'ve shared access' :
           inboundVideoRequest.status === 'EXPIRED' ? 'Your shared access expired' :
           inboundVideoRequest.status === 'APPROVED' ? 'Your share access were approved' :
           'Your shared access were declined'
           ) : (
           'Share Video Access'
           )}
           </TextBold>
           </TouchableOpacity>*/}
          </View>
        </View>
      </Image>
    )
  }

  private syncState = async () => {

    const [photo /*, video */] = await Promise.all([
      this.albumService.getPhotoForProfile(this.props.profileId)
      // this.albumService.getVideoForProfile(this.props.profileId)
    ])

    const [photoRequest, /* videoRequest, */ inboundPhotoRequest /* inboundVideoRequest*/] = await Promise.all([
      this.mediaRequestService.getOutboundActiveRequest(this.props.profileId, photo),
      // this.mediaRequestService.getOutboundActiveRequest(this.props.profileId, video),
      this.mediaRequestService.getInboundPhotoActiveRequest(this.props.profileId)
      // this.mediaRequestService.getInboundVideoActiveRequest(this.props.profileId)
    ])

    this.setState(prevState => ({
      ...prevState,
      // video,
      photo,
      photoRequest,
      // videoRequest,
      inboundPhotoRequest
      // inboundVideoRequest
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  backgroundImage: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    backgroundColor: 'black'
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  requestBlock: {
    flex: 1,
    flexDirection: 'column'
  },
  shareContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(121, 121, 121)',
    alignItems: 'center'
  },
  shareBlock: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  shareBlockSeparator: {
    width: 1,
    height: '65%',
    backgroundColor: 'rgb(121, 121, 121)'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  requestImage: {
    resizeMode: 'contain',
    width: 40,
    aspectRatio: 1
  },
  requestText: {
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  shareImage: {
    resizeMode: 'contain',
    height: 15,
    aspectRatio: 1
  },
  shareText: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontSize: 16,
    textAlign: 'left',
    color: 'rgb(213, 213, 213)',
    backgroundColor: 'transparent'
  }
})

export default ProfileViewRequestAccess
