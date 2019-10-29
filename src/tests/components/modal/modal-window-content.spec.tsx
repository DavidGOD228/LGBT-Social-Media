import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import ModalWindowContent from '../../../components/modal/modal-window-content'
import {Text} from 'react-native'

it('renders correctly empty', () => {
  const tree = renderer.create(
    <ModalWindowContent/>
  )
  expect(tree)
    .toMatchSnapshot()
})

it('renders correctly text', () => {
  const tree = renderer.create(
    <ModalWindowContent>
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalWindowContent>
  )
  expect(tree)
    .toMatchSnapshot()
})
