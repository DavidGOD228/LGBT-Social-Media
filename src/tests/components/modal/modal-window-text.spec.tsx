import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import ModalWindowText from '../../../components/modal/modal-window-text'
import {Text} from 'react-native'

it('renders correctly empty', () => {
  const tree = renderer.create(
    <ModalWindowText/>
  )
  expect(tree)
    .toMatchSnapshot()
})

it('renders correctly text', () => {
  const tree = renderer.create(
    <ModalWindowText>
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalWindowText>
  )
  expect(tree)
    .toMatchSnapshot()
})
