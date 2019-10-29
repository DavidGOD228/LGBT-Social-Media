import React, {Component} from 'react'
import FieldDataModel from '../../../models/field-data/field-data'
import HeightInputImperial from './height-input-imperial'
import {LocalSettingsService} from '../../../services/local-settings'
import {lazy} from '../../../annotations/inversify'
import HeightInputMetric from './height-input-metric'

interface Props {
  fieldData: FieldDataModel
  metrics: string
  metricsType: string
  persist: (value: string) => void,
}

interface State {
  metrics: string
}

class HeightInputStateful extends Component<Props, State> {

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
      return (<HeightInputMetric fieldData={fieldData} metrics={metricsType} persist={persist}/>)
    }
    return (<HeightInputImperial fieldData={fieldData} metrics={metricsType} persist={persist}/>)
  }
}

const HeightInput = ({fieldData, persist, metrics, metricsType}: Props) => (
  <HeightInputStateful fieldData={fieldData} metrics={metrics} persist={persist} metricsType={metricsType}/>
)

export default HeightInput