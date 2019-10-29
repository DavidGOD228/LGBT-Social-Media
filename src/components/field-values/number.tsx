import React, {Component} from 'react'
import {
  Platform,
  StyleSheet
} from 'react-native'
import UiBlockBasic from '../ui/block/basic'
import FieldModel from '../../models/field'
import {FieldValueService} from '../../services/field-value'
import {lazy} from '../../annotations/inversify'
import SectionModel from '../../models/section'
import SubSectionModel from '../../models/sub-section'
import UiBlockLeft from '../ui/block/left'
import TextNormal from '../global/text/basic/text-normal'
import LineFullWidth from '../global/line-full-width'
import UiBlockSpace from '../ui/block/space'
import UiBlockBottom from '../ui/block/bottom'
import i18n from '../../locales/i18n'
import FieldDataModel from '../../models/field-data/field-data'
import TextBold from '../global/text/basic/text-bold'
import DefaultInput from './number/default-input'
import HeightInput from './number/height-input'
import WeightInput from './number/weight-input'
import {LocalSettingsService} from '../../services/local-settings'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
  section: SectionModel
  subSection: SubSectionModel,
  metricsType: string
}

interface State {
  error: string
  userMetrics: string
}

const numberInputView = {
  'Height': HeightInput,
  'Weight': WeightInput,
  'default': DefaultInput
}

class FieldValueNumberStateful extends Component<Props, State> {

  @lazy('FieldValueService')
  private fieldValueService: FieldValueService

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      userMetrics: ''
    }

    this.localSettingsService.getUserMetrics()
      .then(val => this.setState({
        ...this.state,
        userMetrics: val
      }))
  }

  render() {
    return (
      <UiBlockBasic>
        <UiBlockSpace height={20}/>
        <UiBlockLeft>
          <UiBlockBasic>
            <UiBlockBottom>
              <TextNormal style={styles.label}>{this.label}</TextNormal>
            </UiBlockBottom>
          </UiBlockBasic>
          {this.inputView(this.props.field.name)}
        </UiBlockLeft>
        <LineFullWidth style={styles.line}/>
        {this.state.error ? (
          <UiBlockBasic>
            <UiBlockSpace height={5}/>
            <TextBold style={styles.error}>{this.state.error}</TextBold>
          </UiBlockBasic>
        ) : (
          null
        )}
      </UiBlockBasic>
    )
  }

  private inputView = (fieldName: string) => {
    const key = fieldName in numberInputView ? fieldName : 'default'
    const view = numberInputView[key]
    return new view({
      fieldData: this.props.fieldData,
      metrics: this.metrics,
      persist: this.persist,
      metricsType: this.props.metricsType
    })
  }

  private get label() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
      `${this.props.subSection.name}.fields.${this.props.field.name}.name`)
  }

  private get metrics() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
      `${this.props.subSection.name}.fields.${this.props.field.name}.metrics`)
  }

  private persist = (text) => {
    this.setState({
      ...this.state,
      error: ''
    })
    this.wrapText(text)
        .then(fieldValue => this.props.onValueUpdated([fieldValue]))
        .catch(this.displayError)
  }

  private displayError = async (error) => {
    error = await error.json()
    if (error && error.errors && error.errors['Validation Errors']) {
      let errorMessage = error.errors['Validation Errors']
      if (this.props.field.name === 'Height') {
        errorMessage = i18n.t(`profile.details.sections.AboutMe.subSections.` +
          `Details.fields.Height.error.${this.state.userMetrics}`)
      }
      if (this.props.field.name === 'Weight') {
        errorMessage = i18n.t(`profile.details.sections.AboutMe.subSections.` +
          `Details.fields.Weight.error.${this.state.userMetrics}`)
      }

      this.setState({
        ...this.state,
        error: errorMessage
      })
    }
  }

  private wrapText = (text) => {
    return this.createFieldValue(text)
  }

  private createFieldValue = (value) => {
    return this.fieldValueService.createNew(this.props.section, this.props.subSection, this.props.field, value)
  }
}

const FieldValueNumber = ({fieldData, field, onValueUpdated, subSection, section, metricsType}: Props) => (
  <FieldValueNumberStateful
    key={field.id}
    fieldData={fieldData}
    field={field}
    onValueUpdated={onValueUpdated}
    subSection={subSection}
    section={section}
    metricsType={metricsType}
  />
)

const textBottomMargin = Platform.OS === 'android' ? -16 : 0

const styles = StyleSheet.create({
  rightContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textContainer: {
    flex: 1,
    marginBottom: textBottomMargin,
    paddingRight: 10
  },
  textInput: {
    textAlign: 'right',
    color: 'rgb(46, 46, 46)'
  },
  label: {
    color: '#8C8C8C',
    paddingRight: 10
  },
  metrics: {
    color: '#8C8C8C'
  },
  line: {
    backgroundColor: '#A6B4BD'
  },
  error: {
    color: '#D9242B',
    fontSize: 14
  }
})

export default FieldValueNumber
