// Note: test renderer must be required after react-native.
import React from 'react'
import renderer from 'react-test-renderer'
import {
  Text
} from 'react-native'
import GridView from '../../../components/global/grid-view'

it('renders correctly empty', () => {
  const tree = renderer.create(
    <GridView
      dataSource={[]}
      renderRow={(data) => <Text>{data.item.key}</Text>}
      onRefresh={() => null}
      refreshing={false}
    />
  )
  expect(tree)
    .toMatchSnapshot()
})

it('renders correctly non empty', () => {
  const data = Array.apply(null, {length: 80})
                    .map(Number.call, Number)
                    .map(n => ({
                      n,
                      key: n
                    }))
  const tree = renderer.create(
    <GridView
      dataSource={data}
      renderRow={(rowData) => <Text>{rowData.item.key}</Text>}
      onRefresh={() => null}
      refreshing={false}
    />
  )
  expect(tree)
    .toMatchSnapshot()
})
