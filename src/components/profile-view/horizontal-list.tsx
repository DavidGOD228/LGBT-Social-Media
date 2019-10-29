import React from 'react'
import {
  ListView,
  StyleSheet,
  View
} from 'react-native'

interface Props {
  dataSource: any,
  renderRow: (rowData) => any
}

const HorizontalList = (props: Props) => {

  return <ListView style={styles.container}
                   dataSource={props.dataSource}
                   horizontal={true}
                   scrollEnabled={true}
                   bounces={false}
                   pagingEnabled={true}
                   renderScrollComponent={viewProps => <View {...viewProps} />}
                   renderRow={(rowData) => {
                     return (
                       <View style={styles.row}>{props.renderRow(rowData)}</View>
                     )
                   }
                   }
  />
}

const styles = StyleSheet.create({
  row: {
    width: '92%',
    aspectRatio: 1
  },
  container: {
    flexDirection: 'row'
  }
})

export default HorizontalList
