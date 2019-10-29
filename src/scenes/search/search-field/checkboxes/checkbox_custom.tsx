import CheckboxHankies from './hankies'
import CheckboxSafetyPractice from './safety-practice'
import CheckboxRole from './role'

interface Props {
  options: any[]
  value: any[]
  field: any
  onUpdate: (value) => void
}

const checkboxes = {
  Hankies: CheckboxHankies,
  SafetyPractice: CheckboxSafetyPractice,
  Role: CheckboxRole
}

const FieldValueCheckboxCustom = (props: Props) => {
  return checkboxes[props.field.name](props)
}

export default FieldValueCheckboxCustom
