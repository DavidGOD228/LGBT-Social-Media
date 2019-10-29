import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import i18n from '../../locales/i18n'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockBasic from '../ui/block/basic'
import FieldModel from '../../models/field'
import {FieldValueService} from '../../services/field-value'
import {lazy} from '../../annotations/inversify'
import SectionModel from '../../models/section'
import SubSectionModel from '../../models/sub-section'
import FieldDataModel from '../../models/field-data/field-data'
import {EVENTS} from '../../configs/dicts'
import eventEmitter from '../../utils/event-emitter'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
  section: SectionModel
  subSection: SubSectionModel
  profileType?: string
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

class FieldValueTextInputStateful extends Component<Props, State> {

  @lazy('FieldValueService')
  private fieldValueService: FieldValueService

  constructor(props) {
    super(props)
    this.state = {
      value: this.calcValue(),
      changed: false,
      saved: false
    }

    eventEmitter.on(EVENTS.editProfileScreenClosed, this.editProfileScreenCloseListener)
  }

  componentWillUnmount() {
    eventEmitter.removeListener(EVENTS.editProfileScreenClosed, this.editProfileScreenCloseListener)
  }

  editProfileScreenCloseListener = () => {
    this.saveValue(this.state.value)
  }

  private get placeholder() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.${this.props.subSection.name}` +
      `.fields.${this.props.field.name}.placeholder${this.props.profileType}`,
      {
        defaults: [{
          scope: `profile.details.sections.${this.props.section.name}.subSections.${this.props.subSection.name}` +
          `.fields.${this.props.field.name}.placeholder`
        }]
      })
  }

  textChanged = (text) => {
    this.changeValue(text)
  }

  savePressed = () => {
    this.saveValue(this.state.value)
  }

  render() {
    return (
      <UiBlockBasic>
        <UiBlockBasic>
          {this.state.value ? (
            null
          ) : (
            <TextNormal style={styles.placeholder}>
              {this.placeholder}
            </TextNormal>
          )}

          <TextInput multiline={true}
                     numberOfLines={5}
                     editable={true}
                     value={this.state.value}
                     maxLength={maxValueLength}
                     style={styles.textInput}
                     onChangeText={this.textChanged}
                     onEndEditing={() => this.savePressed()}/>
        </UiBlockBasic>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TextNormal style={styles.counter}>
            {getSymbolsRemained(maxValueLength, this.state.value)}
          </TextNormal>

          {this.state.changed ? (
            <TouchableOpacity onPress={this.savePressed}>
              <Image style={styles.smallButton} source={require('Musl/images/profile/icon-checkmark-save.png')}/>
            </TouchableOpacity>
          ) : (null)}

          {this.state.saved ? (
            <Image style={styles.smallButton} source={require('Musl/images/profile/icon-check.png')}/>
          ) : (null)}

        </View>
      </UiBlockBasic>
    )
  }

  private calcValue = () => {
    return this.props.fieldData.fieldValues
               .map(it => it.value)
               .toString()
  }

  private changeValue = async (text) => {
    this.setState(prevState => ({
      ...prevState,
      value: text,
      changed: true,
      saved: false
    }))
  }

  private saveValue = async (text) => {
    return this.persist(text)
  }

  private persist(text) {
    this.wrapText(text)
        .then(fieldValue => this.props.onValueUpdated([fieldValue]))
        .then(() => {
          this.setState({
            ...this.state,
            changed: false,
            saved: true
          })
        })
  }

  private wrapText = (text) => {
    return this.createFieldValue(text)
  }

  private createFieldValue = (value) => {
    return this.fieldValueService
               .createNew(this.props.section, this.props.subSection, this.props.field, value)
  }
}

const FieldValueTextInputLimited = ({fieldData, field, onValueUpdated, subSection, section, profileType}: Props) => (
  <FieldValueTextInputStateful
    fieldData={fieldData}
    field={field}
    onValueUpdated={onValueUpdated}
    subSection={subSection}
    section={section}
    profileType={profileType}
    key={field.id}
  />
)

const styles = StyleSheet.create({
  textInput: {
    color: 'rgb(46, 46, 46)',
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'Uniform',
    height: 60
  },
  placeholder: {
    color: '#8D8D8D',
    lineHeight: 20,
    position: 'absolute',
    left: 0,
    top: 5
  },
  counter: {
    color: '#AABFE3',
    fontSize: 16,
  },
  smallButton: {
    width: 22,
    height: 22,
    marginLeft: 10
  },
})

export default FieldValueTextInputLimited
