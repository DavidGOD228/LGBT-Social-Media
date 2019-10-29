import 'react-native'
// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import SelectableButtonList from '../../components/selectable-buttons-list'

it('renders correctly when has options', () => {
  const optionsArray = [
    {
      value: 'Guy Nex Dor',
      isSelected: false,
      key: 1
    },
    {
      value: 'All-American',
      isSelected: false,
      key: 2
    },
    {
      value: 'Suit & Tie',
      isSelected: false,
      key: 3
    },
    {
      value: 'Bear',
      isSelected: false,
      key: 4
    },
    {
      value: 'Muscle',
      isSelected: false,
      key: 5
    },
    {
      value: 'Geek/Nerd',
      isSelected: false,
      key: 6
    }
  ]
  const tree = renderer.create(
    <SelectableButtonList items={optionsArray}
                          onItemSelected={item => item.isSelected = !item.isSelected}/>
  )
  expect(tree)
    .toMatchSnapshot()
})

it('renders correctly when has no options', () => {
  const optionsArray = []
  const tree = renderer.create(
    <SelectableButtonList items={optionsArray}
                          onItemSelected={item => item.isSelected = !item.isSelected}/>
  )
  expect(tree)
    .toMatchSnapshot()
})
