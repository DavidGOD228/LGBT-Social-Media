import React from 'react'
import RadioButtonsList from '../../../components/radio-buttons-list'
import {comparator} from '../../../utils/number'

interface Props {
  options: any[]
  value: any
  onUpdate: (value) => void
}

const FieldValueRadioButton = (props: Props) => {
  const {options, value} = props

  const items = options.sort(comparator)
                       .map((fieldValue, i) => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: value && value.indexOf(fieldValue) !== -1,
    key: i
  }))

  const newValue = (selected) => {
    if (value.indexOf(selected) !== -1) {
      return value.filter(it => it !== selected)
    } else {
      return [...value, selected]
    }
  }

  return (
    <RadioButtonsList
      items={items}
      onItemSelected={(item) => props.onUpdate(newValue(item.value))}
    />
  )
}

export default FieldValueRadioButton
