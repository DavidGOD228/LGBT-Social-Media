import React from 'react'
import {View, StyleSheet} from 'react-native'

interface Props {
  percent: number
}

const ProgressBar = (props: Props) => {
  const {
    percent = 0
  } = props
  const filledPart = percent > 1 ? percent / 100 : percent
  const emptyPart = 1 - filledPart

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={[styles.filledSpace, {flex: filledPart}]}/>
        <View style={[styles.emptySpace, {flex: emptyPart}]}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E7EBEF',
    height: 10,
    borderRadius: 3
  },
  filledSpace: {
    backgroundColor: '#A2BEDD',
    height: 10,
    borderRadius: 3
  },
  emptySpace: {
    backgroundColor: '#E7EBEF',
    height: 10,
    borderRadius: 3,
  }
})

export default ProgressBar
