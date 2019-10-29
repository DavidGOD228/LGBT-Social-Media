import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonSelectableLabel from '../../../../components/button-selectable-label';
import TextBold from '../../../../components/global/text/basic/text-bold';
import { comparator } from '../../../../utils/number';
const CheckboxSafetyPractice = (props) => {
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
    return (React.createElement(View, { style: styles.buttonContainer }, items.map(item => React.createElement(ButtonSelectableLabel, { item: item, key: item.key, label: getLabel(item.value), onPress: () => {
            props.onUpdate(newValue(item.value));
        } }))));
};
const getLabel = (item) => {
    return labels[item.value];
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    label: {
        marginTop: 1,
        marginBottom: 1,
        marginRight: 5,
        width: 22,
        height: 22,
        borderRadius: 12,
        backgroundColor: '#20BCFC',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    labelText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 18,
        width: 16,
        height: 16,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
const labels = {
    "Condoms": React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "C")),
    "Prep": React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "P")),
    "Bareback": React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "B")),
    "Treatment as Prevention": React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "T")),
    "Needs Discussion": React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "N"))
};
export default CheckboxSafetyPractice;
//# sourceMappingURL=safety-practice.js.map