import React, {Component} from 'react'
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import {
  NavigationActions,
  NavigationScreenProp
} from 'react-navigation'
import DefaultHeader from '../../components/global/default-header'
import UiBlockHorizontalEdges from '../../components/ui/block/horizontal-edges'
import UiBlockVerticalCenter from '../../components/ui/block/vertical-center'
import BottomNavigationPanel from '../../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockBasic from '../../components/ui/block/basic'
import UiBlockHorizontal from '../../components/ui/block/horizontal'
import TextNormal from '../../components/global/text/basic/text-normal'
import UiBlockSpaceHorizontal from '../../components/ui/block/space-horizontal'
import UiBlockSpace from '../../components/ui/block/space'
import routeConfig from '../../router'
import UiBlockBottomPanel from '../../components/ui/block/bottom-panel'
import ProfileSwitcher from '../../components/profile-switcher'
import ActionListButton from '../../components/action-list-button'
import ChatItemCompanion from '../../components/messages/chat-item-companion'
import ChatItemMe from '../../components/messages/chat-item-me'
import MuslImagePicker from '../../utils/musl-image-picker'
import {PickerImage} from '../../utils/media-picker'
import {MessageService} from '../../services/message'
import {lazy} from '../../annotations/inversify'
import MessageContentModel from '../../models/message-content'
import {ProfileService} from '../../services/profile'
import {RabbitCredentialService} from '../../services/rabbit-credential'
import MultichatItemLeft from '../../components/messages/multichat/item-left'
import MultichatItemRightWithActions from '../../components/messages/multichat/item-right-with-actions'
import {LinkedProfileService} from '../../services/linked-profile'
import {
  ChatMemberService,
  default as chatMemberService
} from '../../services/chat-member'
import ProfileModel from '../../models/profile'
import ChatMemberModel from '../../models/chat-member'
import MultichatItemRight from '../../components/messages/multichat/item-right'
import {MediaService} from '../../services/media'
import AdBannerCommunityHorizontal from '../../components/ad/banner-community-horisontal'
import KeyboardAvoidingWrapper from '../../components/keyboard-avoiding-wrapper'
import {
  generateUUID
} from '../../utils/string'

interface Props {
  navigation: NavigationScreenProp<any, any>
  item: any
}

interface Collaborator {
  added: boolean
  chatMember?: ChatMemberModel
  profile: ProfileModel
}

interface State {
  answer: string
  messages: any
  myPartner?: Collaborator
  collaborators: Collaborator[]
  owner: boolean
}

export default class ChatScreen extends Component<Props, State> {
  static navigationOptions = ({navigation}) => ({
    header: <DefaultHeader showCommunityButton={true} navigation={navigation}/>
  })

  subscription: { unsubscribe() }

  muslImagePicker: MuslImagePicker

  chatFlatList: any

  @lazy('MessageService')
  private messageService: MessageService

  @lazy('ProfileService')
  private profileService: ProfileService

  @lazy('RabbitCredentialService')
  private rabbitCredentialService: RabbitCredentialService

  @lazy('LinkedProfileService')
  private linkedProfileService: LinkedProfileService

  @lazy('ChatMemberService')
  private chatMemberService: ChatMemberService

  @lazy('MediaService')
  private mediaService: MediaService

  private keyboardDidShowListener: any
  private keyboardDidHideListener: any

  private IS_MOUNTED: boolean = false

  constructor(props) {
    super(props)
    this.state = {
      answer: '',
      messages: [],
      collaborators: [],
      owner: false
    }
    this.muslImagePicker = new MuslImagePicker()
  }

  componentDidMount() {
    this.IS_MOUNTED = true
    // this.scrollChatItemsBottom()
    this.subscribeForChanges()
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

    this.syncCollaborators()

    this.syncMessages()
        .then(() => {
          console.log('Should scroll to bottom by now')
          this.scrollChatItemsBottom(true)
        })
  }

