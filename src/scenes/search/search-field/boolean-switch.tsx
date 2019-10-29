import React, {Component} from 'react'
import {Switch} from 'react-native'
import LineFullWidth from '../../../components/global/line-full-width'
import UiBlockBasic from '../../../components/ui/block/basic'
import UiBlockRight from '../../../components/ui/block/right'
import UiBlockSpace from '../../../components/ui/block/space'
import TextNormal from '../../../components/global/text/basic/text-normal'
import UiBlockSpaceHorizontal from '../../../components/ui/block/space-horizontal'
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center'

interface Props {
  fieldName: string
  value: boolean
  onUpdate: (value) => void
}

interface State {
  value: boolean
}

class FieldValueBooleanSwitchClass extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  render() {
    const {fieldName} = this.props

    return (
      <UiBlockBasic>
        <LineFullWidth style={{backgroundColor: '#E3E9EF'}}/>
        <UiBlockSpace height={3}/>
        <UiBlockRight>
          <UiBlockBasic>
            <UiBlockVerticalCenter>
              <TextNormal style={{fontSize: 13}}>{fieldName}</TextNormal>
            </UiBlockVerticalCenter>
          </UiBlockBasic>
          <UiBlockSpaceHorizontal width={10}/>
          <Switch value={this.state.value} onValueChange={this.onChange}/>
        </UiBlockRight>
      </UiBlockBasic>
    )
  }

  private onChange = (value) => {
    this.setState(prevState => ({
      ...prevState,
      value
    }))
    this.props.onUpdate(value)
  }

}

const FieldValueBooleanSwitch = ({
  fieldName, value, onUpdate
}: Props) => (
  <FieldValueBooleanSwitchClass
    fieldName={fieldName}
    value={value}
    onUpdate={onUpdate}
  />
)

export default FieldValueBooleanSwitch
