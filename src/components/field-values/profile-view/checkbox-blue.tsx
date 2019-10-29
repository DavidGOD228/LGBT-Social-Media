import React from 'react'
import TextNormal from '../../global/text/basic/text-normal'
import {
  StyleSheet,
  View
} from 'react-native'
import SelectableButtonsList from '../../selectable-buttons-list'
import ProfileDataModel from '../../../models/field-data/profile-data'
import UiBlockBasic from '../../ui/block/basic'
import ProfileViewFieldModel from '../../../models/profile-view/profile-view-field'
import {
  capitalize,
  decamelize
} from '../../../utils/string'
import UiBlockSpace from '../../ui/block/space'

interface Props {
  profileViewField: ProfileViewFieldModel
  profileData: ProfileDataModel
}

const FieldCheckboxBlue = (props: Props) => {
  const fieldTitle = props.profileViewField.name ? capitalize(decamelize(props.profileViewField.name, ' ')) : ''
  const items = props.profileData.fieldValues.map(fieldValue => ({
    value: fieldValue,
    title: fieldValue.value,
    isSelected: true,
    key: fieldValue.value
  }))

  return (
    <UiBlockBasic>
      <View style={styles.container}>
        {props.profileViewField.name !== 'HesLookingFor' ? (
          <UiBlockBasic>
            <TextNormal>{fieldTitle}:</TextNormal>
            <UiBlockSpace height={3}/>
          </UiBlockBasic>
        ) : (
          null
        )}

        <SelectableButtonsList
          items={items}
          onItemSelected={(item) => {
            console.log(item.value)
          }}
        />
      </View>
    </UiBlockBasic>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})

export default FieldCheckboxBlue
