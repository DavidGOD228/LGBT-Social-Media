import React from 'react';
import { View } from 'react-native';
import i18n from '../../../../locales/i18n';
import CollapsingSubSection from '../../../../components/collapsing-sub-section';
import FieldComponent from './field';
import { comparator } from '../../../../utils/number';
import MetricsSection from "../../../../components/settings/metrics-section";
const getSubSectionName = (sectionName, subSectionName, profileType) => {
    return i18n.t(`profile.details.sections.${sectionName}.subSections.${subSectionName}.name${profileType}`, {
        defaults: [{
                scope: `profile.details.sections.${sectionName}.subSections.${subSectionName}.name`
            }]
    });
};
const SubSectionComponent = ({ subSection, section, profile, onDataChanged, onMetricChanged, metricsType }) => {
    console.log(subSection.name, 'subSection.name================');
    return (React.createElement(View, { key: subSection.id },
        React.createElement(CollapsingSubSection, { showChildren: true, title: getSubSectionName(section.name, subSection.name, profile.profileType.code) },
            subSection.name === 'Details' && (profile.profileType.code === 'FUN' || profile.profileType.code === 'FLIRT') ?
                React.createElement(MetricsSection, { key: subSection.id, metricsType: metricsType, onMetricsSelected: onMetricChanged })
                : null,
            subSection.fields
                .sort(comparator)
                .map((field, i) => React.createElement(FieldComponent, { section: section, profile: profile, subSection: subSection, field: field, key: i, onFieldUpdated: onDataChanged, metricsType: metricsType })))));
};
export default SubSectionComponent;
//# sourceMappingURL=sub-section.js.map