import React, {Component} from 'react'
import FieldDataModel from '../../../models/field-data/field-data'
import {LocalSettingsService} from '../../../services/local-settings'
import {lazy} from '../../../annotations/inversify'
import WeightInputMetric from './weight-input-metric'
import WeightInputImperial from './weight-input-imperial'

interface Props {
  fieldData: FieldDataModel
  metrics: string
  metricsType: string
  persist: (value: string) => void
}

interface State {
  metrics: string
}

class WeightInputStateful extends Component<Props, State> {

  @lazy('LocalSettingsService')
  private localSettingsService: LocalSettingsService

  constructor(props) {
    super(props)

    this.state = {
      ...this.state
    }

    this.localSettingsService.getUserMetrics()
        .then(val => this.setState({
          ...this.state,
          metrics: props.metricsType || val
        }))
  }

  render() {
    const {fieldData, persist, metricsType} = this.props
    if (metricsType === 'Metric') {
      return (<WeightInputMetric fieldData={fieldData} metrics={metricsType} persist={persist}/>)
    }
    return (<WeightInputImperial fieldData={fieldData} metrics={metricsType} persist={persist}/>)
  }
}

const WeightInput = ({fieldData, persist, metrics, metricsType}: Props) => (
  <WeightInputStateful fieldData={fieldData} metrics={metrics} persist={persist} metricsType={metricsType}/>
)

export default WeightInput