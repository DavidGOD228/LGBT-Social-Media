import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import i18n from '../../../locales/i18n'
import TextNormal from '../../../components/global/text/basic/text-normal'
import UiBlockBasic from '../../../components/ui/block/basic'
import FieldModel from '../../../models/field'
import UiBlockRight from '../../../components/ui/block/right'
import {FieldValueService} from '../../../services/field-value'
import {lazy} from '../../../annotations/inversify'
import SectionModel from '../../../models/section'
import SubSectionModel from '../../../models/sub-section'
import FieldDataModel from '../../../models/field-data/field-data'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
  section: SectionModel
  subSection: SubSectionModel
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
  }

  private get placeholder() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
      `${this.props.subSection.name}.fields.${this.props.field.name}.placeholder`)
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
        <TextInput multiline={true}
                   numberOfLines={5}
                   editable={true}
                   placeholder={this.placeholder}
                   placeholderTextColor='#8D8D8D'
                   value={this.state.value}
                   maxLength={maxValueLength}
                   style={styles.textInput}
                   onChangeText={this.textChanged}/>
        <UiBlockRight>
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

        </UiBlockRight>
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

const FieldValueTextInputLimited = ({fieldData, field, onValueUpdated, subSection, section}: Props) => (
  <FieldValueTextInputStateful
    fieldData={fieldData}
    field={field}
    onValueUpdated={onValueUpdated}
    subSection={subSection}
    section={section}
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
    height: 22,
    lineHeight: 26,
  },
  smallButton: {
    width: 22,
    height: 22,
    marginLeft: 10
  }
})

export default FieldValueTextInputLimited
