import React from 'react'
import TextNormal from '../../global/text/basic/text-normal'
import {
  StyleSheet,
  View
} from 'react-native'
import UiBlockSpace from '../../ui/block/space'
import ProfileDataModel from '../../../models/field-data/profile-data'
import {
  capitalize,
  decamelize
} from '../../../utils/string'

interface Props {
  profileData: ProfileDataModel
}

const FieldLabelTitleValue = (props: Props) => {
  const fieldTitle = props.profileData.field.name ? props.profileData.field.name : ''
  const fieldValue = props.profileData.fieldValues.length > 0 ? props.profileData.fieldValues[0].value : ''

  return <View style={styles.container}>
    <TextNormal>{capitalize(decamelize(fieldTitle, ' '))}:</TextNormal>
    <UiBlockSpace height={5}/>
    <TextNormal>{fieldValue}</TextNormal>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})

export default FieldLabelTitleValue
