import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import TextBold from '../../global/text/basic/text-bold'
import {ProfileFieldValueDict} from '../../../configs/dicts'
import ProfileDataModel from '../../../models/field-data/profile-data'
import UiBlockHorizontal from '../../ui/block/horizontal'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockVerticalCenter from '../../ui/block/vertical-center'
import TextNormal from '../../global/text/basic/text-normal'
import UiBlockSpace from '../../ui/block/space'

interface Props {
  profileData: ProfileDataModel
}

const FieldCheckboxSafetyPractice = (props: Props) => {

  const items = props.profileData.fieldValues.map(fieldValue => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: true,
    key: fieldValue.value
  }))

  return (
    <View style={styles.buttonContainer}>
      {items.map((item, i) =>
        <UiBlockBasic key={i}>
          <UiBlockSpace height={5}/>
          <UiBlockHorizontal>
            {getLabel(item.value)}
            <UiBlockBasic>
              <UiBlockVerticalCenter>
                <TextNormal style={[styles.floatButtonText]}>
                  {item.value.value}
                </TextNormal>
              </UiBlockVerticalCenter>
            </UiBlockBasic>
          </UiBlockHorizontal>
        </UiBlockBasic>
      )}
    </View>
  )
}

const getLabel = (item: ProfileFieldValueDict) => {
  return labels[item.value]
}

const styles: any = StyleSheet.create({
  buttonContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  floatButtonText: {
    fontSize: 16,
    color: 'rgb(92, 92, 92)',
    textAlign: 'center'
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
  'Condoms': <View style={styles.label}><TextBold style={styles.labelText}>C</TextBold></View>,
  'Prep': <View style={styles.label}><TextBold style={styles.labelText}>P</TextBold></View>,
  'Bareback': <View style={styles.label}><TextBold style={styles.labelText}>B</TextBold></View>,
  'Treatment as Prevention': <View style={styles.label}><TextBold style={styles.labelText}>T</TextBold></View>,
  'Needs Discussion': <View style={styles.label}><TextBold style={styles.labelText}>N</TextBold></View>
}

export default FieldCheckboxSafetyPractice
