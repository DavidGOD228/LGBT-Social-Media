import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockBottom from '../../ui/block/bottom'
import TextNormal from '../../global/text/basic/text-normal'
import {debounce} from '../../../annotations/eval'
import UnitConverter from '../../../utils/unit-converter'
import FieldDataModel from '../../../models/field-data/field-data'

interface Props {
  fieldData: FieldDataModel
  metrics: string
  persist: (value: string) => void
}

interface State {
  value: string
}

class WeightInputImperialStateful extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      value: this.calcValue(),
    }
  }

  private weightChanged = async (text) => {
    this.setState({
      ...this.state,
      value: text
    })

    return this.persistWeight()
  }

  private submitWeightPressed = () => {
    return this.props.persist(UnitConverter.weightImperialToMetric(this.state.value))
  }

  render() {
    return (
      <View style={styles.rightContent}>
        <View style={styles.textContainer}>
          <TextInput multiline={false}
                     editable={true}
                     keyboardType={'numeric'}
                     returnKeyType={'done'}
                     onEndEditing={this.submitWeightPressed}
                     value={this.state.value}
                     style={styles.textInput}
                     onChangeText={this.weightChanged}/>
        </View>
        <UiBlockBasic>
          <UiBlockBottom>
            <TextNormal style={styles.metrics}>lbs</TextNormal>
          </UiBlockBottom>
        </UiBlockBasic>
      </View>
    )
  }

  @debounce(5000)
  private persistWeight() {
    if (!this.state.value) {
      return
    }
    return this.props.persist(UnitConverter.weightImperialToMetric(this.state.value))
  }

  private calcValue = () => {
    return this.props.fieldData.fieldValues
               .map(it => UnitConverter.weightMetricToImperial(it.value))
               .toString()
  }
}

const WeightInputImperial = ({fieldData, persist, metrics}: Props) => (
  <WeightInputImperialStateful fieldData={fieldData} metrics={metrics} persist={persist}/>
)

const textBottomMargin = Platform.OS === 'android' ? -16 : 0

const styles = StyleSheet.create({
  rightContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textContainer: {
    flex: 1,
    marginBottom: textBottomMargin,
    paddingRight: 10
  },
  textInput: {
    textAlign: 'right',
    color: 'rgb(46, 46, 46)'
  },
  metrics: {
    color: '#8C8C8C'
  }
})

export default WeightInputImperial