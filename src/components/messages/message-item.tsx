import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockBasic from '../ui/block/basic'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockSpace from '../ui/block/space'
import TextBold from '../global/text/basic/text-bold'
import ProfileModel from '../../models/profile'

interface State {
  answer: string
}

interface Props {
  message: string
  author: ProfileModel
  userPressed: () => void
  messagePressed: () => void
  deleteButtonPressed: () => void
  onSendButtonPressed: (answer: string) => void
  onItemFocus: () => void
}

export default class MessageItem extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  textChanged = (text: string) => {
    this.changeAnswer(text)
  }

  sendButtonPressed = () => {
    this.props.onSendButtonPressed(this.state.answer)
  }

  render() {
    const {author, message, userPressed, messagePressed, deleteButtonPressed} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={userPressed}>
            <UiBlockBasic style={styles.userPictureContainer}>
              {author && (
                <Image style={styles.userPicture} source={author.avatar}/>
              )}
            </UiBlockBasic>
          </TouchableOpacity>

          <View style={styles.messageContainer}>
            <UiBlockBasic style={styles.messageTextContainer}>
              <TouchableOpacity onPress={messagePressed}>
                <TextNormal numberOfLines={3} style={styles.messageText}>
                  <TextBold>{author ? author.nickname : ''}</TextBold>{': ' + message}
                </TextNormal>
              </TouchableOpacity>
            </UiBlockBasic>
            <TouchableOpacity onPress={deleteButtonPressed}>
              <Image style={styles.trash} source={require('Musl/images/messages/icon-trash.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actions}>
          <TextInput onChangeText={this.textChanged}
                     onFocus={this.props.onItemFocus}
                     value={this.state.answer}
                     style={styles.input} placeholder='Reply'/>
          <TouchableOpacity onPress={() => this.sendButtonPressed()}>
            <Image style={styles.reply} source={require('Musl/images/messages/icon-reply.png')}/>
          </TouchableOpacity>
        </View>

        <UiBlockSpace height={30}/>
      </View>
    )
  }

  private changeAnswer = (text: string) => {
    this.setState({
      ...this.state,
      answer: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  content: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userPictureContainer: {
    width: 55,
    height: 55
  },
  userPicture: {
    width: 45,
    height: 45,
    borderRadius: 23
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  messageTextContainer: {
    flex: 1
  },
  messageText: {
    fontSize: 18,
    lineHeight: 20,
    color: '#797979'
  },
  trash: {
    width: 26,
    height: 26,
    marginLeft: 10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 55,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    borderRadius: 3,
    paddingLeft: 7
  },
  input: {
    flex: 1,
    height: 37,
    color: '#000000'
  },
  reply: {
    marginLeft: 7,
    marginRight: 7
  },
  swipeButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  }

})
