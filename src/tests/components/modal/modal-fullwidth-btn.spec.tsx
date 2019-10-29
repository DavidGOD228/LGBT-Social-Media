import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import ModalFullwidthBtn from '../../../components/modal/modal-fullwidth-btn'
import {
  Text
} from 'react-native'

it('renders correctly disabled empty', () => {
  const tree = renderer.create(
    <ModalFullwidthBtn onPress={() => null} disabled={true} />
  );
  expect(tree).toMatchSnapshot();
})

it('renders correctly enabled empty', () => {
  const tree = renderer.create(
    <ModalFullwidthBtn onPress={() => null} disabled={false} />
  );
  expect(tree).toMatchSnapshot();
})

it('renders correctly disabled text', () => {
  const tree = renderer.create(
    <ModalFullwidthBtn onPress={() => null} disabled={true}>
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalFullwidthBtn>
  );
  expect(tree).toMatchSnapshot();
})

it('renders correctly enabled text', () => {
  const tree = renderer.create(
    <ModalFullwidthBtn onPress={() => null} disabled={false}>
      <Text>
        All you had to do was follow the damn train CJ
      </Text>
    </ModalFullwidthBtn>
  );
  expect(tree).toMatchSnapshot();
})
