import React from 'react'
import FieldModel from '../../../models/field'
import {View} from 'react-native'
import TextNormal from '../../../components/global/text/basic/text-normal'

const FieldValueEmpty = ({field}: { field: FieldModel }) => (
  <View>
    <TextNormal>
      input here {field.fieldValues[0].value}
    </TextNormal>
  </View>
)

export default FieldValueEmpty
