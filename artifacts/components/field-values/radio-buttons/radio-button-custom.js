import React from 'react';
import RadioButtonsList from '../../radio-buttons-list';
import RadioButtonsBordered from '../../radio-buttons-bordered';
import { comparator } from '../../../utils/number';
const FieldValueRadioButtonCustom = (props) => {
    const { field, fieldData, onValueUpdated } = props;
    const items = field.fieldValues.sort(comparator)
        .map((fieldValue, i) => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
        key: i
    }));
    const newValue = (value) => {
        return [value];
    };
    return (field.name === 'Role' ?
        React.createElement(RadioButtonsList, { items: items, onItemSelected: (item) => onValueUpdated(newValue(item.value)) }) :
        // When / Where
        React.createElement(RadioButtonsBordered, { items: items, onItemSelected: (item) => onValueUpdated(newValue(item.value)) }));
};
export default FieldValueRadioButtonCustom;
//# sourceMappingURL=radio-button-custom.js.map