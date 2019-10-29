import React from 'react';
import SelectableButtonsList from '../selectable-buttons-list';
import { comparator } from '../../utils/number';
const FieldValueCheckbox = (props) => {
    const { field, onValueUpdated, fieldData } = props;
    const items = field.fieldValues.sort(comparator)
        .map((fieldValue, i) => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
        key: i
    }));
    const newValue = (value) => {
        if (fieldData.fieldValues.indexOf(value) !== -1) {
            return fieldData.fieldValues.filter(it => it !== value);
        }
        else {
            return [...fieldData.fieldValues, value];
        }
    };
    return (React.createElement(SelectableButtonsList, { items: items, onItemSelected: (item) => onValueUpdated(newValue(item.value)) }));
};
export default FieldValueCheckbox;
//# sourceMappingURL=checkbox.js.map