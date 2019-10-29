import CheckboxHankies from './hankies';
import CheckboxSafetyPractice from './safety-practice';
import CheckboxRole from './role';
const checkboxes = {
    Hankies: CheckboxHankies,
    SafetyPractice: CheckboxSafetyPractice,
    Role: CheckboxRole
};
const FieldValueCheckboxCustom = (props) => {
    console.log('field name: ' + props.field.name);
    return checkboxes[props.field.name](props);
};
export default FieldValueCheckboxCustom;
//# sourceMappingURL=checkbox_custom.js.map