import React from 'react'
import FieldModel from '../../models/field'
import SelectableButtonsList from '../selectable-buttons-list'
import FieldDataModel from '../../models/field-data/field-data'
import {comparator} from '../../utils/number'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const FieldValueCheckbox = (props: Props) => {
  const {field, onValueUpdated, fieldData} = props

  const items = field.fieldValues.sort(comparator)
                     .map((fieldValue, i) => ({
                       value: fieldValue,
                       title: fieldValue.value,
                       isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
                       key: i
                     }))

  const newValue = (value) => {
    if (fieldData.fieldValues.indexOf(value) !== -1) {
      return fieldData.fieldValues.filter(it => it !== value)
    } else {
      return [...fieldData.fieldValues, value]
    }
  }

  return (
    <SelectableButtonsList
      items={items}
      onItemSelected={(item) => onValueUpdated(newValue(item.value))}
    />
  )
}

export default FieldValueCheckbox
