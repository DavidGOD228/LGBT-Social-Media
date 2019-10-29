import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import TextNormal from '../global/text/basic/text-normal'
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

const maxValueLength = 400

const getSymbolsRemained = (maxLength: number, text = ''): number => {
  return maxLength - text.length
}

class ProfileViewTextInputStateful extends Component<Props, State> {

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
                     maxLength={maxValueLength}
                     style={styles.textInput}
                     onChangeText={this.textChanged}/>
        </View>
        <UiBlockBottom>
          <View style={styles.bottomRight}>
            <TextNormal style={styles.counter}>
              {getSymbolsRemained(maxValueLength, this.state.value)}
            </TextNormal>

            {this.state.changed ? (
              <TouchableOpacity style={styles.btnContainer} onPress={() => this.props.onValueUpdated(this.state.value)}>
                <Image source={require('Musl/images/profile/icon-checkmark-save.png')}/>
              </TouchableOpacity>
            ) : (null)}

            {this.state.saved ? (
              <Image style={{marginLeft: 10}}
                     source={require('Musl/images/profile/icon-check.png')}/>
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
      changed: true,
      saved: false
    }))
  }
}

const ProfileViewTextInputLimited = ({body, placeholder, onValueUpdated}: Props) => (
  <ProfileViewTextInputStateful
    body={body}
    placeholder={placeholder}
    onValueUpdated={onValueUpdated}
  />
)

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
  counter: {
    color: '#AABFE3',
    fontSize: 16
  },
  smallButton: {
    width: 22,
    height: 22
  },
  btnContainer: {
    marginLeft: 10
  },
  bottomRight: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default ProfileViewTextInputLimited
