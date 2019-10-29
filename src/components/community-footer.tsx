import React from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import TextNormal from './global/text/basic/text-normal'
import UiBlockHorizontalCenter from './ui/block/horizontal-center'
import UiBlockSpace from './ui/block/space'

interface Props {
  onRefresh: () => void
}

const CommunityFooter = (props: Props) =>
  <View style={styles.container}>
    <TextNormal style={styles.text}>This in the end of the line. You've seen the
      closest 120 members to you. You may want
      to refresh to see if anyone new is around</TextNormal>
    <UiBlockSpace/>
    <UiBlockHorizontalCenter >
      <TouchableOpacity style={styles.refreshContainer} onPress={props.onRefresh}>
        <TextNormal style={styles.refreshText}>
          Refresh
        </TextNormal>
      </TouchableOpacity>
    </UiBlockHorizontalCenter>
  </View>

const styles = {
  container: {
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: "#F1D279"
  },
  text: {
    color: "#C33007",
    fontSize: 14,
    textAlign: "center"
  },
  refreshContainer: {
    width: 120,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 14
  },
  refreshText: {
    color: "#4A90E2",
    textAlign: "center"
  }
}

export default CommunityFooter
