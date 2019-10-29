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
import FieldDataModel from '../../../models/field-data/field-data'
import {debounce} from '../../../annotations/eval'
import UnitConverter from '../../../utils/unit-converter'

interface Props {
  fieldData: FieldDataModel
  metrics: string
  persist: (value: string) => void
}

interface State {
  cm: string
}

class HeightInputMetricStateful extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      cm: this.calcValueHeight()
    }
  }

  submitHeightPressed = () => {
    return this.props.persist(UnitConverter.heightCmToM(this.state.cm))
  }

  heightChanged = (text) => {
    this.setState({
      ...this.state,
      cm: text
    })

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
                       value={+this.state.cm > 0 ? this.state.cm : ''}
                       style={styles.textInput}
                       onChangeText={this.heightChanged}/>
          </View>
          <UiBlockBasic>
            <UiBlockBottom>
              <TextNormal style={styles.metrics}>cm</TextNormal>
            </UiBlockBottom>
          </UiBlockBasic>
        </View>
      </View>
    )
  }

  private calcValueHeight = (): string => {
    return this.props.fieldData.fieldValues
                      .map(it => UnitConverter.heightMToCm(it.value))
                      .toString()
  }

  @debounce(5000)
  private persistHeight() {
    if (!this.state.cm) {
      return
    }

    return this.props.persist(UnitConverter.heightCmToM(this.state.cm))
  }
}

const HeightInputMetric = ({fieldData, persist, metrics}: Props) => (
  <HeightInputMetricStateful fieldData={fieldData} metrics={metrics} persist={persist} />
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

export default HeightInputMetric