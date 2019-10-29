import React from 'react';
import { View } from 'react-native';
import CollapsingSubSection from '../../components/collapsing-sub-section';
import FieldComponent from './field';
import { capitalize, decamelize } from '../../utils/string';
const NAMES = {
    WhenWhere: "When / Where"
};
const SubSectionComponent = ({ subSection, section, profile, restrictionMap, userMetrics }) => (React.createElement(View, null,
    React.createElement(CollapsingSubSection, { showChildren: false, title: NAMES[subSection.name] || capitalize(decamelize(subSection.name, ' ')) }, subSection.searchFields.map(searchField => React.createElement(FieldComponent, { restrictionMap: restrictionMap, section: section, profile: profile, subSection: subSection, searchField: searchField, key: searchField.id, userMetrics: userMetrics })))));
export default SubSectionComponent;
//# sourceMappingURL=sub-section.js.map