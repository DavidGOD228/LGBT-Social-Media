import React from 'react';
import TextNormal from '../../global/text/basic/text-normal';
import { StyleSheet, View } from 'react-native';
import SelectableButtonsList from '../../selectable-buttons-list';
import UiBlockBasic from '../../ui/block/basic';
import { capitalize, decamelize } from '../../../utils/string';
import UiBlockSpace from '../../ui/block/space';
const FieldCheckboxBlue = (props) => {
    const fieldTitle = props.profileViewField.name ? capitalize(decamelize(props.profileViewField.name, ' ')) : '';
    const items = props.profileData.fieldValues.map(fieldValue => ({
        value: fieldValue,
        title: fieldValue.value,
        isSelected: true,
        key: fieldValue.value
    }));
    return (React.createElement(UiBlockBasic, null,
        React.createElement(View, { style: styles.container },
            props.profileViewField.name !== 'HesLookingFor' ? (React.createElement(UiBlockBasic, null,
                React.createElement(TextNormal, null,
                    fieldTitle,
                    ":"),
                React.createElement(UiBlockSpace, { height: 3 }))) : (null),
            React.createElement(SelectableButtonsList, { items: items, onItemSelected: (item) => {
                    console.log(item.value);
                } }))));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
});
export default FieldCheckboxBlue;
//# sourceMappingURL=checkbox-blue.js.map