import React from 'react';
import TextNormal from '../../global/text/basic/text-normal';
import { StyleSheet, View } from 'react-native';
import UiBlockSpace from '../../ui/block/space';
import { capitalize, decamelize } from '../../../utils/string';
const FieldLabelTitleValue = (props) => {
    const fieldTitle = props.profileData.field.name ? props.profileData.field.name : '';
    const fieldValue = props.profileData.fieldValues.length > 0 ? props.profileData.fieldValues[0].value : '';
    return React.createElement(View, { style: styles.container },
        React.createElement(TextNormal, null,
            capitalize(decamelize(fieldTitle, ' ')),
            ":"),
        React.createElement(UiBlockSpace, { height: 5 }),
        React.createElement(TextNormal, null, fieldValue));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
});
export default FieldLabelTitleValue;
//# sourceMappingURL=label-title-value.js.map