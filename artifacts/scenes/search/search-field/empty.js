import React from 'react';
import { View } from 'react-native';
import TextNormal from '../../../components/global/text/basic/text-normal';
const FieldValueEmpty = ({ field }) => (React.createElement(View, null,
    React.createElement(TextNormal, null,
        "input here ",
        field.fieldValues[0].value)));
export default FieldValueEmpty;
//# sourceMappingURL=empty.js.map