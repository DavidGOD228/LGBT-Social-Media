// import FieldValueTextInputLimited from './search-field/text-limited'
import FieldValueCheckbox from './search-field/checkbox';
import FieldValueRadioButton from './search-field/radio-button';
import FieldValueRadioButtonCustom from './search-field/radio-buttons/radio-button-custom';
import FieldValueBooleanSwitch from './search-field/boolean-switch';
import FieldValueCheckboxCustom from './search-field/checkboxes/checkbox_custom';
import FieldValueTextInput from './search-field/text';
import MultiSlider from '../../components/global/multi-slider/multi-slider';
const inputTypes = {
    TEXT_LIMITED: FieldValueTextInput,
    TEXT: FieldValueTextInput,
    DATE: MultiSlider,
    NUMBER: MultiSlider,
    RADIO_BUTTON: FieldValueRadioButton,
    RADIO_BUTTON_CUSTOM: FieldValueRadioButtonCustom,
    BOOLEAN: FieldValueBooleanSwitch,
    CHECK_BOX: FieldValueCheckbox,
    CHECK_BOX_CUSTOM: FieldValueCheckboxCustom
};
export default inputTypes;
//# sourceMappingURL=field-component-map.js.map