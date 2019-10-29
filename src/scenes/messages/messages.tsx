import React from 'react'
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center'
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges'
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel'
import BaseScreenDefault from '../base/base-scene'
import DefaultHeader from '../../components/global/default-header'
import UiBlockBasic from '../../components/ui/block/basic'
import TextLight from '../../components/global/text/basic/text-light'
import UiBlockSpace from '../../components/ui/block/space'
import LineFullWidth from '../../components/global/line-full-width'
import MessageItem from '../../components/messages/message-item'
import routeConfig from '../../router'
import ActionListButton from '../../components/action-list-button'
import ProfileSwitcher from '../../components/profile-switcher'
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel'
import {ChatService} from '../../services/chat'
import {lazy} from '../../annotations/inversify'
import {ChatMemberService} from '../../services/chat-member'
import {ProfileService} from '../../services/profile'
import {MessageService} from '../../services/message'
import ChatModel from '../../models/chat'
import AdBannerCommunityHorizontal from '../../components/ad/banner-community-horisontal'
import ProfileModel from '../../models/profile'
import KeyboardAvoidingWrapper from '../../components/keyboard-avoiding-wrapper'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  chats: any
  refreshing: boolean
}

export default class MessagesScreen extends BaseScreenDefault<Props, State> {

  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  @lazy('ChatService')
  private chatService: ChatService

  @lazy('ChatMemberService')
  private chatMemberService: ChatMemberService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('MessageService')
  private messageService: MessageService

  private chatsFlatList: any

  private keyboardDidShowListener: any
  private keyboardDidHideListener: any

  constructor(props) {
    super(props)

    this.state = {
      chats: [],
      refreshing: false
    }

    this.syncAllChats()

    this.scrollChatItemsBottom(true)
  }

  private get chats() {
    return this.state.chats
  }

