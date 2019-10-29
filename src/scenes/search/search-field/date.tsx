import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-datepicker'
import FieldModel from '../../../models/field'
import UiBlockBasic from '../../../components/ui/block/basic'
import UiBlockLeft from '../../../components/ui/block/left'
import UiBlockBottom from '../../../components/ui/block/bottom'
import TextNormal from '../../../components/global/text/basic/text-normal'
import UiBlockSpace from '../../../components/ui/block/space'
import LineFullWidth from '../../../components/global/line-full-width'
import SubSectionModel from '../../../models/sub-section'
import SectionModel from '../../../models/section'

interface Props {
  field: FieldModel
  section: SectionModel
  subSection: SubSectionModel
  restrictionMap: any
  restrictionPath: string
}

interface State {
  value?: Date
}

class FieldValueDateClass extends Component <Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      value: this.calcValue()
    }
  }

  getMaxDate() {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 18)
    return date
  }

  render() {
    return (
      <UiBlockBasic>
        <UiBlockSpace height={20}/>
        <UiBlockLeft>
          <UiBlockBasic>
            <UiBlockBottom>
              <TextNormal style={styles.label}>Birthday</TextNormal>
            </UiBlockBottom>
          </UiBlockBasic>
          <DatePicker
            showIcon={false}
            customStyles={{
              dateTouchBody: styles.dateTouchBody,
              dateInput: styles.dateInput
            }}
            style={{flex: 1}}
            date={this.state.value}
            mode="date"
            maxDate={this.getMaxDate()}
            androidMode="calendar"
            format="MMM DD YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="Choose date"
            onDateChange={this.onChange}
          />
        </UiBlockLeft>
        <UiBlockSpace height={3}/>
        <LineFullWidth style={styles.line}/>
      </UiBlockBasic>
    )
  }

  private onChange = async (date) => {
    this.setState(prevState => ({
      ...prevState,
      value: date
    }))
    this.props.restrictionMap[this.props.restrictionPath] = {
      field: this.props.restrictionPath,
      values: [date],
      operator: 'In'
    }
  }

  private calcValue = () => {
    const restriction = this.props.restrictionMap[this.props.restrictionPath]
    return restriction ? new Date(+restriction.values.toString()) : undefined
  }

}

const FieldValueDate = ({
  field, section, subSection, restrictionMap, restrictionPath
}: Props) => (
  <FieldValueDateClass
    field={field}
    subSection={subSection}
    section={section}
    restrictionMap={restrictionMap}
    restrictionPath={restrictionPath}
  />
)

const styles = StyleSheet.create({
  dateTouchBody: {
    height: 30
  },
  dateInput: {
    height: 30,
    borderWidth: 1,
    borderColor: '#B7B7B7'
  },
  label: {
    color: '#8C8C8C',
    paddingRight: 10
  },
  line: {
    backgroundColor: '#A6B4BD'
  }
})

export default FieldValueDate
