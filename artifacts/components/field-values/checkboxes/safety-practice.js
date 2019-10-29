import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ButtonSelectableLabel from '../../button-selectable-label';
import { comparator } from '../../../utils/number';
const CheckboxSafetyPractice = (props) => {
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
    return (React.createElement(View, { style: styles.buttonContainer }, items.map((item, i) => React.createElement(ButtonSelectableLabel, { key: i, item: item, label: getLabel(item.value), onPress: () => {
            onValueUpdated(newValue(item.value));
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
    "Condoms": React.createElement(Image, { source: require('Musl/images/profile/safety/condoms.png'), style: styles.label }),
    "Prep": React.createElement(Image, { source: require('Musl/images/profile/safety/prep.png'), style: styles.label }),
    "Bareback": React.createElement(Image, { source: require('Musl/images/profile/safety/bareback.png'), style: styles.label }),
    "Treatment as Prevention": React.createElement(Image, { source: require('Musl/images/profile/safety/tap.png'), style: styles.label }),
    "Needs Discussion": React.createElement(Image, { source: require('Musl/images/profile/safety/needs.png'), style: styles.label })
};
export default CheckboxSafetyPractice;
//# sourceMappingURL=safety-practice.js.map