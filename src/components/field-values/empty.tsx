import React from 'react'
import FieldModel from '../../models/field'
import {View} from 'react-native'
import TextNormal from '../global/text/basic/text-normal'

const FieldValueEmpty = ({field}: { field: FieldModel }) => (
  <View key={field.id}>
    <TextNormal>
      {JSON.stringify(field)}
      {/*input here {field.fieldValues[0].value}*/}
    </TextNormal>
  </View>
)

export default FieldValueEmpty
