import React from 'react'
import {
  Animated,
  StyleSheet
} from 'react-native'
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal'
import TextNormal from '../global/text/basic/text-normal'
import View = Animated.View

interface Props {
  userPicture: any,
  nickName: string,
  action: string,
  onNickNamePress: any,
  onPress: any
}

const NotificationItemFavorite = (props: Props) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center'
    }}>
      <View>
        <TextNormal onPress={props.onNickNamePress}
                    style={styles.nickName}>
          {props.nickName}
        </TextNormal>
        <UiBlockSpaceHorizontal width={5}/>
        <TextNormal onPress={props.onPress}>
          {props.action}
        </TextNormal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nickName: {
    color: '#5DA4E5'
  }
})

export default NotificationItemFavorite
