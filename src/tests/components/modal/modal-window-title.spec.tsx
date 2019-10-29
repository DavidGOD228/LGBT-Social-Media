import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import ModalWindowTitle from '../../../components/modal/modal-window-title'
import {
  Text
} from 'react-native'

it('renders correctly empty', () => {
  const tree = renderer.create(
    <ModalWindowTitle />
  )
  expect(tree)
    .toMatchSnapshot()
})

it('renders correctly text', () => {
  const tree = renderer.create(
    <ModalWindowTitle >
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalWindowTitle>
  )
  expect(tree)
    .toMatchSnapshot()
})
