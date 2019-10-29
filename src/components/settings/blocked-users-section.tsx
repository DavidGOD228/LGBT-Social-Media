import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
import TextNormal from '../global/text/basic/text-normal'

const BlockedUsersSection = ({onBlockedUsersPress}) => (
  <UiBlockBasic>
    <LineFullWidth style={styles.titleBottomBorder}/>
    <UiBlockSpace height={10}/>
    <UiBlockBasic style={styles.content}>
      <TouchableOpacity onPress={onBlockedUsersPress}>
        <View style={styles.button}>
          <TextNormal style={styles.buttonText}>Review Blocked Users</TextNormal>
        </View>
      </TouchableOpacity>
    </UiBlockBasic>
    <UiBlockSpace height={10}/>
    <LineFullWidth style={styles.titleBottomBorder}/>
  </UiBlockBasic>
)

const styles = StyleSheet.create({
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    backgroundColor: '#F2F2F2',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'black'
  }
})

export default BlockedUsersSection
