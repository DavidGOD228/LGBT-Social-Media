import FieldValueTextInputLimited from '../../../../components/field-values/text-limited'
import FieldValueCheckbox from '../../../../components/field-values/checkbox'
import FieldValueDate from '../../../../components/field-values/date'
import FieldValueRadioButton from '../../../../components/field-values/radio-button'
import FieldValueRadioButtonCustom from '../../../../components/field-values/radio-buttons/radio-button-custom'
import FieldValueBooleanSwitch from '../../../../components/field-values/boolean-switch'
import FieldValueCheckboxCustom from '../../../../components/field-values/checkboxes/checkbox_custom'
import FieldValueNumber from '../../../../components/field-values/number'
import FieldValueTextInput from '../../../../components/field-values/text'

const inputTypes = {
  TEXT_LIMITED: FieldValueTextInputLimited,
  TEXT: FieldValueTextInput,
  DATE: FieldValueDate,
  NUMBER: FieldValueNumber,
  RADIO_BUTTON: FieldValueRadioButton,
  RADIO_BUTTON_CUSTOM: FieldValueRadioButtonCustom,
  BOOLEAN: FieldValueBooleanSwitch,
  CHECK_BOX: FieldValueCheckbox,
  CHECK_BOX_CUSTOM: FieldValueCheckboxCustom
}

export default inputTypes
