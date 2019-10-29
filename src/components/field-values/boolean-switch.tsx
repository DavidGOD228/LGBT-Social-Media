import React, {Component} from 'react'
import {Switch} from 'react-native'
import SubSectionModel from '../../models/sub-section'
import FieldModel from '../../models/field'
import SectionModel from '../../models/section'
import {FieldValueService} from '../../services/field-value'
import {lazy} from '../../annotations/inversify'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
import UiBlockRight from '../ui/block/right'
import UiBlockSpace from '../ui/block/space'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal'
import UiBlockVerticalCenter from '../ui/block/vertical-center'
import i18n from '../../locales/i18n'
import FieldDataModel from '../../models/field-data/field-data'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
  section: SectionModel
  subSection: SubSectionModel
}

interface State {
  value: boolean
}

class FieldValueBooleanSwitchClass extends Component<Props, State> {

  @lazy('FieldValueService')
  private fieldValueService: FieldValueService

  constructor(props) {
    super(props)
    this.state = {
      value: this.calcValue()
    }
  }

  render() {
    const {section, subSection, field} = this.props

    const fieldName =
      i18n.t(`profile.details.sections.${section.name}.subSections.${subSection.name}.fields.${field.name}.name`)

    return (
      <UiBlockBasic>
        <LineFullWidth style={{backgroundColor: '#E3E9EF'}}/>
        <UiBlockSpace height={3}/>
        <UiBlockRight>
          <UiBlockBasic>
            <UiBlockVerticalCenter>
              <TextNormal style={{fontSize: 13}}>{fieldName}</TextNormal>
            </UiBlockVerticalCenter>
          </UiBlockBasic>
          <UiBlockSpaceHorizontal width={10}/>
          <Switch value={this.state.value} onValueChange={this.onChange}/>
        </UiBlockRight>
      </UiBlockBasic>
    )
  }

  private calcValue = () => {
    return this.props.fieldData.fieldValues
        .map(it => it.value)
        .toString() === 'true'
  }

  private onChange = async (value) => {
    this.setState(prevState => ({
      ...prevState,
      value
    }))
    return this.persist(value)
  }

  private persist(text) {
    this.wrapValue(text)
      .then(fieldValue => this.props.onValueUpdated([fieldValue]))
  }

  private wrapValue = (text) => {
    return this.createFieldValue(text ? 'true' : 'false')
  }

  private createFieldValue = (value) => {
    return this.fieldValueService
      .createNew(this.props.section, this.props.subSection, this.props.field, value)
  }
}

const FieldValueBooleanSwitch = ({section, subSection, field, fieldData, onValueUpdated}: Props) => (
  <FieldValueBooleanSwitchClass
    field={field}
    fieldData={fieldData}
    onValueUpdated={onValueUpdated}
    section={section}
    subSection={subSection}
  />
)

export default FieldValueBooleanSwitch
