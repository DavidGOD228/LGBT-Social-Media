import React from 'react'
import {View} from 'react-native'
import CollapsingSection from '../../components/collapsing-section'
import UiBlockSpace from '../../components/ui/block/space'
import {comparator} from '../../utils/number'
import SubSectionComponent from './sub-section'
import ProfileModel from '../../models/profile'
import {
  capitalize,
  decamelize
} from "../../utils/string"
import SearchSectionModel from '../../models/search/search-section'

interface Props {
  section: SearchSectionModel
  profile: ProfileModel
  restrictionMap: any
  userMetrics: string
}

const filterTextFields = (subSection) => {
  const searchField = subSection.searchFields[0]
  return searchField.field.type !== 'TEXT'
}

const SectionComponent = (props: Props) => {

  const {section, profile, userMetrics} = props

  return (
    <View>
      <UiBlockSpace height={20}/>
      <CollapsingSection
        showChildren={true}
        title={capitalize(decamelize(section.name, ' '))}
        completed={false}>

        {/*sub section list*/}
        {section.searchSubSections
                .filter(filterTextFields)
                .sort(comparator)
                .map(subSection => <SubSectionComponent
                  restrictionMap={props.restrictionMap}
                  profile={profile}
                  subSection={subSection}
                  section={section}
                  key={subSection.id}
                  userMetrics={userMetrics}
                />)
        }

      </CollapsingSection>
    </View>
  )
}

export default SectionComponent
