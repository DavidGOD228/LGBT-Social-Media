import React from 'react'

import MultiSlider from 'react-native-multi-slider'
import WhiteMarker from './white-marker'
import {
  View
} from 'react-native'

interface Props {
  values?: [number],
  min: number,
  max: number,
  onValuesChangeFinish?: (values: [number]) => void,
  onValuesChange?: (values: [number]) => void,
  sliderLength?: number
}

const RangeSlider = (props: Props) => {
  const values = props.values || [props.min, props.max]
  const onValuesChangeFinish = (rangeValues: [number]) => (
    props.onValuesChangeFinish && props.onValuesChangeFinish(rangeValues)
  )

  const onValuesChange = (rangeValues: [number]) => (
    props.onValuesChange && props.onValuesChange(rangeValues)
  )

  const me = this
  const measureSliderLength = (event: any) => {
    me.sliderLength = event.nativeEvent.layout.width
  }

  return (
    <View style={{flex: 1}} onLayout={measureSliderLength}>
      <MultiSlider
        values={values} min={props.min} max={props.max}
        onValuesChangeFinish={onValuesChangeFinish}
        onValuesChange={onValuesChange}
        unselectedStyle={{backgroundColor: '#b9b9b9'}}
        selectedStyle={{backgroundColor: '#4990E2'}}
        containerStyle={{
          height: 28,
          marginTop: 28
        }}
        trackStyle={{height: 3}}
        customMarker={WhiteMarker}
        sliderLength={me.sliderLength}
      />
    </View>
  )
}

export default RangeSlider
