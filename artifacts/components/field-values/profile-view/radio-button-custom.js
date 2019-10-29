import React from 'react';
import FieldLabelBoldValue from './label-bold-value';
import RadioButtonsList from '../../radio-buttons-list';
const FieldRadioButtonCustom = (props) => {
    const fieldTitle = props.profileData.field.name ? props.profileData.field.name : '';
    const items = props.profileData.fieldValues.map(fieldValue => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: false,
        key: fieldValue.value
    }));
    return (fieldTitle === 'When' || fieldTitle === 'Where' ?
        React.createElement(FieldLabelBoldValue, { profileData: props.profileData }) :
        React.createElement(RadioButtonsList, { items: items, onItemSelected: (item) => {
                console.log(item.value);
            } }));
};
export default FieldRadioButtonCustom;
//# sourceMappingURL=radio-button-custom.js.map