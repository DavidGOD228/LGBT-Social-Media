import React from 'react'
import {
  FlatList,
  RefreshControl
} from 'react-native'

interface Props {
  columnCount?: number,
  columnSpacing?: number,
  dataSource: any,
  renderRow: (rowData) => any,
  footer?: any,
  header?: any,
  onRefresh: () => void,
  getListReference?: (ref) => void,
  refreshing: boolean
}

const GridView = (props: Props) => {
  return <FlatList
    ref={ref => props.getListReference && props.getListReference(ref)}
    refreshControl={
      <RefreshControl
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
      />
    }
    numColumns={3}
    data={props.dataSource}
    renderItem={(item) => props.renderRow(item)}
    ListFooterComponent={props.footer}
    ListHeaderComponent={props.header}
  />
}

export default GridView
