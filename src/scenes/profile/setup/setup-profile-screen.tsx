import React from 'react'
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges'
import NavigationTextButtonBlue from '../../../components/global/bottom-navigation/text-button-blue'
import NavigationTextButtonWhite from '../../../components/global/bottom-navigation/text-button-white'
import i18n from '../../../locales/i18n'
import UiBlockBasic from '../../../components/ui/block/basic'
import DefaultHeader from '../../../components/global/default-header'
import UiBlockLeft from '../../../components/ui/block/left'
import UiBlockSpace from '../../../components/ui/block/space'
import Input from '../../../components/input'
import TextNormal from '../../../components/global/text/basic/text-normal'
import TextBold from '../../../components/global/text/basic/text-bold'
import SetupProfileScreenValues from '../../../components/profile/setup/profile-values'
import SetupFriendProfileValues from '../../../components/profile/setup/profile-friend-values'
import SetupFlirtProfileValues from '../../../components/profile/setup/profile-flirt-values'
import SetupFunProfileValues from '../../../components/profile/setup/profile-fun-values'
import {NavigationScreenProp} from 'react-navigation'
import MuslImagePicker from '../../../utils/musl-image-picker'
import routeConfig from '../../../router'
import ProfileSetupProcessIndicator from '../../../components/profile/setup/process-indicator'
import {PickerImage} from '../../../utils/media-picker'
import {MediaService} from '../../../services/media'
import {lazy} from '../../../annotations/inversify'
import MediaModel from '../../../models/media'
import BaseScreenDefault from '../../base/base-scene'
import {ProfileService} from '../../../services/profile'
import ProfileModel, {ProfileType} from '../../../models/profile'
import NavigateWithResetToProfileHub from '../../base/navigate-with-reset-to-profile-hub'
import {mixin} from '../../../annotations/common'
import AdBannerCommunityHorizontal from '../../../components/ad/banner-community-horisontal'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  name: string,
  profileType: ProfileType,
  userImage: any,
  profileComplete: number,
  media: MediaModel,
  mediaIsForbidden: boolean
}

