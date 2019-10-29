import FieldModel from '../../../models/field'
import CheckboxHankies from './hankies'
import CheckboxSafetyPractice from './safety-practice'
import CheckboxRole from './role'
import FieldDataModel from '../../../models/field-data/field-data'

interface Props {
  field: FieldModel
  fieldData: FieldDataModel
  onValueUpdated: (value: any) => void
}

const checkboxes = {
  Hankies: CheckboxHankies,
  SafetyPractice: CheckboxSafetyPractice,
  Role: CheckboxRole
}

const FieldValueCheckboxCustom = (props: Props) => {
  console.log('field name: ' + props.field.name)
  return checkboxes[props.field.name](props)
}

export default FieldValueCheckboxCustom
