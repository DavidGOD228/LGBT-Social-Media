import React from 'react'
import TextNormal from '../../global/text/basic/text-normal'
import ProfileDataModel from '../../../models/field-data/profile-data'

interface Props {
  profileData: ProfileDataModel
}

const FieldLabelValue = (props: Props) => {
  const fieldValue = props.profileData.fieldValues.length > 0 ? props.profileData.fieldValues[0].value : ''

  return (
    <TextNormal>{fieldValue}</TextNormal>
  )
}

export default FieldLabelValue
