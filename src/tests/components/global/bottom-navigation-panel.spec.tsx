import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges'
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center'
import {Text} from 'react-native'

it('renders correctly', () => {
  const tree = renderer.create(
    <BottomNavigationPanel>
      <UiBlockVerticalCenter>
        <UiBlockHorizontalEdges>
          <Text> The answer to life is 42</Text>
        </UiBlockHorizontalEdges>
      </UiBlockVerticalCenter>
    </BottomNavigationPanel>
  )
  expect(tree)
    .toMatchSnapshot()
})
