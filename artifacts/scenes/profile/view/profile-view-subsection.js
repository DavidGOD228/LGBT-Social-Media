import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileViewField from './profile-view-field';
import { comparator } from '../../../utils/number';
export default class ProfileViewSubSection extends Component {
    render() {
        return React.createElement(View, null,
            React.createElement(View, { style: styles.container }, this.props.children
                .sort(comparator)
                .map(profileViewField => (React.createElement(ProfileViewField, { key: profileViewField.field.name, profileViewField: profileViewField, profileData: this.props.profileData })))));
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5
    }
});
//# sourceMappingURL=profile-view-subsection.js.map