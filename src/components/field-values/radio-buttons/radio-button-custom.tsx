import React from 'react'
import FieldModel from '../../../models/field'
import RadioButtonsList from '../../radio-buttons-list'
import RadioButtonsBordered from '../../radio-buttons-bordered'
import FieldDataModel from '../../../models/field-data/field-data'
import {comparator} from '../../../utils/number'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const FieldValueRadioButtonCustom = (props: Props) => {
  const {field, fieldData, onValueUpdated} = props

  const items = field.fieldValues.sort(comparator)
                     .map((fieldValue, i) => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
    key: i
  }))

  const newValue = (value) => {
    return [value]
  }

  return (
    field.name === 'Role' ?
      <RadioButtonsList
        items={items}
        onItemSelected={(item) => onValueUpdated(newValue(item.value))}
      /> :
      // When / Where
      <RadioButtonsBordered
        items={items}
        onItemSelected={(item) => onValueUpdated(newValue(item.value))}
      />
  )
}

export default FieldValueRadioButtonCustom
