import React from 'react'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'
import FieldModel from '../../../models/field'
import FieldValueModel from '../../../models/field-value'
import ButtonSelectableLabel from '../../button-selectable-label'
import FieldDataModel from '../../../models/field-data/field-data'
import {comparator} from '../../../utils/number'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const CheckboxSafetyPractice = (props: Props) => {
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
  return labels[item.value]
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
    marginTop: 1,
    marginBottom: 1,
    marginRight: 5,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  labelText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 18,
    width: 16,
    height: 16,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

const labels = {
  "Condoms": <Image source={require('Musl/images/profile/safety/condoms.png')} style={styles.label}/>,
  "Prep": <Image source={require('Musl/images/profile/safety/prep.png')} style={styles.label}/>,
  "Bareback": <Image source={require('Musl/images/profile/safety/bareback.png')} style={styles.label}/>,
  "Treatment as Prevention": <Image source={require('Musl/images/profile/safety/tap.png')}
                                    style={styles.label}/>,
  "Needs Discussion": <Image source={require('Musl/images/profile/safety/needs.png')} style={styles.label}/>
}

export default CheckboxSafetyPractice
