import React from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockLeft from '../../ui/block/left'
import UiBlockVerticalCenter from '../../ui/block/vertical-center'
import TextLight from '../../global/text/basic/text-light'
import UiBlockSpace from '../../ui/block/space'
import ProgressBar from '../../global/progress-bar'

interface Props {
  profileComplete?: number,
  profileLabel: any,
  profileText?: string
}

const ProfileSetupProcessIndicator = ({profileComplete = 0, profileLabel, profileText = ''}: Props) => (
  <UiBlockBasic>
    <UiBlockLeft>
      <UiBlockBasic>
        <UiBlockVerticalCenter>
          <Image style={styles.processLabel} source={profileLabel}/>
        </UiBlockVerticalCenter>
      </UiBlockBasic>
      <UiBlockBasic style={{flex: 1}}>
        <UiBlockVerticalCenter>
          <TextLight style={styles.processText}>{profileText}</TextLight>
        </UiBlockVerticalCenter>
      </UiBlockBasic>
    </UiBlockLeft>
    <UiBlockSpace height={10}/>
    <ProgressBar percent={profileComplete}/>
  </UiBlockBasic>
)

export default ProfileSetupProcessIndicator

const styles = StyleSheet.create({
  processText: {
    fontSize: 30,
    paddingLeft: 15
  },
  processLabel: {
    width: 47,
    height: 47
  },
})
