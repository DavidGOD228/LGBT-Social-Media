import React from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import TextNormal from './global/text/basic/text-normal'
import UiBlockHorizontalCenter from './ui/block/horizontal-center'
import UiBlockSpace from './ui/block/space'

interface Props {
  onAdjustPressed: () => void,
  resultCount: number
}

const CommunityHeaderAdjust = (props: Props) =>
  <View style={styles.container}>
    <TextNormal style={styles.text}>Your search resulted in {props.resultCount} people near your location</TextNormal>
    <UiBlockSpace height={5}/>
    <UiBlockHorizontalCenter >
      <TouchableOpacity onPress={props.onAdjustPressed}>
        <TextNormal style={styles.refreshText}>
          Adjust your filters
        </TextNormal>
      </TouchableOpacity>
    </UiBlockHorizontalCenter>
  </View>

const styles = {
  container: {
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    backgroundColor: "#E7EBEF"
  },
  text: {
    color: "#4A4A4A",
    fontSize: 14,
    textAlign: "center",
    paddingRight: 60,
    paddingLeft: 60
  },
  refreshText: {
    color: "#4A90E2",
    textAlign: "center"
  }
}

export default CommunityHeaderAdjust
