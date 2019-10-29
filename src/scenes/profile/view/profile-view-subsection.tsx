import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import ProfileViewField from './profile-view-field'
import ProfileViewFieldModel from '../../../models/profile-view/profile-view-field'
import ProfileDataModel from '../../../models/field-data/profile-data'
import {comparator} from '../../../utils/number'

interface Props {
  title: string,
  children: ProfileViewFieldModel[],
  profileData: ProfileDataModel[],
}

export default class ProfileViewSubSection extends Component<Props, {}> {

  render() {

    return <View>
      <View style={styles.container}>
        {this.props.children
             .sort(comparator)
             .map(profileViewField => (
               <ProfileViewField
                 key={profileViewField.field.name}
                 profileViewField={profileViewField}
                 profileData={this.props.profileData}
               />
             ))
        }
      </View>
    </View>
  }

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5
  }
})
