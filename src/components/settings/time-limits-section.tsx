import React, {Component} from 'react'
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native'
import CollapsingSection from '../collapsing-section'
import i18n from '../../locales/i18n'
import UiBlockSpace from '../ui/block/space'
import LineFullWidth from '../global/line-full-width'
import UiBlockBasic from '../ui/block/basic'
import SettingsRadioButton from './radio-button'
import TwoValueSelector from '../two-value-selector'
import MultiSlider from 'react-native-multi-slider'
import WhiteMarker from '../global/multi-slider/white-marker'
import UiBlockHorizontalCenter from '../ui/block/horizontal-center'
import TextNormal from '../global/text/basic/text-normal'

export interface TimeLimits {
  on: boolean,
  hours: number,
  timeLimitType: string
}

interface Props {
  on: boolean
  hours: number
  timeLimitType: string
  infoPressed: () => void
  timeLimitsChange: (value: TimeLimits) => void
}

interface State {
  sliderLength: number
  timeLimits: TimeLimits
}

export default class TimeLimitsSection extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      sliderLength: Dimensions.get('window').width,

      timeLimits: {
        on: props.on,
        hours: props.hours,
        timeLimitType: props.timeLimitType
      }
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,

      timeLimits: {
        on: props.on,
        hours: props.hours,
        timeLimitType: props.timeLimitType
      }
    })
  }

  private get minHours() {
    return 1
  }

  private get maxHours() {
    if (this.props.timeLimitType === 'Daily') {
      return 24
    }
    return 168
  }

  measureSliderLength = (event: any) => {
    this.setState({
      ...this.state,
      sliderLength: event.nativeEvent.layout.width
    })
  }

  sliderChangeFinish = (values: number[]) => {
    const timeLimits = this.state.timeLimits
    timeLimits.hours = values[0]

    this.setState({
      ...this.state,
      timeLimits
    })

    return this.props.timeLimitsChange(this.state.timeLimits)
  }

  onChanged = (value: boolean) => {
    const timeLimits = this.state.timeLimits
    timeLimits.on = value

    this.setState({
      ...this.state,
      timeLimits
    })

    return this.props.timeLimitsChange(this.state.timeLimits)
  }

  onTypeChange = (value: string) => {
    const timeLimits = this.state.timeLimits

    if (timeLimits.timeLimitType !== value) {
      // Updating time limit preserving ratio
      timeLimits.hours = value === 'Daily' ? Math.round(timeLimits.hours / 7) || 1 : timeLimits.hours * 7
    }

    timeLimits.timeLimitType = value

    this.setState({
      ...this.state,
      timeLimits
    })

    return this.props.timeLimitsChange(this.state.timeLimits)
  }

  render() {
    return (
      <CollapsingSection
        title={i18n.t('settings.timeLimits.sectionTitle')}
        completed={false}
        infoPressed={this.props.infoPressed}>
        <UiBlockSpace height={10}/>
        <LineFullWidth style={styles.titleBottomBorder}/>
        <UiBlockSpace height={10}/>
        <UiBlockBasic style={styles.fieldsContainer}>
          <SettingsRadioButton value={this.state.timeLimits.on}
                               onChange={this.onChanged}>
            <TextNormal>
              {i18n.t('settings.timeLimits.onOff')}
            </TextNormal>
          </SettingsRadioButton>
          <UiBlockSpace height={20}/>
        </UiBlockBasic>

        <TwoValueSelector valLeft={i18n.t('settings.timeLimits.daily')}
                          valRight={i18n.t('settings.timeLimits.weekly')}
                          selectedValue={this.state.timeLimits.timeLimitType}
                          valSelected={this.onTypeChange}/>

        <View style={{flex: 1}} onLayout={this.measureSliderLength}>
          <MultiSlider
            values={[this.props.hours || 1]}
            min={this.minHours}
            max={this.maxHours}
            onValuesChangeFinish={this.sliderChangeFinish.bind(this)}
            unselectedStyle={{backgroundColor: '#b9b9b9'}}
            selectedStyle={{backgroundColor: '#4990E2'}}
            containerStyle={{
              height: 28,
              marginTop: 35
            }}
            trackStyle={{height: 3}}
            customMarker={WhiteMarker}
            sliderLength={this.state.sliderLength}
          />
          <UiBlockHorizontalCenter>
            <TextNormal style={styles.hours}>{this.props.hours}
              hours/{this.props.timeLimitType === 'Daily' ? 'day' : 'week'}
            </TextNormal>
          </UiBlockHorizontalCenter>
        </View>
        <UiBlockSpace height={15}/>
      </CollapsingSection>
    )
  }
}

const styles = StyleSheet.create({
  titleBottomBorder: {
    backgroundColor: '#979797'
  },
  fieldsContainer: {
    paddingLeft: 15,
    paddingRight: 7
  },
  hours: {
    fontSize: 26
  }
})
