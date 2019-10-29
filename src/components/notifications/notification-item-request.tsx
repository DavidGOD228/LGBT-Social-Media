import React from 'react'
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockVerticalCenter from '../ui/block/vertical-center'
import UiBlockHorizontal from '../ui/block/horizontal'
import View = Animated.View

interface Props {
  userPicture: any
  nickName: string
  action: string
  state: string
  onNickNamePress: any
  requestApprovePress: any
  requestDenyPress: any
}

const NotificationItemRequest = (props: Props) => {
  const renderApproveButton = () => {
    if (props.state === 'approved') {
      return <Image source={require('Musl/images/notifications/icon-request-approved.png')}/>
    }
    return <Image source={require('Musl/images/notifications/icon-request-approve.png')}/>
  }

  const renderDenyButton = () => {
    if (props.state === 'denied') {
      return <Image source={require('Musl/images/notifications/icon-request-denied.png')}/>
    }
    return <Image source={require('Musl/images/notifications/icon-request-deny.png')}/>
  }

  return (
    <View style={styles.container}>
      <UiBlockVerticalCenter>
        <View>
          <TextNormal onPress={props.onNickNamePress}
                      style={styles.nickName}>
            {props.nickName}
          </TextNormal>
          <UiBlockSpaceHorizontal width={5}/>
          <TextNormal>
            {props.action}
          </TextNormal>
        </View>
      </UiBlockVerticalCenter>

      {props.state !== 'approved' && props.state !== 'denied' ? (
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <UiBlockHorizontal>
            <TouchableOpacity onPress={props.requestApprovePress}>
              {renderApproveButton()}
            </TouchableOpacity>
            <UiBlockSpaceHorizontal width={10}/>
            <TouchableOpacity onPress={props.requestDenyPress}>
              {renderDenyButton()}
            </TouchableOpacity>
          </UiBlockHorizontal>
        </View>
      ) : null}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  nickName: {
    color: '#5DA4E5'
  }
})

export default NotificationItemRequest
