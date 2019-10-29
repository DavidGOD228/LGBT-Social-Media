import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ButtonSelectableLabel from '../../../../components/button-selectable-label';
import { PROFILE_SEX_ROLE } from '../../../../configs/dicts';
import { comparator } from '../../../../utils/number';
const CheckboxRole = (props) => {
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
    return React.createElement(Image, { source: PROFILE_SEX_ROLE[item.value], style: styles.label });
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
        marginTop: 2,
        marginBottom: 2,
        marginRight: 5,
        width: 20,
        height: 20,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default CheckboxRole;
//# sourceMappingURL=role.js.map