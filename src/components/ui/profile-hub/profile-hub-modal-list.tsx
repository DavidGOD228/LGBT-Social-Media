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

const ProfileHubModalList = (props: Props) => {
  return <ListView style={styles.container}
                   dataSource={props.dataSource}
                   renderScrollComponent={viewProps => <View {...viewProps} />}
                   renderRow={(rowData) => <View style={styles.row}>{props.renderRow(rowData)}</View>}
  />
}

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

export default ProfileHubModalList
