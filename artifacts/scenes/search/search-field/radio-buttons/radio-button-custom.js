import React from 'react';
import RadioButtonsList from '../../../../components/radio-buttons-list';
import RadioButtonsBordered from '../../../../components/radio-buttons-bordered';
import { comparator } from '../../../../utils/number';
const FieldValueRadioButtonCustom = (props) => {
    const { field, value, onUpdate, options } = props;
    const items = options.sort(comparator)
        .map((fieldValue, i) => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: value && value.indexOf(fieldValue) !== -1,
        key: i
    }));
    const newValue = (selected) => {
        if (value.indexOf(selected) !== -1) {
            return value.filter(it => it !== selected);
        }
        else {
            return [...value, selected];
        }
    };
    return (field.name === 'Role' ?
        React.createElement(RadioButtonsList, { items: items, onItemSelected: (item) => onUpdate(newValue(item.value)) }) :
        // When / Where
        React.createElement(RadioButtonsBordered, { items: items, onItemSelected: (item) => onUpdate(newValue(item.value)) }));
};
export default FieldValueRadioButtonCustom;
//# sourceMappingURL=radio-button-custom.js.map