import React, {Component} from 'react'
import UiBlockBasic from '../../components/ui/block/basic'
import SettingsRadioButton from '../../components/settings/radio-button'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import TextBold from '../../components/global/text/basic/text-bold'
import {lazy} from '../../annotations/inversify'
import {ProfileService} from '../../services/profile'
import UiBlockSpace from '../../components/ui/block/space'
import ModalWindowText from '../../components/modal/modal-window-text'
import ModalWindowTitle from '../../components/modal/modal-window-title'
import ModalWindowContent from '../../components/modal/modal-window-content'
import ModalWindow from '../../components/modal/modal-window'
import ModalCloseBtn from '../../components/modal/modal-close-btn'

interface Props {

}

interface State {
  stealthMode: boolean,
  showInfoModal: boolean
}

export default class StealthModeSwitch extends Component<Props, State> {

  @lazy('ProfileService')
  private profileService: ProfileService

  constructor(props) {
    super(props)
    this.state = {
      // NOW IT ISNT NECESSARY TO CHECK ALL PROFILES FOR INVISIBILITY
      // AS IN CURRENT VERSION ALL PROFILES HAVE SAME STEALTH STATUS
      stealthMode: this.profileService.getActive()!.invisible,
      showInfoModal: false
    }
  }

  render() {
    return <UiBlockBasic style={{
      paddingLeft: 5,
      paddingRight: 5
    }}>
      <SettingsRadioButton value={this.state.stealthMode} onChange={this.toggleStealthMode}>
        <View>
          <TextBold>
            Stealth Mode
          </TextBold>
          <TouchableOpacity style={styles.infoIcon} onPress={this.toggleInfoModal}>
            <Image source={require('Musl/images/global/icon-btn-info.png')}/>
          </TouchableOpacity>
        </View>
      </SettingsRadioButton>

      <ModalWindow visible={this.state.showInfoModal}>
        <UiBlockSpace height={30}/>
        <ModalCloseBtn onPress={this.toggleInfoModal}/>
        <UiBlockSpace height={80}/>
        <ModalWindowContent>
          <ModalWindowTitle>
            STEALTH MODE
          </ModalWindowTitle>
          <UiBlockSpace/>
          <ModalWindowText>
            {'In stealth mode, you will appear to be "offline but may see nearby users yourself".'}
          </ModalWindowText>
          <UiBlockSpace height={30}/>
        </ModalWindowContent>
      </ModalWindow>

    </UiBlockBasic>
  }

  private toggleStealthMode = async (value: any) => {
    this.profileService.updateStealthModeStatus(value)
    this.setState({
      ...this.state,
      stealthMode: value
    })
  }

  private toggleInfoModal = () => {
    this.setState({
      ...this.state,
      showInfoModal: !this.state.showInfoModal
    })
  }

}

const styles = StyleSheet.create({
  infoIcon: {
    position: 'absolute',
    top: -7,
    right: -30
  }
})
