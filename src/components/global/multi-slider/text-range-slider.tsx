import React, {Component} from 'react'
import UiBlockHorizontalEdges from '../../ui/block/horizontal-edges'
import TextNormal from '../text/basic/text-normal'
import RangeSlider from './range-slider'
import {View} from 'react-native'

interface Props {
  values?: [number],
  min: number,
  max: number,
  onValuesChangeFinish?: (values: [number]) => void,
  onValuesChange?: (values: [number]) => void
}

interface State {
  values,
  min: number,
  max: number
}

export default class TextRangeSlider extends Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      values: props.values || [props.min, props.max],
      min: props.min,
      max: props.max
    }
  }

  render() {
    return <View style={{width: '100%'}}>
      <UiBlockHorizontalEdges>
        <TextNormal style={{color: '#a9a9a9'}}>{this.props.min}</TextNormal>
        <TextNormal style={{fontSize: 24}}>
          {`${this.state.values[0]} - ${this.state.values[1]}`}{this.state.values[1] === this.props.max ? '+' : ''}
        </TextNormal>
        <TextNormal style={{color: '#a9a9a9'}}>{this.props.max}+</TextNormal>
      </UiBlockHorizontalEdges>
      <RangeSlider
        min={this.props.min}
        max={this.props.max}
        values={this.props.values}
        onValuesChange={(values) => this.setState({
          ...this.state,
          values
        })}
        onValuesChangeFinish={this.props.onValuesChangeFinish}
      />
    </View>
  }

}
