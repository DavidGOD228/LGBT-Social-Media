import React from 'react'
import {
  StyleSheet,
  Image,
  View
} from 'react-native'
import TextNormal from '../../global/text/basic/text-normal'
import UiBlockSpaceHorizontal from '../../ui/block/space-horizontal'

interface Props {
  nickname: string
  avatar: any
}

const MultichatItemRight = (props: Props) => (
  <View style={styles.container}>
    <UiBlockSpaceHorizontal width={3}/>
    <Image style={styles.avatar}
      source={props.avatar}/>
    <UiBlockSpaceHorizontal width={3}/>
    <TextNormal style={styles.nickname}>{props.nickname}</TextNormal>
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
  }
})

export default MultichatItemRight
