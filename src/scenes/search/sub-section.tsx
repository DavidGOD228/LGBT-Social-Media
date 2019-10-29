import React from 'react'
import {View} from 'react-native'
import CollapsingSubSection from '../../components/collapsing-sub-section'
import FieldComponent from './field'
import ProfileModel from '../../models/profile'
import {
  capitalize,
  decamelize
} from '../../utils/string'
import SearchSubSectionModel from '../../models/search/search-sub-section'
import SearchSectionModel from '../../models/search/search-section'

interface Props {
  subSection: SearchSubSectionModel
  section: SearchSectionModel
  profile: ProfileModel
  restrictionMap: any
  userMetrics: string
}

const NAMES = {
  WhenWhere: "When / Where"
}

const SubSectionComponent = ({subSection, section, profile, restrictionMap, userMetrics}: Props) => (
  <View>
    <CollapsingSubSection
      showChildren={false}
      title={NAMES[subSection.name] || capitalize(decamelize(subSection.name, ' '))}
    >

      {/*field list*/}
      {subSection.searchFields.map(searchField => <FieldComponent
        restrictionMap={restrictionMap}
        section={section}
        profile={profile}
        subSection={subSection}
        searchField={searchField}
        key={searchField.id}
        userMetrics={userMetrics}
      />)}
    </CollapsingSubSection>
  </View>
)

export default SubSectionComponent