  componentDidMount() {
    this.scrollChatItemsBottom()
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  componentDidUpdate() {
    this.scrollChatItemsBottom()
  }

  keyboardDidShow = (event) => {
    console.log('keyboardDidShow' + event.endCoordinates.height)
  }

  keyboardDidHide = () => {
    console.log('keyboardDidHide')
  }

  sendMessagePressed = async (item, answer: string) => {

    if (!answer || !answer.trim().length) {
      return
    }

    let message
    try {
      message = await this.sendMessage(item.chat, answer)
    } catch (error) {
      console.log(error)
    }

    if (!message) {
      this.syncAllChats()
      return
    }

    item.owner.set('lastViewedOrderNumber', message.orderNumber)
    await item.owner.save()
    this.syncAllChats()
  }

  render() {
    return (
      <KeyboardAvoidingWrapper style={styles.container} behavior={'padding'}>
        <StatusBar barStyle="light-content"/>

        <View style={styles.bannerContainer}>
          <AdBannerCommunityHorizontal/>
        </View>

        <UiBlockBasic style={styles.content}>
          <UiBlockSpace height={30}/>
          <TextLight style={styles.title}>Messages</TextLight>
          <UiBlockSpace height={8}/>
          <LineFullWidth style={styles.titleBottomBorder}/>
          <UiBlockSpace height={20}/>

          <FlatList
            onRefresh={this.syncAllChats}
            refreshing={this.state.refreshing}
            ref={ref => this.chatsFlatList = ref}
            data={this.chats}
            renderItem={this.renderChatItem}
            keyExtractor={item => JSON.stringify(item)}
          />
        </UiBlockBasic>

        <UiBlockBottomPanel>
          <BottomNavigationPanel>
            <UiBlockVerticalCenter>
              <UiBlockHorizontalEdges>
                <ProfileSwitcher navigation={this.props.navigation}/>
                <ActionListButton navigation={this.props.navigation}/>
              </UiBlockHorizontalEdges>
            </UiBlockVerticalCenter>
          </BottomNavigationPanel>
        </UiBlockBottomPanel>
      </KeyboardAvoidingWrapper>
    )
  }

  renderChatItem = ({item}) => {
    return (
      <MessageItem author={item.author}
                   message={item.message}
                   userPressed={() => this.goToProfile(item.mainProfile)}
                   messagePressed={() => this.messageItemPress(item)}
                   deleteButtonPressed={() => this.deleteChat(item)}
                   onSendButtonPressed={(answer) => this.sendMessagePressed(item, answer)}
                   onItemFocus={() => this.scrollToItem(item)}
      />
    )
  }

  scrollToItem = (item: ChatModel) => {
    if (this.state.chats.length === 1) {
      return
    }
    let position = this.state.chats.indexOf(item)
    position = position === this.state.chats.length - 1 ? position - 1 : position
    this.chatsFlatList.scrollToIndex({
      animated: true,
      index: position,
      viewPosition: 0
    })
  }

  private scrollChatItemsBottom = (isAnimated = false) => {
    setTimeout(() => this.chatsFlatList.scrollToEnd({animated: isAnimated}), 100)
  }

  private goToProfile = async (profile: ProfileModel) => {
    const communityDto = await this.profileService.getCommunityDtoByProfileId(profile.id)
    if (communityDto === null) {
      return this.props.navigation.navigate(routeConfig.profileBlocked.name)
    }
    if (communityDto === -1) {
      return
    }
    return this.props.navigation.navigate(routeConfig.profileView.name, {profile: {item: communityDto}})
  }

  private messageItemPress = (item) => {
    this.props.navigation.navigate(routeConfig.chat.name, {item})
  }

  private deleteChat = async (item) => {
    const member = item.owner || await this.chatMemberService.getMeForChat(item.chat)

    member.set('chatHidden', true)
    await member.save()

    return this.syncAllChats()
  }

  private syncAllChats = async () => {

    this.setSpecState('refreshing', true)

    const chats = await this.chatService.getAllForCurrentProfile()
    const activeProfileId = this.profileService.getActiveProfileId()

    // order of init array is saved
    const members = await Promise.all(chats.map(it => this.chatMemberService.getAllActiveForChat(it)))

    const chatMap = members.map(async it => {
      const owner = it.find(member => member.profileId === activeProfileId)

      const others = it.filter(member => member.profileId !== activeProfileId)

      const main = others.pop()

      const mainProfile = await this.profileService.getByPrimary(main ? main.profileId : 0)

      if (!owner || !mainProfile) {
        throw new Error('no profile in members')
      }

      const lastMessage = await this.messageService.getLastForChat(owner.chat)
      const message = lastMessage ? await this.messageService.getContentFor(lastMessage) : null
      let msgAuthor
      if (message) {
        msgAuthor = await this.profileService.getByPrimary(message.message.chatMember.profileId)
      }

      return {
        chat: owner.chat,
        members: others,
        owner,
        mainProfile,
        author: msgAuthor,
        senderType: owner.score,
        message: message ? (message.contentType === 'TEXT' ? message.text : 'Image') : 'no messages for now',
        seen: owner.chat.lastOrderNumber === -1 || owner.chat.lastOrderNumber === owner.lastViewedOrderNumber
      }
    })

    const chatDtoList = await Promise.all(chatMap)
    this.setSpecState('refreshing', false)
    this.setSpecState('chats', chatDtoList)
  }

  private sendMessage = (chat: ChatModel, answer: string) => {
    if (!answer) {
      return
    }

    return this.messageService.newMessage(chat, answer)
  }
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    zIndex: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 24
  },
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  allTab: {
    width: 55,
    height: 21,
    lineHeight: 25,
    fontSize: 14
  },
  tabIcon: {
    width: 21,
    height: 21,
    marginRight: 50
  },
  tabsBottomBorder: {
    backgroundColor: '#E3E3E3'
  },
  switchBtnContainer: {
    flex: 1
  },
  switcherBtn: {
    fontSize: 15,
    textAlign: 'center',
    color: '#5DA4E5',
    paddingTop: 6,
    paddingBottom: 6
  },
  switcherBtnSelected: {
    color: 'rgb(46, 46, 46)',
    backgroundColor: '#E3E3E3'
  },
  splash: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  newNotification: {
    position: 'absolute',
    right: 33,
    top: 0,
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
