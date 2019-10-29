import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import ModalTextBtn from '../../../components/modal/modal-text-btn'
import {
  Text
} from 'react-native'

it('renders correctly empty', () => {
  const tree = renderer.create(
    <ModalTextBtn onPress={() => null}/>
  );
  expect(tree).toMatchSnapshot();
})

it('renders correctly text', () => {
  const tree = renderer.create(
    <ModalTextBtn onPress={() => null}>
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalTextBtn>
  );
  expect(tree).toMatchSnapshot();
})