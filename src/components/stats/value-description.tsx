import React from 'react'
import UiBlockBasic from '../ui/block/basic'
import TextNormal from '../global/text/basic/text-normal'
interface Props {
  children?: any,
  styles?: any
}

const StatsValueDescription = (props: Props) => (
  <UiBlockBasic style={{flex: 1, justifyContent: 'center'}}>
    <TextNormal>
      {props.children}
    </TextNormal>
  </UiBlockBasic>
)

export default StatsValueDescription
