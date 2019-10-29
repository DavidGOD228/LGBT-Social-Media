import React from 'react'
import FieldCheckboxSafetyPractice from './checkbox-safety-practice'
import FieldCheckboxHankies from './checkbox-hankies'
import ProfileDataModel from '../../../models/field-data/profile-data'

interface Props {
  profileData: ProfileDataModel
}

const FieldCheckboxCustom = (props: Props) => {
  const fieldTitle = props.profileData.field.name ? props.profileData.field.name : ''

  return (
    fieldTitle === 'SafetyPractice' ?
      <FieldCheckboxSafetyPractice profileData={props.profileData}/> :
      <FieldCheckboxHankies profileData={props.profileData}/>
  )
}

export default FieldCheckboxCustom
