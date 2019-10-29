import React from 'react'

import TextRangeSlider from './text-range-slider'

interface Props {
  min: number,
  max: number,
  value: [number]
  onUpdate: (value) => void
}

const MultiSlider = (props: Props) => {
  return <TextRangeSlider
    values={props.value}
    min={props.min}
    max={props.max}
    onValuesChangeFinish={props.onUpdate}
  />
}

export default MultiSlider
