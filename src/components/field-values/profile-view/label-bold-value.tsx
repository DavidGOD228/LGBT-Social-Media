import React from 'react'
import TextNormal from '../../global/text/basic/text-normal'
import {
  StyleSheet,
  View
} from 'react-native'
import TextBold from '../../global/text/basic/text-bold'
import ProfileDataModel from '../../../models/field-data/profile-data'

interface Props {
  profileData: ProfileDataModel
}

const FieldLabelBoldValue = (props: Props) => {
  const fieldTitle = props.profileData.field.name ? props.profileData.field.name : ''
  const fieldValue = props.profileData.fieldValues.length > 0 ? props.profileData.fieldValues[0].value : ''

  return <View style={styles.container}>
    <TextNormal>{fieldTitle}: <TextBold>{fieldValue}</TextBold></TextNormal>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  boldText: {
    color: 'rgb(92, 92, 92)'
  }
})

export default FieldLabelBoldValue
