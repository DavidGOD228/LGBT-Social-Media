import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import ModalWindow from '../../../components/modal/modal-window'
import {
  Text
} from 'react-native'

it('renders correctly visible empty', () => {
  const tree = renderer.create(
    <ModalWindow visible={true}/>
  )
  expect(tree)
    .toMatchSnapshot()
})

it('renders correctly visible text', () => {
  const tree = renderer.create(
    <ModalWindow visible={true}>
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalWindow>
  )
  expect(tree)
    .toMatchSnapshot()
})
