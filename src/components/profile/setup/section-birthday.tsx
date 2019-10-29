import React from 'react'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-datepicker'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockLeft from '../../ui/block/left'
import UiBlockBottom from '../../ui/block/bottom'
import TextNormal from '../../global/text/basic/text-normal'
import UiBlockSpace from '../../ui/block/space'
import LineFullWidth from '../../global/line-full-width'

interface Props {
  birthay: Date,
  onDateSelected: (date: Date) => void
}

const ProfileSetupSectionBirthday = (props: Props) => {
  const { birthay, onDateSelected } = props
  return (
    <UiBlockBasic>
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
          date={birthay}
          mode="date"
          androidMode="spinner"
          format="MMM DD YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={onDateSelected}
        />
      </UiBlockLeft>
      <UiBlockSpace height={3}/>
      <LineFullWidth style={styles.line}/>
    </UiBlockBasic>
  )
}

const styles = StyleSheet.create({
  dateTouchBody: {
    height: 30
  },
  dateInput: {
    fontFamily: 'Uniform',
    fontSize: 16,
    height: 30,
    lineHeight: 32,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    color: 'rgb(46, 46, 46)'
  },
  label: {
    color: '#8C8C8C',
    paddingRight: 10
  },
  line: {
    backgroundColor: '#A6B4BD'
  }
})

export default ProfileSetupSectionBirthday
