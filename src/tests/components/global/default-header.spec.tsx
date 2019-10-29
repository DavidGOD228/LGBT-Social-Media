import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import DefaultHeader from '../../../components/global/default-header'

it('renders correctly', () => {
  const tree = renderer.create(
    <DefaultHeader/>
  )
  expect(tree)
    .toMatchSnapshot()
})
