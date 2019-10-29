import React from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  requireNativeComponent,
  View
} from 'react-native'

interface Props {
  children: any
  style?: any
  clipChildren?: boolean
}

const nativeInterface = {
  name: 'NCView',
  propTypes: {
    clipChildren: PropTypes.bool,
    ...View.propTypes
  }
}

const NCViewNative = requireNativeComponent('NCView', nativeInterface)

const NCView = (props: Props) => (
  // will force nonclipping behavior on android for now.
  Platform.OS === 'android' ?
    <NCViewNative
      style={props.style}
      clipChildren={false}
    >
      {props.children}
    </NCViewNative>
    :
    <View style={props.style}>
      {props.children}
    </View>
)

export default NCView
