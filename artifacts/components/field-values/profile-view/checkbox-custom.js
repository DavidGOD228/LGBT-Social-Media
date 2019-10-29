import React from 'react';
import FieldCheckboxSafetyPractice from './checkbox-safety-practice';
import FieldCheckboxHankies from './checkbox-hankies';
const FieldCheckboxCustom = (props) => {
    const fieldTitle = props.profileData.field.name ? props.profileData.field.name : '';
    return (fieldTitle === 'SafetyPractice' ?
        React.createElement(FieldCheckboxSafetyPractice, { profileData: props.profileData }) :
        React.createElement(FieldCheckboxHankies, { profileData: props.profileData }));
};
export default FieldCheckboxCustom;
//# sourceMappingURL=checkbox-custom.js.map