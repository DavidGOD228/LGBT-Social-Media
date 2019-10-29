import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import UiBlockBasic from './ui/block/basic'
import UiBlockSpace from './ui/block/space'
import UiBlockLeft from './ui/block/left'
import UiBlockSpaceHorizontal from './ui/block/space-horizontal'
import TextNormal from './global/text/basic/text-normal'
import UiBlockVerticalCenter from './ui/block/vertical-center'

interface Props {
  userPicture: any
  userName: string
  onUnblockPress: () => void
}

interface State {
}

export default class BlockedUser extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <UiBlockBasic>
        <UiBlockSpace height={10}/>

        <UiBlockLeft>
          <Image style={styles.userPicture} source={this.props.userPicture}/>
          <UiBlockSpaceHorizontal width={12}/>
          <UiBlockVerticalCenter>
            <TextNormal>{this.props.userName}</TextNormal>
          </UiBlockVerticalCenter>
          <UiBlockSpaceHorizontal width={12}/>
          <UiBlockVerticalCenter>
            <TouchableOpacity onPress={this.props.onUnblockPress}>
              <Image source={require('Musl/images/notifications/icon-request-approved.png')}/>
            </TouchableOpacity>
          </UiBlockVerticalCenter>
        </UiBlockLeft>

        <UiBlockSpace height={10}/>
      </UiBlockBasic>
    )
  }
}

const styles = StyleSheet.create({
  userPicture: {
    width: 56,
    height: 56,
    borderRadius: 28
  }
})
