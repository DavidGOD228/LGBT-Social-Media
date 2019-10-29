import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockHorizontalEdges from './ui/block/horizontal-edges'
import LineFullWidth from './global/line-full-width'
import UiBlockSpace from './ui/block/space'
import TextBold from './global/text/basic/text-bold'
import UiBlockHorizontal from './ui/block/horizontal'
import UiBlockSpaceHorizontal from './ui/block/space-horizontal'
import UiBlockBasic from './ui/block/basic'

interface Props {
  title: string,
  children: any,
  completed: boolean,
  infoPressed?: () => void,
  showChildren?: boolean
}

interface State {
  showChildren: boolean,
}

export default class CollapsingSection extends Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      showChildren: props.showChildren
    }
  }

  toggleShowChildren = () => {
    this.setState({
      ...this.state,
      showChildren: !this.state.showChildren
    })
  }

  render() {
    const toggleIcon = this.state.showChildren ?
      require('Musl/images/profile/icon-minus-dark.png')
      :
      require('Musl/images/profile/icon-plus-dark.png')

    const completedIcon = (this.props.completed && require('Musl/images/profile/icon-check.png')) || null

    const children = <View>
      {this.props.children}
    </View>

    return <View >
      <LineFullWidth style={styles.line}/>
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleShowChildren}>
          <UiBlockSpace height={10}/>
          <UiBlockHorizontalEdges>
            <UiBlockBasic>
              <TextBold >{this.props.title}</TextBold>
              { this.props.infoPressed ? (
                <TouchableOpacity style={styles.infoIcon} onPress={this.props.infoPressed}>
                  <Image source={require('Musl/images/global/icon-btn-info.png')}/>
                </TouchableOpacity>
              ) : (
                null
              )}
            </UiBlockBasic>
            <UiBlockHorizontal>
              <Image source={completedIcon} style={styles.toggleSize}/>
              <UiBlockSpaceHorizontal width={10}/>
              <Image source={toggleIcon} style={styles.toggleSize}/>
            </UiBlockHorizontal>
          </UiBlockHorizontalEdges>
        </TouchableOpacity>
        {this.state.showChildren && children}
      </View>
      <UiBlockSpace height={10}/>
      <LineFullWidth style={styles.line}/>
    </View>
  }

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5
  },
  toggleSize: {
    width: 20,
    height: 20
  },
  line: {
    backgroundColor: '#579ee9'
  },
  infoIcon: {
    position: 'absolute',
    top: -7,
    right: -30
  }
})

