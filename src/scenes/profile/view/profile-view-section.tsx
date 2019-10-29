import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import UiBlockLeft from '../../../components/ui/block/left'
import ProfileViewSeparator from '../../../components/profile-view/profile-view-separator'
import UiBlockSpace from '../../../components/ui/block/space'
import TextBold from '../../../components/global/text/basic/text-bold'
import ProfileViewSubSection from './profile-view-subsection'
import ProfileViewSubSectionModel from '../../../models/profile-view/profile-view-sub-section'
import ProfileDataModel from '../../../models/field-data/profile-data'
import {
  capitalize,
  decamelize
} from '../../../utils/string'
import {comparator} from '../../../utils/number'

interface Props {
  title: string,
  children: ProfileViewSubSectionModel[],
  profileData: ProfileDataModel[],
}

export default class ProfileViewSection extends Component<Props, {}> {

  render() {

    if (this.props.profileData.length === 0) {
      return null
    }

    return <View pointerEvents="none">
      <View style={styles.container}>
        <UiBlockSpace height={15}/>
        <UiBlockLeft>
          <TextBold style={styles.title}>{capitalize(decamelize(this.props.title, ' '))}</TextBold>
        </UiBlockLeft>
        <UiBlockSpace height={10}/>
        {this.props.children && this.props.children
                                    .sort(comparator)
                                    .map(subSection => (
                                      <ProfileViewSubSection
                                        key={subSection.name}
                                        title={subSection.name}
                                        children={subSection.profileViewFields}
                                        profileData={this.props.profileData}
                                      />
                                    ))
        }
      </View>
      <ProfileViewSeparator/>
    </View>
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
})
