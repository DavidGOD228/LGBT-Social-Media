import React from 'react'
import HankiesGrid from '../hankies'

interface Props {
  options: any[]
  value: any[]
  onUpdate: (value) => void
}

const CheckboxHankies = (props: Props) => (
  <HankiesGrid
    options={props.options}
    value={props.value}
    onUpdate={props.onUpdate}
  />
)

export default CheckboxHankies
