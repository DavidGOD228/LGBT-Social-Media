import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockBasic from '../ui/block/basic'
import UiBlockBottom from '../ui/block/bottom'
import UiBlockSpace from '../ui/block/space'

interface Props {
  body: string
  placeholder: string
  onValueUpdated: (value: string) => void
}

interface State {
  value: string
  changed: boolean
  saved: boolean
}

class ProfileViewMessage extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.body,
      changed: false,
      saved: false
    }
  }

  private get placeholder() {
    return this.props.placeholder
  }

  textChanged = (text) => {
    this.changeValue(text)
  }

  render() {
    return (
      <UiBlockBasic style={{flex: 1}}>
        <UiBlockSpace height={10}/>
        <View style={styles.textContainer}>
          <TextInput multiline={true}
                     numberOfLines={5}
                     editable={true}
                     placeholder={this.placeholder}
                     placeholderTextColor='#8D8D8D'
                     value={this.state.value}
                     style={styles.textInput}
                     onChangeText={this.textChanged}/>
        </View>
        <UiBlockBottom>
          <View style={styles.bottomContainer}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              {/*<TouchableOpacity style={styles.btnContainer}>
                <Image style={styles.smallButton} source={require('Musl/images/profile/icon-plus.png')}/>
              </TouchableOpacity>
              <TextNormal style={styles.linkText}> KansasKen</TextNormal>*/}
            </View>

            {this.state.changed ? (
              <TouchableOpacity onPress={() => this.props.onValueUpdated(this.state.value)}>
                <Image source={require('Musl/images/messages/icon-chat-reply.png')}/>
              </TouchableOpacity>
            ) : (null)}
          </View>
        </UiBlockBottom>
      </UiBlockBasic>
    )
  }

  private changeValue = async (text) => {
    this.setState(prevState => ({
      ...prevState,
      value: text,
      changed: text.length > 0,
      saved: false
    }))
  }
}

const styles = StyleSheet.create({
  textContainer: {
    width: '100%',
    height: 130
  },
  textInput: {
    color: 'rgb(46, 46, 46)',
    textAlignVertical: 'top',
    fontSize: 17
  },
  smallButton: {
    width: 22,
    height: 22
  },
  btnContainer: {
    width: 22,
    height: 22
  },
  linkText: {
    color: 'rgb(169, 169, 169)',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  bottomContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default ProfileViewMessage
