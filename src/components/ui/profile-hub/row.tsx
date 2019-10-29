import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import ProfileModel from '../../../models/profile'
import {PROFILE_TYPES} from '../../../configs/dicts'
import TextBold from '../../global/text/basic/text-bold'
import UiBlockSpace from '../block/space'
import TextNormal from '../../global/text/basic/text-normal'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textView: {
    flex: 1,
    paddingLeft: 20,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 24,
    marginRight: 23,
    fontWeight: 'bold',
    color: 'rgb(40, 98, 148)'
  },
  subtext: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingRight: 15,
    fontSize: 14,
    color: 'rgb(93, 164, 229)'
  },
  userImageContainer: {
    paddingTop: 5,
    height: '100%',
    aspectRatio: 1
  },
  userImage: {
    height: '93%',
    aspectRatio: 1,
    borderRadius: 70
  },
  userImageTemplate: {
    marginLeft: 10,
    height: '95%',
    aspectRatio: 1,
    borderRadius: 77,
    backgroundColor: 'rgb(84, 147, 203)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImageLabel: {
    height: '92%',
    aspectRatio: 1
  },
  userImageLabelTemplate: {
    position: 'absolute',
    left: 0,
    top: 2,
    height: '34%',
    aspectRatio: 1,
    borderRadius: 27,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
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

  indicator: {
    position: 'absolute',
    top: 15,
    right: 10
  }
})

interface Props {
  data: ProfileModel
  onClick: () => void
  onNavigateTo: () => void
  onCommunityPress: () => void
  onNotificationsPress: () => void
  onMessagesPress: () => void
  newMessages: number
  newNotifications: number
}

const UiProfileHubRow = (props: Props) => {
  const templateSource = (model: ProfileModel) => {
    return PROFILE_TYPES.find(profile => profile.name === model.profileType.code) || PROFILE_TYPES[0]
  }

  const {
    data,
    onClick,
    onNavigateTo,
    onCommunityPress,
    onNotificationsPress,
    onMessagesPress,
    newMessages,
    newNotifications
  } = props

  return <View style={styles.container}>
    <TouchableOpacity onPress={onNavigateTo}>
      <View style={styles.userImageContainer}>
        <View style={styles.userImageTemplate}>
          <Image style={styles.userImage} resizeMode='cover' source={data.avatar}/>
        </View>
        <View style={styles.userImageLabelTemplate}>
          <Image style={styles.userImageLabel} source={templateSource(data).photo}/>
        </View>
      </View>
    </TouchableOpacity>
    <View style={styles.textView}>
      <TouchableOpacity onPress={onNavigateTo}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>
          {data.nickname}
        </Text>
      </TouchableOpacity>
      <View style={styles.interactions}>
        <TouchableOpacity style={styles.communityItem} onPress={onCommunityPress}>
          <View>
            <Image source={require('Musl/images/global/icon-btn-community.png')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationsItem} onPress={onNotificationsPress}>
          <View>
            <Image source={require('Musl/images/global/icon-notifications.png')}/>
          </View>

          {newNotifications ? (<View style={styles.newNotification}>
            <TextBold style={styles.newNotificationText}>{newNotifications}</TextBold>
          </View>) : null}

        </TouchableOpacity>
        <TouchableOpacity style={styles.messagesItem} onPress={onMessagesPress}>
          <View>
            <Image source={require('Musl/images/global/icon-messages.png')}/>
          </View>

          {newMessages ? (<View style={styles.newMessage}>
            <TextBold style={styles.newMessageText}>{newMessages}</TextBold>
          </View>) : null}

        </TouchableOpacity>
      </View>
      <UiBlockSpace height={5}/>
      <TouchableOpacity onPress={onClick}>
        <TextNormal style={styles.subtext}>
          Edit Profile
        </TextNormal>
      </TouchableOpacity>
    </View>

    <Image style={styles.indicator}
           source={props.data.active ?
             require('Musl/images/global/icon-active.png') : require('Musl/images/global/icon-inactive.png')}/>
  </View>
}

export default UiProfileHubRow
