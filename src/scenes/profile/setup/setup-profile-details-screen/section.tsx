import React from 'react'
import {View} from 'react-native'
import i18n from '../../../../locales/i18n'
import CollapsingSection from '../../../../components/collapsing-section'
import UiBlockSpace from '../../../../components/ui/block/space'
import SectionModel from '../../../../models/section'
import {comparator} from '../../../../utils/number'
import SubSectionComponent from './sub-section'
import ProfileModel from '../../../../models/profile'
import ProfileDataModel from '../../../../models/field-data/profile-data'

interface Props {
  section: SectionModel
  profile: ProfileModel
  sectionCompleted: boolean
  metricsType: string
  onDataChanged: (profileData: ProfileDataModel) => void
  onMetricChanged: (type: string) => void
}

const SectionComponent = (props: Props) => {

  const {section, profile, onDataChanged, sectionCompleted, onMetricChanged, metricsType} = props

  return (
    <View>
      <UiBlockSpace height={20}/>
      <CollapsingSection
        title={i18n.t(`profile.details.sections.${section.name}.name`)}
        completed={sectionCompleted}>

        {/*sub section list*/
        }
        {section.subSections
                .sort(comparator)
                .map(subSection =>
                    <SubSectionComponent
                      profile={profile}
                      subSection={subSection}
                      metricsType={metricsType}
                      section={section}
                      key={subSection.id}
                      onDataChanged={onDataChanged}
                      onMetricChanged={onMetricChanged}
                    />
                )
        }

      </CollapsingSection>
    </View>
  )
}

export default SectionComponent
