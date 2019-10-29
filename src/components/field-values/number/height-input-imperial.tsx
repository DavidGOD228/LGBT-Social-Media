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
import UnitConverter, {UnitHeightImperial} from '../../../utils/unit-converter'
import FieldDataModel from '../../../models/field-data/field-data'
import {debounce} from '../../../annotations/eval'

interface Props {
  fieldData: FieldDataModel
  metrics: string
  persist: (value: string) => void
}

interface State {
  ft: number
  inches: number
}

class HeightInputImperialStateful extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      ...this.calcValueHeight()
    }
  }

  submitHeightPressed = () => {
    return this.props.persist(UnitConverter.heightImperialToMetric({
      ft: this.state.ft,
      inches: this.state.inches
    } as UnitHeightImperial))
  }

  heightChanged = (prop) => async (text) => {
    text = (prop === 'inches' && text > 11) ? 11 : text
    this.setState(prevState => ({
      ...prevState,
      [prop]: text
    }))

    this.persistHeight()
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <View style={styles.rightContent}>
          <View style={styles.textContainer}>
            <TextInput multiline={false}
                       editable={true}
                       keyboardType={'numeric'}
                       returnKeyType={'done'}
                       onEndEditing={this.submitHeightPressed}
                       value={this.state.ft > 0 ? this.state.ft.toString() : ''}
                       style={styles.textInput}
                       onChangeText={this.heightChanged('ft')}/>
          </View>
          <UiBlockBasic>
            <UiBlockBottom>
              <TextNormal style={styles.metrics}>feet</TextNormal>
            </UiBlockBottom>
          </UiBlockBasic>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.textContainer}>
            <TextInput multiline={false}
                       editable={true}
                       keyboardType={'numeric'}
                       returnKeyType={'done'}
                       onEndEditing={this.submitHeightPressed}
                       value={this.state.inches > 0 ? this.state.inches.toString() : ''}
                       style={styles.textInput}
                       onChangeText={this.heightChanged('inches')}/>
          </View>
          <UiBlockBasic>
            <UiBlockBottom>
              <TextNormal style={styles.metrics}>inches</TextNormal>
            </UiBlockBottom>
          </UiBlockBasic>
        </View>
      </View>
    )
  }

  private calcValueHeight = (): { ft: number, inches: number } => {
    const value = this.props.fieldData.fieldValues
                      .map(it => UnitConverter.heightMetricToImperial(it.value))
                      .pop()

    return value ? value : {
      ft: 0,
      inches: 0
    }
  }

  @debounce(5000)
  private persistHeight() {
    if (!this.state.ft && !this.state.inches) {
      return
    }

    return this.props.persist(UnitConverter.heightImperialToMetric({
      ft: this.state.ft,
      inches: this.state.inches
    } as UnitHeightImperial))
  }
}

const HeightInputImperial = ({fieldData, persist, metrics}: Props) => (
  <HeightInputImperialStateful fieldData={fieldData} metrics={metrics} persist={persist} />
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
  label: {
    color: '#8C8C8C',
    paddingRight: 10
  },
  metrics: {
    color: '#8C8C8C'
  }
})

export default HeightInputImperial