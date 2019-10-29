import React from 'react'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'
import FieldModel from '../../../models/field'
import ButtonSelectableLabel from '../../button-selectable-label'
import {PROFILE_SEX_ROLE} from '../../../configs/dicts'
import FieldValueModel from '../../../models/field-value'
import FieldDataModel from '../../../models/field-data/field-data'
import {comparator} from '../../../utils/number'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const CheckboxRole = (props: Props) => {
  const {field, onValueUpdated, fieldData} = props

  const items = field.fieldValues.sort(comparator)
                     .map((fieldValue, i) => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
    key: i
  }))

  const newValue = (value: FieldValueModel) => {
    if (fieldData.fieldValues.indexOf(value) !== -1) {
      return fieldData.fieldValues.filter(it => it !== value)
    } else {
      return [...fieldData.fieldValues, value]
    }
  }

  return (
    <View style={styles.buttonContainer}>
      {items.map((item, i) =>
        <ButtonSelectableLabel key={i} item={item} label={getLabel(item.value)} onPress={() => {
          onValueUpdated(newValue(item.value))
        }}/>
      )}
    </View>
  )
}

const getLabel = (item: FieldValueModel) => {
  return <Image source={PROFILE_SEX_ROLE[item.value]} style={styles.label} />
}

const styles: any = StyleSheet.create({
  buttonContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  label: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 5,
    width: 20,
    height: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default CheckboxRole

