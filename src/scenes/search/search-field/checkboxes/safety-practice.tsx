import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import ButtonSelectableLabel from '../../../../components/button-selectable-label'
import TextBold from '../../../../components/global/text/basic/text-bold'
import {comparator} from '../../../../utils/number'

interface Props {
  options: any[]
  value: any[]
  onUpdate: (value) => void
}

const CheckboxSafetyPractice = (props: Props) => {
  const {options, value} = props

  const items = options.sort(comparator)
                       .map((fieldValue, i) => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: value && value.indexOf(fieldValue) !== -1,
    key: i
  }))

  const newValue = (selected) => {
    if (value.indexOf(selected) !== -1) {
      return value.filter(it => it !== selected)
    } else {
      return [...value, selected]
    }
  }

  return (
    <View style={styles.buttonContainer}>
      {items.map(item =>
        <ButtonSelectableLabel item={item} key={item.key} label={getLabel(item.value)} onPress={() => {
          props.onUpdate(newValue(item.value))
        }}/>
      )}
    </View>
  )
}

const getLabel = (item) => {
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
    borderRadius: 12,
    backgroundColor: '#20BCFC',
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
  "Condoms": <View style={styles.label}><TextBold style={styles.labelText}>C</TextBold></View>,
  "Prep": <View style={styles.label}><TextBold style={styles.labelText}>P</TextBold></View>,
  "Bareback": <View style={styles.label}><TextBold style={styles.labelText}>B</TextBold></View>,
  "Treatment as Prevention": <View style={styles.label}><TextBold style={styles.labelText}>T</TextBold></View>,
  "Needs Discussion": <View style={styles.label}><TextBold style={styles.labelText}>N</TextBold></View>
}

export default CheckboxSafetyPractice

