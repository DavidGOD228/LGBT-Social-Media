import React from 'react'
import {
  Animated,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import IOSCLearIcon from 'react-native-vector-icons/EvilIcons';
import UiBlockLeft from '../../ui/block/left'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockVerticalCenter from '../../ui/block/vertical-center'
import TextBold from '../../global/text/basic/text-bold'
import UiBlockSpace from '../../ui/block/space'
import MuslImagePicker from '../../../utils/musl-image-picker'
import {PickerImage} from '../../../utils/media-picker'
import i18n from '../../../locales/i18n'
import View = Animated.View

interface Props {
  avatar: any,
  nickName: string,
  oldName: string,
  nickNameOnFocus: () => void,
  nickNameChanged: (name: string) => void,
  nickNameOnEndEditing: () => void,
  nickNameIsEditing: boolean,
  profileLabel: any,
  avatarPicked: (image: PickerImage[]) => void,
  mediaIsForbidden: boolean,
  onCommunityPress: () => void,
  onNotificationsPress: () => void,
  onMessagesPress: () => void,
  newMessages: number,
  newNotifications: number,
  setTextInputOnFocus: () => void
}

const pickAvatarButtonPress = (imagePicker: MuslImagePicker, avatarPicked: (image: PickerImage[]) => void) => {
  imagePicker.pickImage(avatarPicked, {
    width: 1000,
    height: 1000,
    cropping: true
  })
}

const ProfileHeader = (props: Props) => {
  const muslImagePicker = new MuslImagePicker()
  const {
    avatar,
    nickName,
    oldName,
    nickNameOnFocus,
    nickNameChanged,
    nickNameOnEndEditing,
    profileLabel,
    avatarPicked,
    mediaIsForbidden,
    onCommunityPress,
    onNotificationsPress,
    onMessagesPress,
    newMessages,
    newNotifications,
    nickNameIsEditing,
    setTextInputOnFocus
  } = props;
  console.log(nickNameIsEditing, setTextInputOnFocus)

  return (
    <UiBlockBasic style={styles.container}>
      <UiBlockLeft>
        <UiBlockBasic style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => {
            pickAvatarButtonPress(muslImagePicker, avatarPicked)
          }}>
            <Image style={styles.avatar} resizeMode='cover' source={avatar}/>
            <View style={styles.profileLabelTemplate}>
              <Image style={styles.profileLabel} source={profileLabel}/>
            </View>

            <View style={styles.changeAvatarTemplate}>
              <Image style={styles.changeAvatarImage} source={require('Musl/images/profile/btn-camera.png')}/>
            </View>
          </TouchableOpacity>
        </UiBlockBasic>
        <UiBlockBasic style={{flex: 1}}>
          <UiBlockVerticalCenter>
            <UiBlockBasic>

                <View style={styles.inputWithCLear}>
                  <TextInput editable={true}
                             maxLength={16}
                             placeholder={i18n.t('profile.setup.nameInputPlaceholder')}
                             placeholderTextColor='#8D8D8D'
                             value={nickName}
                             style={styles.nickName}
                             onFocus={() => {
                               nickNameOnFocus()
                             }}
                             onEndEditing={(event) => {
                               if (event.nativeEvent.text.trim().length === 0) {
                                 nickNameChanged(oldName)
                               }
                               nickNameOnEndEditing()
                             }}
                             onChangeText={(name) => {
                               nickNameChanged(name)
                             }}/>
                  <TouchableOpacity  onPress={() => {
                    nickNameChanged('')
                  }}>
                    <IOSCLearIcon style={{fontSize: 30}} name="close-o"/>
                  </TouchableOpacity>
                </View>

              <View style={styles.interactions}>
                <View style={styles.communityItem}>
                  <TouchableOpacity onPress={onCommunityPress}>
                    <Image source={require('Musl/images/global/icon-btn-community.png')}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.notificationsItem}>
                  <TouchableOpacity onPress={onNotificationsPress}>
                    <Image source={require('Musl/images/global/icon-notifications.png')}/>
                  </TouchableOpacity>

                  {newNotifications ? (<View style={styles.newNotification}>
                    <TextBold style={styles.newNotificationText}>{newNotifications}</TextBold>
                  </View>) : null}

                </View>
                <View style={styles.messagesItem}>
                  <TouchableOpacity onPress={onMessagesPress}>
                    <Image source={require('Musl/images/global/icon-messages.png')}/>
                  </TouchableOpacity>

                  {newMessages ? (<View style={styles.newMessage}>
                    <TextBold style={styles.newMessageText}>{newMessages}</TextBold>
                  </View>) : null}

                </View>
              </View>
              {mediaIsForbidden ? (
                <View>
                  <UiBlockSpace height={10}/>
                  <TextBold style={styles.error}>
                    {i18n.t('profile.setup.error.pictureError')}
                  </TextBold>
                </View>
              ) : null}
            </UiBlockBasic>
          </UiBlockVerticalCenter>
        </UiBlockBasic>
      </UiBlockLeft>
    </UiBlockBasic>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F5F7',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20
  },
  avatarContainer: {
    paddingRight: 15
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: '#5493CB'
  },
  profileLabelTemplate: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileLabel: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  changeAvatarTemplate: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeAvatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  nickName: {
    fontSize: 24,
    color: '#286294'
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50
  },
  communityItem: {
    height: '100%',
    justifyContent: 'center',
    paddingRight: 20
  },
  notificationsItem: {
    height: '100%',
    justifyContent: 'center',
    paddingRight: 20
  },
  messagesItem: {
    height: '100%',
    justifyContent: 'center',
    paddingRight: 20
  },
  notification: {
    position: 'absolute',
    right: -8,
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CE0B24',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  notificationText: {
    color: 'white',
    fontSize: 13
  },
  error: {
    color: '#D9242B',
    fontSize: 12
  },
  newNotification: {
    position: 'absolute',
    right: 12,
    top: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CE0B24',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  newNotificationText: {
    color: 'white',
    fontSize: 13
  },

  newMessage: {
    position: 'absolute',
    right: 12,
    top: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CE0B24',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  newMessageText: {
    color: 'white',
    fontSize: 13
  },
  inputWithCLear: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default ProfileHeader
