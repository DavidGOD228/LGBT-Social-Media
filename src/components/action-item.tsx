import React from 'react'
import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockHorizontal from './ui/block/horizontal'
import UiBlockBasic from './ui/block/basic'
import TextBold from './global/text/basic/text-bold'
import NCView from './global/non-clipping-view'

interface Props {
  children: any
  actionImage: ImageURISource
  onItemClick: () => void
  counter?: number
}

const ActionItem = (props: Props) => (
  <NCView style={styles.itemContainer}>
    <TouchableOpacity
      onPress={props.onItemClick}
    >
      <UiBlockHorizontal >
        <UiBlockBasic>
          <Image source={props.actionImage}/>
        </UiBlockBasic>
        <Text style={styles.actionText}>
          {props.children}
        </Text>
      </UiBlockHorizontal>
    </TouchableOpacity>
    {props.counter ? (
      <View style={styles.newNotification}>
        <TextBold style={styles.newNotificationText}>{props.counter}</TextBold>
      </View>
    ) : (
      null
    )}
  </NCView>
)

export default ActionItem

const styles = StyleSheet.create({
  itemContainer: {
    paddingBottom: 20
  },
  actionText: {
    color: 'grey',
    marginLeft: 10
  },
  newNotification: {
    position: 'absolute',
    left: 15,
    top: -10,
    zIndex: 10,
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
  }
})
