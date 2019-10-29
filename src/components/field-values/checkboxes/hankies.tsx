import React from 'react'
import FieldModel from '../../../models/field'
import HankiesGrid from '../hankies'
import FieldDataModel from '../../../models/field-data/field-data'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const CheckboxHankies = (props: Props) => (
  <HankiesGrid field={props.field} fieldData={props.fieldData} onValueUpdated={props.onValueUpdated}/>
)

export default CheckboxHankies
