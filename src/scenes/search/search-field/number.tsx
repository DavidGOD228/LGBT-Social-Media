import React, {Component} from 'react'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import UiBlockBasic from '../../../components/ui/block/basic'
import FieldModel from '../../../models/field'
import SectionModel from '../../../models/section'
import SubSectionModel from '../../../models/sub-section'
import UiBlockLeft from '../../../components/ui/block/left'
import TextNormal from '../../../components/global/text/basic/text-normal'
import LineFullWidth from '../../../components/global/line-full-width'
import UiBlockSpace from '../../../components/ui/block/space'
import UiBlockBottom from '../../../components/ui/block/bottom'
import i18n from '../../../locales/i18n'
import UiBlockRight from '../../../components/ui/block/right'

interface Props {
  field: FieldModel
  section: SectionModel
  subSection: SubSectionModel
  restrictionMap: any
  restrictionPath: string
}

interface State {
  value: string
}

class FieldValueNumberStateful extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      value: this.calcValue()
    }
  }

  render() {
    return (
      <UiBlockBasic>
        <UiBlockSpace height={20}/>
        <UiBlockLeft>
          <UiBlockBasic>
            <UiBlockBottom>
              <TextNormal style={styles.label}>{this.label}</TextNormal>
            </UiBlockBottom>
          </UiBlockBasic>
          <View style={{flex: 3}}>
            <TextInput multiline={false}
                       editable={true}
                       keyboardType={'numeric'}
                       value={this.state.value}
                       style={styles.textInput}
                       onChangeText={this.onChange}/>
          </View>
          <UiBlockRight>
            <UiBlockBasic>
              <UiBlockBottom>
                <TextNormal style={styles.metrics}>{this.metrics}</TextNormal>
              </UiBlockBottom>
            </UiBlockBasic>
          </UiBlockRight>
        </UiBlockLeft>
        <LineFullWidth style={styles.line}/>
      </UiBlockBasic>
    )
  }

  private get label() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
      `${this.props.subSection.name}.fields.${this.props.field.name}.name`)
  }

  private get metrics() {
    return i18n.t(`profile.details.sections.${this.props.section.name}.subSections.` +
      `${this.props.subSection.name}.fields.${this.props.field.name}.metrics`)
  }

  private calcValue = () => {
    const restriction = this.props.restrictionMap[this.props.restrictionPath]
    return restriction && restriction.values.toString()
  }

  private onChange = async (text) => {
    this.setState(prevState => ({
      ...prevState,
      value: text
    }))
    this.props.restrictionMap[this.props.restrictionPath] = {
      field: this.props.restrictionPath,
      values: [text],
      operator: 'In'
    }
  }
}

const FieldValueNumber = ({
  field, subSection, section, restrictionMap, restrictionPath
}: Props) => (
  <FieldValueNumberStateful
    field={field}
    restrictionMap={restrictionMap}
    restrictionPath={restrictionPath}
    subSection={subSection}
    section={section}
  />
)

const styles = StyleSheet.create({
  textInput: {
    color: 'rgb(46, 46, 46)'
  },
  label: {
    color: '#8C8C8C',
    paddingRight: 10
  },
  metrics: {
    color: '#8C8C8C'
  },
  line: {
    backgroundColor: '#A6B4BD'
  }
})

export default FieldValueNumber
