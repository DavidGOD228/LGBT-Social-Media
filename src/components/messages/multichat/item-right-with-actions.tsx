import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import TextNormal from '../../global/text/basic/text-normal'
import UiBlockSpaceHorizontal from '../../ui/block/space-horizontal'

interface Props {
  nickname: string
  avatar: any
  added?: boolean
  onToggleLinkedProfile: any
}

const MultichatItemRightWithActions = (props: Props) => (
  <View style={styles.container}>
    <UiBlockSpaceHorizontal width={3}/>
    {props.added && (
      <Image style={styles.avatar} source={props.avatar}/>
    )}

    <UiBlockSpaceHorizontal width={3}/>
    <TextNormal numberOfLines={1} style={[styles.nickname, !props.added && {color: '#8C8C8C'}]}>
      {props.nickname}
    </TextNormal>

    <UiBlockSpaceHorizontal width={5}/>
    <TouchableOpacity onPress={props.onToggleLinkedProfile}>
      {props.added ? (
        <Image style={styles.action} source={require('Musl/images/messages/icon-unlink-profile.png')}/>
      ) : (
        <Image style={styles.action} source={require('Musl/images/messages/icon-link-profile.png')}/>
      )}
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  avatar: {
    width: 26,
    height: 26
  },
  nickname: {
    fontSize: 14,
    color: 'black',
    flex: 1
  },
  action: {
    width: 26,
    height: 26
  }
})

export default MultichatItemRightWithActions
