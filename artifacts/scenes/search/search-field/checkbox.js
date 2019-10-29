import React from 'react';
import SelectableButtonsList from '../../../components/selectable-buttons-list';
import { comparator } from '../../../utils/number';
const FieldValueCheckbox = (props) => {
    const { options, value } = props;
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
    return (React.createElement(SelectableButtonsList, { items: items, onItemSelected: (item) => props.onUpdate(newValue(item.value)) }));
};
export default FieldValueCheckbox;
//# sourceMappingURL=checkbox.js.map