import React from 'react'
import FieldLabelBoldValue from './label-bold-value'
import RadioButtonsList from '../../radio-buttons-list'
import ProfileDataModel from '../../../models/field-data/profile-data'

interface Props {
  profileData: ProfileDataModel
}

const FieldRadioButtonCustom = (props: Props) => {
  const fieldTitle = props.profileData.field.name ? props.profileData.field.name : ''
  const items = props.profileData.fieldValues.map(fieldValue => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: false,
    key: fieldValue.value
  }))

  return (
    fieldTitle === 'When' || fieldTitle === 'Where' ?
      <FieldLabelBoldValue profileData={props.profileData}/> :
      <RadioButtonsList
        items={items}
        onItemSelected={(item) => {
          console.log(item.value)
        }}
      />
  )
}

export default FieldRadioButtonCustom
