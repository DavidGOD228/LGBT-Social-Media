import React from 'react'
import SelectableButtonsList from '../../../components/selectable-buttons-list'
import {comparator} from '../../../utils/number'

interface Props {
  options: any[]
  value: any[]
  onUpdate: (value) => void
}

const FieldValueCheckbox = (props: Props) => {
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
    <SelectableButtonsList
      items={items}
      onItemSelected={(item) => props.onUpdate(newValue(item.value))}
    />
  )
}

export default FieldValueCheckbox
