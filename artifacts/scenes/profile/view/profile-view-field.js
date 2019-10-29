import React, { Component } from 'react';
import { View } from 'react-native';
import fieldTypes from './profile-view-field-map';
import UiBlockSpace from '../../../components/ui/block/space';
export default class ProfileViewField extends Component {
    constructor() {
        super(...arguments);
        this.extractProfileDataForField = () => {
            return this.props.profileData.filter(data => data.field.id === this.props.profileViewField.field.id)[0];
        };
        this.renderInput = (fieldProfileData) => {
            const inputComponent = fieldTypes[fieldProfileData.field.type];
            return inputComponent({
                profileViewField: this.props.profileViewField,
                profileData: fieldProfileData
            });
        };
    }
    render() {
        if (!this.extractProfileDataForField()) {
            return null;
        }
        return (React.createElement(View, null,
            this.renderInput(this.extractProfileDataForField()),
            React.createElement(UiBlockSpace, { height: 15 })));
    }
}
//# sourceMappingURL=profile-view-field.js.map