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

const ScaledList = (props: Props) => {

  const styles = StyleSheet.create({
    row: {
      width: '100%',
      flex: 1
    },
    container: {
      flex: 1,
      flexDirection: 'column'
    }
  })
  return <ListView style={styles.container}
                   dataSource={props.dataSource}
                   renderScrollComponent={viewProps => <View {...viewProps} />}
                   renderRow={(rowData, sectionID, rowID) => {
                     const colors = ['rgb(243, 245, 247)', 'white']
                     const style = [
                       styles.row,
                       {backgroundColor: colors[(rowID as number) % colors.length]}
                     ]
                     console.log(sectionID)
                     return (
                       <View style={style}>{props.renderRow(rowData)}</View>
                     )
                   }
                   }
  />
}

export default ScaledList
