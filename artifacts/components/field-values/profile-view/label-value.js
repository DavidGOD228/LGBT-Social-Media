import React from 'react';
import TextNormal from '../../global/text/basic/text-normal';
const FieldLabelValue = (props) => {
    const fieldValue = props.profileData.fieldValues.length > 0 ? props.profileData.fieldValues[0].value : '';
    return (React.createElement(TextNormal, null, fieldValue));
};
export default FieldLabelValue;
//# sourceMappingURL=label-value.js.map