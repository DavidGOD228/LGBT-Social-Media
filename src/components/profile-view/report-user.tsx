import React, {Component} from 'react'
import UiBlockBasic from '../ui/block/basic'
import PopupHeader from '../global/popup/header'
import i18n from '../../locales/i18n'
import UiBlockSpace from '../ui/block/space'
import TextNormal from '../global/text/basic/text-normal'
import SelectableButtonsList from '../selectable-buttons-list'
import LineFullWidth from '../global/line-full-width'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import PopupTwoButtonsContainer from '../global/popup/two-buttons-container'
import PopupButton from '../global/popup/button'
import {SelectableItem} from '../button-selectable'

interface Props {
  onCancelReportPressed: () => void
  onSubmitReportPressed: (message: string, categories: SelectableItem[]) => void
  onCloseReportPopupPressed: () => void
}

interface State {
  submitted: boolean
  message: string
  categories: SelectableItem[]
}

export default class ReportUserComponent extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      submitted: false,
      message: '',
      categories: [
        {
          value: 'inappropriateBehavior',
          title: 'Inappropriate Behaviour',
          isSelected: false,
          key: 'behaviour'
        },
        {
          value: 'wrongUniverse',
          title: 'Wrong Universe',
          isSelected: false,
          key: 'universe'
        },
        {
          value: 'harassingMe',
          title: 'Harassing Me',
          isSelected: false,
          key: 'harassing'
        }
      ]
    }
  }

  messageChanged = (text: string) => {
    this.setState({
      ...this.state,
      message: text
    })
  }

  сategorySelected = (item: SelectableItem) => {
    item.isSelected = !item.isSelected
    this.setState({...this.state})
  }

  submitButtonPressed = () => {
    this.setState({
      ...this.state,
      submitted: true
    })
    this.props.onSubmitReportPressed(this.state.message, this.state.categories)
  }

  render() {
    return (
      <UiBlockBasic>
        <PopupHeader>{i18n.t('profile.report.popup.title')}</PopupHeader>
        <UiBlockSpace height={15}></UiBlockSpace>

        {this.state.submitted ? (
          <UiBlockBasic style={{
            paddingLeft: 30,
            paddingRight: 30
          }}>
            <TextNormal style={{fontSize: 16, lineHeight: 18}}>
              {i18n.t('profile.report.popup.response')}
            </TextNormal>
            <UiBlockSpace height={40} />
          </UiBlockBasic>
        ) : (
          <UiBlockBasic>
            <UiBlockBasic style={{
              paddingLeft: 30,
              paddingRight: 30
            }}>
              <SelectableButtonsList
                items={this.state.categories}
                onItemSelected={this.сategorySelected}/>
            </UiBlockBasic>

            <UiBlockSpace height={20}/>
            <UiBlockBasic style={{
              paddingLeft: 30,
              paddingRight: 30
            }}>
              <TextNormal style={{fontSize: 18}}>Other:</TextNormal>
              <UiBlockSpace height={7}/>
              <LineFullWidth/>
              <UiBlockSpace height={5}/>
              <TextInput multiline={true}
                         numberOfLines={5}
                         editable={true}
                         placeholder={'Tell MUSL what`s going on'}
                         placeholderTextColor='#8D8D8D'
                         style={styles.reportInput}
                         value={this.state.message}
                         onChangeText={this.messageChanged}
              />
            </UiBlockBasic>
          </UiBlockBasic>
        )}

        <UiBlockBasic style={{
          paddingLeft: 30,
          paddingRight: 30
        }}>
          <LineFullWidth/>
          <UiBlockSpace height={15}></UiBlockSpace>
        </UiBlockBasic>

        {this.state.submitted ? (
          <PopupTwoButtonsContainer>
            <View/>
            <PopupButton onPress={this.props.onCloseReportPopupPressed}>
              {i18n.t('common.buttons.close')}
            </PopupButton>
          </PopupTwoButtonsContainer>
        ) : (
          <PopupTwoButtonsContainer>
            <PopupButton onPress={this.props.onCancelReportPressed}>
              {i18n.t('common.buttons.cancel')}
            </PopupButton>
            <PopupButton onPress={this.submitButtonPressed}>
              {i18n.t('common.buttons.submit')}
            </PopupButton>
          </PopupTwoButtonsContainer>
        )}
        <UiBlockSpace height={15}></UiBlockSpace>

      </UiBlockBasic>
    )
  }
}

const styles = StyleSheet.create({
  reportInput: {
    color: 'rgb(46, 46, 46)',
    textAlignVertical: 'top',
    fontSize: 17,
    height: 80
  }
})