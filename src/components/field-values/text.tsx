import React, {Component} from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'
import i18n from '../../locales/i18n'
import UiBlockBasic from '../ui/block/basic'
import FieldModel from '../../models/field'
import UiBlockRight from '../ui/block/right'
import {FieldValueService} from '../../services/field-value'
import {lazy} from '../../annotations/inversify'
import SectionModel from '../../models/section'
import SubSectionModel from '../../models/sub-section'
import {debounce} from '../../annotations/eval'
import FieldDataModel from '../../models/field-data/field-data'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
  section: SectionModel
  subSection: SubSectionModel
}

interface State {
  value: string
}

class FieldValueTextInputStateful extends Component<Props, State> {

  @lazy('FieldValueService')
  private fieldValueService: FieldValueService

  constructor(props) {
    super(props)
    this.state = {
      value: this.calcValue()
    }
  }

  private get placeholder() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
      `${this.props.subSection.name}.fields.${this.props.field.name}.placeholder`)
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

  private calcValue = () => {
    return this.props.fieldData.fieldValues
               .map(it => it.value)
               .toString()
  }

  private onChange = async (text) => {
    this.setState(prevState => ({
      ...prevState,
      value: text
    }))
    return this.persist(text)
  }

  @debounce(5000)
  private persist(text) {
    this.wrapText(text)
        .then(fieldValue => this.props.onValueUpdated([fieldValue]))
  }

  private wrapText = (text) => {
    return this.createFieldValue(text)
  }

  private createFieldValue = (value) => {
    return this.fieldValueService
               .createNew(this.props.section, this.props.subSection, this.props.field, value)
  }
}

const FieldValueTextInput = ({fieldData, field, onValueUpdated, subSection, section}: Props) => (
  <FieldValueTextInputStateful
    fieldData={fieldData}
    field={field}
    onValueUpdated={onValueUpdated}
    subSection={subSection}
    section={section}
    key={field.id}
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
