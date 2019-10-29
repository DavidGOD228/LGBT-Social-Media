import React from 'react'
import {View} from 'react-native'
import i18n from '../../../../locales/i18n'
import CollapsingSubSection from '../../../../components/collapsing-sub-section'
import SubSectionModel from '../../../../models/sub-section'
import SectionModel from '../../../../models/section'
import FieldComponent from './field'
import ProfileModel from '../../../../models/profile'
import ProfileDataModel from '../../../../models/field-data/profile-data'
import {comparator} from '../../../../utils/number'
import MetricsSection from "../../../../components/settings/metrics-section";

interface Props {
  subSection: SubSectionModel,
  section: SectionModel,
  profile: ProfileModel,
  onDataChanged: (profileData: ProfileDataModel) => void
  onMetricChanged: (type: string) => void
  metricsType: string
}

const getSubSectionName = (sectionName: string, subSectionName: string, profileType: string): string => {

  return i18n.t(`profile.details.sections.${sectionName}.subSections.${subSectionName}.name${profileType}`,
    {
      defaults: [{
        scope: `profile.details.sections.${sectionName}.subSections.${subSectionName}.name`
      }]
    })
}

const SubSectionComponent = ({subSection, section, profile, onDataChanged, onMetricChanged, metricsType}: Props) => {
  console.log(subSection.name, 'subSection.name================')
  return (
    <View key={subSection.id}>
      <CollapsingSubSection
        showChildren={true}
        title={getSubSectionName(section.name, subSection.name, profile.profileType.code)}
      >
        {
          subSection.name === 'Details' && (profile.profileType.code === 'FUN' || profile.profileType.code === 'FLIRT') ?
          <MetricsSection key={subSection.id} metricsType={metricsType} onMetricsSelected={onMetricChanged}/>
          : null
        }
        {/*field list*/}
        {subSection.fields
                   .sort(comparator)
                   .map((field, i) => <FieldComponent
                     section={section}
                     profile={profile}
                     subSection={subSection}
                     field={field}
                     key={i}
                     onFieldUpdated={onDataChanged}
                     metricsType={metricsType}
                   />)}
      </CollapsingSubSection>
    </View>
  )
}

export default SubSectionComponent
