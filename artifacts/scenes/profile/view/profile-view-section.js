import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import UiBlockLeft from '../../../components/ui/block/left';
import ProfileViewSeparator from '../../../components/profile-view/profile-view-separator';
import UiBlockSpace from '../../../components/ui/block/space';
import TextBold from '../../../components/global/text/basic/text-bold';
import ProfileViewSubSection from './profile-view-subsection';
import { capitalize, decamelize } from '../../../utils/string';
import { comparator } from '../../../utils/number';
export default class ProfileViewSection extends Component {
    render() {
        if (this.props.profileData.length === 0) {
            return null;
        }
        return React.createElement(View, { pointerEvents: "none" },
            React.createElement(View, { style: styles.container },
                React.createElement(UiBlockSpace, { height: 15 }),
                React.createElement(UiBlockLeft, null,
                    React.createElement(TextBold, { style: styles.title }, capitalize(decamelize(this.props.title, ' ')))),
                React.createElement(UiBlockSpace, { height: 10 }),
                this.props.children && this.props.children
                    .sort(comparator)
                    .map(subSection => (React.createElement(ProfileViewSubSection, { key: subSection.name, title: subSection.name, children: subSection.profileViewFields, profileData: this.props.profileData })))),
            React.createElement(ProfileViewSeparator, null));
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5
    },
    title: {
        color: 'black'
    }
});
//# sourceMappingURL=profile-view-section.js.map