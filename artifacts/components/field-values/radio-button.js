import React from 'react';
import RadioButtonsList from '../radio-buttons-list';
const FieldValueRadioButton = (props) => {
    const { field, fieldData, onValueUpdated } = props;
    const items = field.fieldValues.map((fieldValue, i) => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
        key: i
    }));
    const newValue = (value) => {
        return [value];
    };
    return (React.createElement(RadioButtonsList, { items: items, onItemSelected: (item) => onValueUpdated(newValue(item.value)) }));
};
export default FieldValueRadioButton;
//# sourceMappingURL=radio-button.js.map