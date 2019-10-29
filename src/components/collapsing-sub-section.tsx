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
import TextNormal from './global/text/basic/text-normal'
import UiBlockHorizontal from './ui/block/horizontal'

interface Props {
  title: string,
  children: any,
  showChildren?: boolean
}

interface State {
  showChildren: boolean,
  completed: boolean
}

export default class CollapsingSubSection extends Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      showChildren: props.showChildren,
      completed: true
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
      require('Musl/images/profile/icon-minus.png')
      :
      require('Musl/images/profile/icon-plus.png')

    const children = this.props.title === 'When / Where' ?
      <View>
        <UiBlockSpace height={10}/>
        <UiBlockHorizontal>
          {this.props.children}
        </UiBlockHorizontal>
      </View> :
      <View>
        <UiBlockSpace height={10}/>
        {this.props.children}
      </View>

    return <View >
      <UiBlockSpace height={5}/>
      <LineFullWidth/>
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleShowChildren}>
          <UiBlockSpace height={10}/>
          <UiBlockHorizontalEdges>
            <TextNormal >{this.props.title}</TextNormal>
            <Image source={toggleIcon} style={styles.toggleSize}/>
          </UiBlockHorizontalEdges>
        </TouchableOpacity>
        {this.state.showChildren && children}
      </View>
      <UiBlockSpace height={10}/>
      <LineFullWidth/>
    </View>
  }

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5
  },
  toggleSize: {
    width: 16,
    height: 16
  }
})
