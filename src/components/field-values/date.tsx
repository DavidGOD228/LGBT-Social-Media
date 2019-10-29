import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
// import RNExitApp from 'react-native-exit-app';
import DatePicker from 'react-native-datepicker'
import FieldModel from '../../models/field'
import UiBlockBasic from '../ui/block/basic'
import UiBlockLeft from '../ui/block/left'
import UiBlockBottom from '../ui/block/bottom'
import TextNormal from '../global/text/basic/text-normal'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import {FieldValueService} from '../../services/field-value'
import {lazy} from '../../annotations/inversify'
import SubSectionModel from '../../models/sub-section'
import SectionModel from '../../models/section'
import moment from 'moment'
import FieldDataModel from '../../models/field-data/field-data'
import TextBold from '../global/text/basic/text-bold'


const YEARS_18 = 568036800000;
interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => any
  section: SectionModel
  subSection: SubSectionModel,
  onCloseModal: (date: any) => any
}

interface State {
  value?: Date,
  error: string,
}

class FieldValueDateClass extends Component <Props, State> {

  @lazy('FieldValueService')
  private fieldValueService: FieldValueService
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      value: this.calcValue(),
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
            androidMode="calendar"
            format="MMM DD YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="Choose date"
            onDateChange={this.onChange}
            onCloseModal={this.onCloseModal}
          />
        </UiBlockLeft>
        <UiBlockSpace height={3}/>
        <LineFullWidth style={styles.line}/>
        {this.state.error ? (
          <UiBlockBasic>
            <UiBlockSpace height={10}/>
            <TextBold style={styles.error}>{this.state.error}</TextBold>
          </UiBlockBasic>
        ) : (
          null
        )}
      </UiBlockBasic>
    )
  }

  private isLessThan18 = (date: any) => {
    return ((new Date()).getTime() - (new Date(date)).getTime()) < YEARS_18
  };


  private onCloseModal = (date: any) => {
    if (this.isLessThan18(date)) {
      this.props.onCloseModal(date)
    }
  }

  private onChange = async (date) => {
    if (this.isLessThan18(date)) {
      this.onCloseModal(date);
      this.onChange(new Date(this.state.value || '01-01-2000'));
      return
    }
    this.setState(prevState => ({
      ...prevState,
      value: date,
      error: ''
    }))
    return this.persist(date)
  }

  private async persist(date) {
    if (this.isLessThan18(date)) {
      return
    }
    const parsedDate = moment(date, 'MMM DD YYYY')
    this.wrapValue(parsedDate.toDate()
                             .valueOf())
        .then(fieldValue => {
          return this.props.onValueUpdated([fieldValue])
        })
        .catch(async error => {
          error = await error ? error.json() : error;
          if (error && error.errors && error.errors['Validation Errors']) {
            this.setState({
              ...this.state,
              error: error.errors['Validation Errors']
            })
          }
        })
  }

  private wrapValue = (value) => {
    return this.createFieldValue(value)
  }

  private calcValue = () => {
    const value = this.props.fieldData.fieldValues
                      .map(it => it.value)
                      .toString()
    if (this.isLessThan18(value)) {
      return new Date('01-01-2000')
    }
    return value && !Number.isNaN(+value) ? new Date(+value) : new Date('01-01-2000')
  }

  private createFieldValue = (value) => {
    return this.fieldValueService
               .createNew(this.props.section, this.props.subSection, this.props.field, value)
  }
}

const FieldValueDate = ({field, fieldData, onValueUpdated, section, subSection, onCloseModal}: Props) => (
  <FieldValueDateClass
    key={field.id}
    onValueUpdated={onValueUpdated}
    fieldData={fieldData}
    field={field}
    subSection={subSection}
    section={section}
    onCloseModal={onCloseModal}
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
  },
  error: {
    color: '#D9242B',
    fontSize: 14
  }
})

export default FieldValueDate
