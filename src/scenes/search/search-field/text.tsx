import React, {Component} from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'
import UiBlockBasic from '../../../components/ui/block/basic'
import UiBlockRight from '../../../components/ui/block/right'

interface Props {
  value: string
  onUpdate: (value) => void
  placeHolder: string
}

interface State {
  value: string
}

class FieldValueTextInputStateful extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  private get placeholder() {
    return this.props.placeHolder
  }

  render() {
    return (
      <UiBlockBasic>
        <TextInput multiline={true}
                   numberOfLines={5}
                   editable={true}
                   placeholder={this.placeholder}
                   placeholderTextColor='#8D8D8D'
                   value={this.state.value}
                   style={styles.textInput}
                   onChangeText={this.onChange}/>
        <UiBlockRight>
        </UiBlockRight>
      </UiBlockBasic>
    )
  }

  private onChange = (text) => {
    this.setState(prevState => ({
      ...prevState,
      value: text
    }))
    this.props.onUpdate(text)
  }

}

const FieldValueTextInput = ({
  value, onUpdate, placeHolder
}: Props) => (
  <FieldValueTextInputStateful
    value={value}
    onUpdate={onUpdate}
    placeHolder={placeHolder}
  />
)

const styles = StyleSheet.create({
  textInput: {
    color: 'rgb(46, 46, 46)',
    textAlignVertical: 'top'
  },
  counter: {
    color: '#AABFE3',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  smallButton: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  }
})

export default FieldValueTextInput
