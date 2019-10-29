import React from 'react';
import { View } from 'react-native';
import i18n from '../../../../locales/i18n';
import CollapsingSection from '../../../../components/collapsing-section';
import UiBlockSpace from '../../../../components/ui/block/space';
import { comparator } from '../../../../utils/number';
import SubSectionComponent from './sub-section';
const SectionComponent = (props) => {
    const { section, profile, onDataChanged, sectionCompleted, onMetricChanged, metricsType } = props;
    return (React.createElement(View, null,
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(CollapsingSection, { title: i18n.t(`profile.details.sections.${section.name}.name`), completed: sectionCompleted }, section.subSections
            .sort(comparator)
            .map(subSection => React.createElement(SubSectionComponent, { profile: profile, subSection: subSection, metricsType: metricsType, section: section, key: subSection.id, onDataChanged: onDataChanged, onMetricChanged: onMetricChanged })))));
};
export default SectionComponent;
//# sourceMappingURL=section.js.map