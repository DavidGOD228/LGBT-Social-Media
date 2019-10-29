import React from 'react'
import FieldModel from '../../models/field'
import RadioButtonsList from '../radio-buttons-list'
import FieldDataModel from '../../models/field-data/field-data'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const FieldValueRadioButton = (props: Props) => {
  const {field, fieldData, onValueUpdated} = props

  const items = field.fieldValues.map((fieldValue, i) => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
    key: i
  }))

  const newValue = (value) => {
    return [value]
  }

  return (
    <RadioButtonsList
      items={items}
      onItemSelected={(item) => onValueUpdated(newValue(item.value))}
    />
  )
}

export default FieldValueRadioButton