@mixin([NavigateWithResetToProfileHub])
export default class SetupProfileScreen
  extends BaseScreenDefault<Props, State>
  implements NavigateWithResetToProfileHub {

  static navigationOptions = {
    header: <DefaultHeader/>
  }

  navigateWithResetToProfileHub: (routeName: string, params?: any) => void

  profileScreenValues: SetupProfileScreenValues
  muslImagePicker: MuslImagePicker

  @lazy('MediaService')
  private mediaService: MediaService

  @lazy('ProfileService')
  private profileService: ProfileService

  constructor(props) {
    super(props)

    const {
      type
    } = this.props.navigation.state.params

    this.state = {
      ...this.state,
      name: '',
      profileType: type,
      profileComplete: 0.1,
      mediaIsForbidden: false
    }

    // todo: refactor in favor of strategy
    if (this.state.profileType === 'FLIRT') {
      this.profileScreenValues = new SetupFlirtProfileValues()
    } else if (this.state.profileType === 'FUN') {
      this.profileScreenValues = new SetupFunProfileValues()
    } else {
      this.profileScreenValues = new SetupFriendProfileValues()
    }
    this.muslImagePicker = new MuslImagePicker()
  }

  nameChanged = (name: string) => {
    this.saveName(name)
  }

  private get profileLabel() {
    return this.profileScreenValues.getProfileLabel()
  }

  private get screenTitle() {
    return this.profileScreenValues.getScreenTitle()
  }

  selectUserImageButtonPress = () => {
    this.pickImage()
  }

  backButtonPress = () => {
    this.navigateToBack()
  }

  nextButtonPress = () => {
    if (this.state.mediaIsForbidden || !this.state.media) {
      return
    }
    this.createProfile()
        .then(profile => this.navigateToProfileDetails(profile))
        .catch(() => this.setSpecState('mediaIsForbidden', true))
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle="light-content"/>
          <View style={styles.bannerContainer}>
            <AdBannerCommunityHorizontal/>
          </View>
          <UiBlockBasic style={styles.content}>
            <UiBlockSpace height={30}/>
            <ProfileSetupProcessIndicator
              profileComplete={this.state.profileComplete}
              profileLabel={this.profileLabel}
              profileText={this.screenTitle}/>

            <UiBlockSpace height={30}/>
            <Input placeholder={i18n.t('profile.setup.nameInputPlaceholder')}
                   onChangeText={this.nameChanged} maxLength={16}/>

            <UiBlockSpace height={20}/>
            <TextNormal style={styles.profilePictureTitle}>
              {i18n.t('profile.setup.profilePicture')}
            </TextNormal>

            <UiBlockBasic>
              <UiBlockLeft>
                {this.state.userImage ? (
                  <View style={styles.userImageContainer}>
                    <View style={styles.userImageTemplate}>
                      <Image style={styles.userImage} resizeMode='cover' source={this.state.userImage}/>
                    </View>
                    <View style={styles.userImageLabelTemplate}>
                      <Image style={styles.userImageLabel} source={this.profileLabel}/>
                    </View>
                  </View>
                ) : (
                  <View style={styles.userImageContainer}>
                    <Image style={styles.userImagePlaceholder} resizeMode='cover' source={this.profileLabel}/>
                  </View>
                )}
                <UiBlockVerticalCenter>
                  <UiBlockBasic style={styles.profilePictureControls}>
                    {this.state.userImage ? null : (
                      <TextNormal style={styles.addPictureTitle}>{i18n.t('profile.setup.addPhoto')}</TextNormal>
                    )}
                    <UiBlockSpace height={5}/>
                    <UiBlockLeft>
                      <TouchableOpacity onPress={this.selectUserImageButtonPress}>
                        {this.state.userImage ? (
                          <TextNormal style={styles.changeImageButton}>Change</TextNormal>
                        ) : (
                          <Image source={require('Musl/images/profile/btn-camera.png')}/>
                        )}
                      </TouchableOpacity>
                    </UiBlockLeft>
                  </UiBlockBasic>
                </UiBlockVerticalCenter>
              </UiBlockLeft>
            </UiBlockBasic>

            <UiBlockSpace height={15}/>
            <TextBold style={styles.notification}>
              {i18n.t('profile.setup.pictureNotification')}
            </TextBold>

            {this.state.mediaIsForbidden ? (
              <View>
                <UiBlockSpace height={7}/>
                <TextBold style={styles.error}>
                  {i18n.t('profile.setup.error.pictureError')}
                </TextBold>
              </View>
            ) : null}

            <UiBlockSpace height={20}/>
          </UiBlockBasic>
        </ScrollView>

        <BottomNavigationPanel>
          <UiBlockVerticalCenter>
            <UiBlockHorizontalEdges>
              <NavigationTextButtonBlue
                onPress={this.backButtonPress}>
                {i18n.t('common.buttons.back')}
              </NavigationTextButtonBlue>
              <NavigationTextButtonWhite
                onPress={this.nextButtonPress}
                disabled={!this.state.userImage || !this.state.name}>
                {i18n.t('common.buttons.next')}
              </NavigationTextButtonWhite>
            </UiBlockHorizontalEdges>
          </UiBlockVerticalCenter>
        </BottomNavigationPanel>
      </View>
    )
  }

  private createProfile = () => {
    this.setSpecState('mediaIsForbidden', false)
    return this.profileService.createNew(this.state.name, this.state.media, this.state.profileType)
  }

  private pickImage = () => {
    this.muslImagePicker.pickImage(this.setUserImage, {
      width: 1000,
      height: 1000,
      cropping: true
    })
  }

  private saveName = (name) => {
    this.setSpecState('name', name)
  }

  // private setUserImage = async (images: PickerImage[]) => {
  //   const image = images[0]

  //   try {
  //     const media = await this.mediaUpload(image.path)

  //     if (media) {
  //       this.setSpecState('userImage', {
  //         uri: media.mediaUrl
  //       })
  //       this.setSpecState('profileComplete', 0.5)
  //       this.setSpecState('media', media)
  //       this.setSpecState('mediaIsForbidden', false)
  //     }
  //   } catch (error) {
  //     this.setSpecState('mediaIsForbidden', true)
  //   }

  // }

  private setUserImage = async (images: PickerImage[]) => {
    const image = images[0];
 
    console.log('imgggg');
    console.log(image);
 
    try {
      const media = await this.mediaUpload(image.path);
      console.log('mdiaaaa');
      console.log(media);
 
      if (media) {
        this.setSpecState('userImage', {
          uri: media.mediaUrl
        })
        this.setSpecState('profileComplete', 0.5)
        this.setSpecState('media', media)
        this.setSpecState('mediaIsForbidden', false)
      }
    } catch (error) {
      console.log('errrorrrr');
      console.log(error);
      this.setSpecState('mediaIsForbidden', true)
    }
 
  }

  private mediaUpload = (file) => {
    return this.mediaService.createNew(file)
  }

  private navigateToBack = () => {
    this.props.navigation.goBack()
  }

  private navigateToProfileDetails = (profile: ProfileModel) => {
    this.navigateWithResetToProfileHub(routeConfig.setupProfileDetails.name, {
      profile,
      firstLaunch: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  content: {
    paddingLeft: 25,
    paddingRight: 25
  },
  processText: {
    fontSize: 30,
    paddingLeft: 15
  },
  processLabel: {
    width: 47,
    height: 47
  },
  profilePictureTitle: {
    color: '#000',
    fontSize: 20
  },
  profilePictureControls: {
    paddingLeft: 20
  },
  userImageContainer: {
    paddingTop: 15
  },
  userImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  userImage: {
    width: 140,
    height: 140,
    borderRadius: 70
  },
  userImageTemplate: {
    width: 154,
    height: 154,
    borderRadius: 77,
    backgroundColor: '#5E9CD3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImageLabel: {
    width: 47,
    height: 47
  },
  userImageLabelTemplate: {
    position: 'absolute',
    left: -5,
    top: 5,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeImageButton: {
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 30,
    paddingBottom: 30,
    color: '#5E9CD3',
    fontSize: 20
  },
  addPictureTitle: {
    fontSize: 16,
    color: '#808183'
  },
  notification: {
    color: '#ABABAB',
    fontSize: 14,
    lineHeight: 19
  },
  error: {
    color: '#D9242B',
    fontSize: 14,
    lineHeight: 19
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
})
