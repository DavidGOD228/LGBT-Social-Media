import React from 'react';
import { View } from 'react-native';
import TextNormal from '../global/text/basic/text-normal';
const FieldValueEmpty = ({ field }) => (React.createElement(View, { key: field.id },
    React.createElement(TextNormal, null, JSON.stringify(field))));
export default FieldValueEmpty;
//# sourceMappingURL=empty.js.map