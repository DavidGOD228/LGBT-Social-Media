import FieldLabelValue from '../../../components/field-values/profile-view/label-value'
import FieldLabelTitleValue from '../../../components/field-values/profile-view/label-title-value'
import FieldCheckboxBlue from '../../../components/field-values/profile-view/checkbox-blue'
import FieldRadioButtonCustom from '../../../components/field-values/profile-view/radio-button-custom'
import FieldCheckboxCustom from '../../../components/field-values/profile-view/checkbox-custom'
const fieldTypes = {
  TEXT_LIMITED: FieldLabelValue,
  TEXT: FieldLabelValue,
  DATE: FieldLabelValue,
  NUMBER: FieldLabelValue,
  RADIO_BUTTON: FieldLabelTitleValue,
  RADIO_BUTTON_CUSTOM: FieldRadioButtonCustom,
  BOOLEAN: FieldLabelValue,
  CHECK_BOX: FieldCheckboxBlue,
  CHECK_BOX_CUSTOM: FieldCheckboxCustom
}

export default fieldTypes
