import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockHorizontal from '../ui/block/horizontal'
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal'
import UiBlockSpace from '../ui/block/space'
import UiBlockBasic from '../ui/block/basic'
import NotificationItemMessage from './notification-item-message'
import NotificationItemFavorite from './notification-item-favorite'
import NotificationItemView from './notification-item-view'
import NotificationItemFlex from './notification-item-flex'
import NotificationItemRequest from './notification-item-request'

import {NotificationType} from '../../scenes/notifications'

interface Props {
  type: string
  userPicture: any
  nickName: string
  action: string
  state: string
  onNickNamePress: () => void
  onPress: () => void
  requestApprovePress: () => void
  requestDenyPress: () => void
}

const notificationsTypes = {
  [NotificationType.profileViewed]: NotificationItemView,
  [NotificationType.profileFavorited]: NotificationItemFavorite,
  [NotificationType.profileFlexed]: NotificationItemFlex,
  [NotificationType.message]: NotificationItemMessage,
  [NotificationType.mediaRequest]: NotificationItemRequest
}

export default class NotificationItem extends Component<Props, {}> {

  render() {
    return (
      <UiBlockBasic>
        <UiBlockSpace height={10}/>
        <UiBlockHorizontal>
          <TouchableOpacity onPress={this.props.onNickNamePress}>
            <Image style={styles.userPicture} source={this.props.userPicture}/>
          </TouchableOpacity>
          <UiBlockSpaceHorizontal width={10}/>
          {this.renderItemContent()}
        </UiBlockHorizontal>
        <UiBlockSpace height={10}/>
      </UiBlockBasic>
    )
  }

  renderItemContent = () => {
    const {type} = this.props
    const component = notificationsTypes[type]
    return component(this.props)
  }
}

const styles = StyleSheet.create({
  userPicture: {
    width: 45,
    height: 45,
    borderRadius: 23
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row'
  }
})