  componentWillUnmount() {
    this.IS_MOUNTED = false
    this.unsubscribeForChanges()
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = () => {
    this.chatFlatList.scrollToEnd({animated: false})
  }

  keyboardDidHide = () => {
    this.chatFlatList.scrollToEnd({animated: false})
  }

  componentDidUpdate() {
    this.scrollChatItemsBottom(true)
  }

  toggleLinkedProfile = ({profile, added, chatMember}: Collaborator) => async () => {
    const chat = this.props.navigation.state.params.item.chat
    if (added && chatMember) {
      await this.chatMemberService.removeMemberFromChat(chatMember)
    } else {
      if (chatMember) {
        await this.chatMemberService.addMemberToChat(chatMember)
      } else {
        await this.chatMemberService.newMemberToChat(profile.id, chat, 'GUEST')
      }
    }
    return this.syncCollaborators()
  }

  render() {
    return (
      <KeyboardAvoidingWrapper style={styles.container} behavior={'padding'}>

        <View style={styles.bannerContainer}>
          <AdBannerCommunityHorizontal/>
        </View>

        <View style={styles.chatComponents}>
          <UiBlockBasic>
            <UiBlockBasic style={styles.chatNavigation}>
              <UiBlockSpace height={10}/>
              <UiBlockHorizontalEdges>
                <TouchableOpacity onPress={this.backButton}>
                  <UiBlockHorizontal>
                    <Image style={styles.chatNavigationImage} source={require('Musl/images/messages/back-arrow.png')}/>
                    <UiBlockSpaceHorizontal width={8}/>
                    <UiBlockBasic>
                      <UiBlockVerticalCenter>
                        <TextNormal style={styles.chatNavigationText}>Messages</TextNormal>
                      </UiBlockVerticalCenter>
                    </UiBlockBasic>
                  </UiBlockHorizontal>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.communityButton}>
                  <UiBlockHorizontal>
                    <UiBlockBasic>
                      <UiBlockVerticalCenter>
                        <TextNormal style={styles.chatNavigationText}>Community View</TextNormal>
                      </UiBlockVerticalCenter>
                    </UiBlockBasic>
                    <UiBlockSpaceHorizontal width={8}/>
                    <Image style={styles.chatNavigationImage}
                           source={require('Musl/images/messages/forward-arrow.png')}/>
                  </UiBlockHorizontal>
                </TouchableOpacity>
              </UiBlockHorizontalEdges>
              <UiBlockSpace height={10}/>
            </UiBlockBasic>

            <UiBlockBasic style={{
              marginLeft: 25,
              marginRight: 25,
              borderBottomWidth: 1,
              borderBottomColor: '#979797'
            }}>
              <UiBlockSpace height={10}/>
              <UiBlockHorizontalEdges>
                {this.multichatCollaborators()}
                {this.multichatLinkedProfile()}
              </UiBlockHorizontalEdges>
              <UiBlockSpace height={3}/>
            </UiBlockBasic>
          </UiBlockBasic>

          <View style={styles.messagesContainer}>
            <FlatList
              ref={ref => this.chatFlatList = ref}
              initialNumToRender={this.state.messages.length ? this.state.messages.length - 1 : 0}
              style={styles.messagesList}
              data={this.state.messages}
              renderItem={this.renderMessage}
              keyExtractor={item => item.key}
            />
          </View>

          <UiBlockBasic style={styles.chatInput}>
            <UiBlockSpace height={10}/>
            <UiBlockHorizontalEdges>
              <TouchableOpacity onPress={this.pickImageButtonPress}>
                <Image source={require('Musl/images/messages/icon-camera.png')}/>
              </TouchableOpacity>

              <TextInput style={styles.input}
                         placeholder='Reply'
                         value={this.state.answer}
                         multiline={true}
                         onChangeText={this.answerChanged}/>

              <TouchableOpacity onPress={this.sendButtonPress}>
                <Image source={require('Musl/images/messages/icon-chat-reply.png')}/>
              </TouchableOpacity>
            </UiBlockHorizontalEdges>
            <UiBlockSpace height={10}/>
          </UiBlockBasic>
        </View>

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

  private multichatCollaborators = () => {
    const {myPartner, collaborators} = this.state
    const collaboratorsToDisplay = (myPartner && this.amIChattingWithLinkedProfile()) ?
      new Array(myPartner) : collaborators

    return collaboratorsToDisplay.map(it => (
      <MultichatItemLeft
        key={it.profile.id}
        nickname={it.profile.nickname}
        avatar={it.profile.avatar}
      />
    ))
  }

  private multichatLinkedProfile = () => {
    const {myPartner, owner} = this.state

    if (!myPartner || this.amIChattingWithLinkedProfile()) {
      return null
    }

    if (owner) {
      return (
        <MultichatItemRightWithActions
          added={myPartner.added}
          nickname={myPartner.profile.nickname}
          avatar={myPartner.profile.avatar}
          onToggleLinkedProfile={this.toggleLinkedProfile(myPartner)}
        />
      )
    }

    return (
      <MultichatItemRight
        nickname={myPartner.profile.nickname}
        avatar={myPartner.profile.avatar}
      />
    )
  }

  private answerChanged = (text: string) => {
    this.updateAnswerField(text)
  }

  private updateAnswerField = (text: string) => {
    this.setState({
      ...this.state,
      answer: text
    })
  }

  private sendButtonPress = async () => {
    this.sendMessage(this.state.answer)
        .catch(() => {
          this.navigateToChatsScreen()
        })
    this.updateAnswerField('')
  }

  private pickImageButtonPress = () => {
    this.muslImagePicker.pickImage(this.sendImage)
  }

  private backButton = () => {
    this.navigateToChatsScreen()
  }

  private navigateToChatsScreen = () => {
    this.props
        .navigation
        .dispatch(NavigationActions.reset(
          {
            index: 1,
            actions: [
              NavigationActions.navigate({
                routeName: routeConfig.profileHub.name,
                params: {}
              }),
              NavigationActions.navigate({
                routeName: routeConfig.messages.name,
                params: {}
              })
            ],
            key: null
          }))
  }

  private communityButton = () => {
    this.props.navigation.navigate(routeConfig.community.name)
  }

  private renderMessage = ({item}) => {
    if (item.my) {
      return <ChatItemMe
        userPicture={item.userPicture}
        message={item.text}
        type={item.type}
      />
    }
    return <ChatItemCompanion
      userPress={() => this.goToProfile(item.author)}
      userPicture={item.userPicture}
      message={item.text}
      type={item.type}
    />
  }

  private sendMessage = async (message: string) => {
    if (!message || !message.trim()) {
      return
    }

    this.addMyMessage(message)

    await this.messageService.newMessage(this.props.navigation.state.params.item.chat, message)
    await this.syncMessages()
  }

  private addMyMessage = (messageText) => {

    const author = this.profileService.getActive()

    const messageDto = {
      key: generateUUID(),
      my: true,
      userPicture: author ? author.avatar : '',
      author,
      text: messageText,
      type: 'TEXT'
    }

    const messages = this.state.messages

    messages.push(messageDto)

    this.setState(prevState => ({
      ...prevState,
      messages
    }))

    this.scrollChatItemsBottom(true)
  }

  private syncMessages = async () => {
    const activeProfileId = this.profileService.getActiveProfileId()

    const chat = this.props.navigation.state.params.item.chat

    const messages = await this.messageService.getAllForChat(chat)

    chatMemberService.fetchForChat(chat, this.props.navigation.state.params.item.owner.profileId)
                     .then(owner => {
                       owner.lastViewedOrderNumber = chat.lastOrderNumber
                       owner.save()
                     })

    // console.log(messages.map(it => it.serialize()))
    const contentPromises = messages.map(it => this.messageService.getContentFor(it))

    const messageContents = await Promise.all(contentPromises)

    const messageDtoList = await Promise.all(messageContents.map(async (it: MessageContentModel) => {
      const author = await this.profileService.getByPrimary(it.message.chatMember.profileId)
      return {
        key: it.id,
        my: it.message.chatMember.profileId === activeProfileId,
        userPicture: author ? author.avatar : '',
        author,
        text: it.text,
        type: it.contentType
      }
    }))

    this.setState(prevState => ({
      ...prevState,
      messages: messageDtoList
    }))

    this.scrollChatItemsBottom()
  }

  private sendImage = async (images: PickerImage[]) => {
    const image = images[0]
    const media = await this.mediaUpload(image.path)
    if (!media) {
      return
    }

    await this.messageService.newMessage(this.props.navigation.state.params.item.chat, media.id.toString(), 'IMAGE')
    await this.syncMessages()
    this.scrollChatItemsBottom(true)
  }

  private mediaUpload = (file) => {
    return this.mediaService.createNew(file)
  }

  private scrollChatItemsBottom = (isAnimated = false) => {
    console.log(isAnimated)
    setTimeout(() => {

      // For message sending, to prevent crash when user leaves screen before message is actually sent
      if (!this.IS_MOUNTED) {
        return
      }

      // this.chatFlatList.scrollToIndex({
      //   animated: isAnimated,
      //   index: this.state.messages.length - 1,
      //   viewPosition: 0
      // })
      this.chatFlatList.scrollToEnd({animated: isAnimated})
    }, 100)
  }

  private subscribeForChanges = async () => {
    this.subscription = await this.rabbitCredentialService.subscribe(
      'MESSAGE',
      async () => {
        await this.syncMessages()
        this.scrollChatItemsBottom(true)
      }
    )
  }

  private unsubscribeForChanges = () => {
    try {
      this.subscription.unsubscribe()
    } catch (e) {
      console.warn(e)
    }
  }

  private syncCollaborators = async () => {

    const activeProfileId = this.profileService.getActiveProfileId()

    const linkedProfile = await this.linkedProfileService.getProfileLink()
    const chatMembers = await this.chatMemberService.getAllActiveForChat(this.props.navigation.state.params.item.chat)

    if (linkedProfile) {
      const oppositeProfileId = this.linkedProfileService.getOppositeProfileId(linkedProfile)

      const oppositeProfile = await this.profileService.getByPrimary(oppositeProfileId)
      if (!oppositeProfile) {
        throw new Error('no opposite profile')

      }

      const chatMemberForLinked = chatMembers.find(it => it.profileId === oppositeProfile.id)

      const collaboratorsWithoutLinked = await Promise.all(
        chatMembers.filter(it => it.profileId !== activeProfileId && it.profileId !== oppositeProfile.id)
                   .map(async it => ({
                     chatMember: it,
                     profile: await this.profileService.getByPrimary(it.profileId)
                   }))
      )

      return this.setState(prevState => ({
        ...prevState,
        collaborators: collaboratorsWithoutLinked,
        owner: this.props.navigation.state.params.item.owner.memberRole !== 'GUEST',
        myPartner: {
          added: chatMemberForLinked ? chatMemberForLinked.memberRole !== 'OUT' : false,
          chatMember: chatMemberForLinked,
          profile: oppositeProfile
        }
      }))
    }

    const collaborators = await Promise.all(
      chatMembers.filter(it => it.profileId !== activeProfileId)
                 .map(async it => ({
                   chatMember: it,
                   profile: await this.profileService.getByPrimary(it.profileId)
                 }))
    )

    return this.setState(prevState => ({
      ...prevState,
      owner: this.props.navigation.state.params.item.owner.memberRole !== 'GUEST',
      collaborators
    }))
  }

  private async goToProfile(profile: ProfileModel) {
    const communityDto = await this.profileService.getCommunityDtoByProfileId(profile.id)
    if (communityDto === null) {
      return this.props.navigation.navigate(routeConfig.profileBlocked.name)
    }
    if (communityDto === -1) {
      return
    }
    return this.props.navigation.navigate(routeConfig.profileView.name, {profile: {item: communityDto}})
  }

  private amIChattingWithLinkedProfile = () => {
    if (!!this.state.myPartner && this.state.collaborators.length === 0) {
      return true
    }
    return false
  }
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  chatComponents: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  chatNavigation: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E7EBEF'
  },
  chatNavigationImage: {
    width: 27,
    height: 27
  },
  chatNavigationText: {
    fontSize: 14,
    color: '#5DA4E5'
  },
  chatInput: {
    borderTopWidth: 1,
    borderTopColor: '#E7EBEF',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#000000',
    fontSize: 16,
    maxHeight: 80
  },
  messagesContainer: {
    flex: 1
  },
  messagesList: {
    paddingLeft: 25,
    paddingRight: 25
  }
})
