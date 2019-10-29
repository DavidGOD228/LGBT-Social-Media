import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextBold from '../../global/text/basic/text-bold';
import UiBlockHorizontal from '../../ui/block/horizontal';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockVerticalCenter from '../../ui/block/vertical-center';
import TextNormal from '../../global/text/basic/text-normal';
import UiBlockSpace from '../../ui/block/space';
const FieldCheckboxSafetyPractice = (props) => {
    const items = props.profileData.fieldValues.map(fieldValue => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: true,
        key: fieldValue.value
    }));
    return (React.createElement(View, { style: styles.buttonContainer }, items.map((item, i) => React.createElement(UiBlockBasic, { key: i },
        React.createElement(UiBlockSpace, { height: 5 }),
        React.createElement(UiBlockHorizontal, null,
            getLabel(item.value),
            React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(TextNormal, { style: [styles.floatButtonText] }, item.value.value))))))));
};
const getLabel = (item) => {
    return labels[item.value];
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    floatButtonText: {
        fontSize: 16,
        color: 'rgb(92, 92, 92)',
        textAlign: 'center'
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
    'Condoms': React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "C")),
    'Prep': React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "P")),
    'Bareback': React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "B")),
    'Treatment as Prevention': React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "T")),
    'Needs Discussion': React.createElement(View, { style: styles.label },
        React.createElement(TextBold, { style: styles.labelText }, "N"))
};
export default FieldCheckboxSafetyPractice;
//# sourceMappingURL=checkbox-safety-practice.js.map