import React from 'react';
import { View } from 'react-native';
import CollapsingSection from '../../components/collapsing-section';
import UiBlockSpace from '../../components/ui/block/space';
import { comparator } from '../../utils/number';
import SubSectionComponent from './sub-section';
import { capitalize, decamelize } from "../../utils/string";
const filterTextFields = (subSection) => {
    const searchField = subSection.searchFields[0];
    return searchField.field.type !== 'TEXT';
};
const SectionComponent = (props) => {
    const { section, profile, userMetrics } = props;
    return (React.createElement(View, null,
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(CollapsingSection, { showChildren: true, title: capitalize(decamelize(section.name, ' ')), completed: false }, section.searchSubSections
            .filter(filterTextFields)
            .sort(comparator)
            .map(subSection => React.createElement(SubSectionComponent, { restrictionMap: props.restrictionMap, profile: profile, subSection: subSection, section: section, key: subSection.id, userMetrics: userMetrics })))));
};
export default SectionComponent;
//# sourceMappingURL=section.js.map