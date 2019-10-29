import React, {Component} from 'react'
import {View} from 'react-native'
import fieldTypes from './profile-view-field-map'
import UiBlockSpace from '../../../components/ui/block/space'
import ProfileDataModel from '../../../models/field-data/profile-data'
import ProfileViewFieldModel from '../../../models/profile-view/profile-view-field'

interface Props {
  profileViewField: ProfileViewFieldModel,
  profileData: ProfileDataModel[]
}

export default class ProfileViewField extends Component<Props, {}> {

  render() {

    if (!this.extractProfileDataForField()) {
      return null
    }

    return (
      <View>

        {/*field input*/}
        {this.renderInput(this.extractProfileDataForField())}
        <UiBlockSpace height={15}/>

      </View>
    )
  }

  private extractProfileDataForField = (): ProfileDataModel => {
    return this.props.profileData.filter(data => data.field.id === this.props.profileViewField.field.id)[0]
  }

  private renderInput = (fieldProfileData: ProfileDataModel) => {
    const inputComponent = fieldTypes[fieldProfileData.field.type]
    return inputComponent({
      profileViewField: this.props.profileViewField,
      profileData: fieldProfileData
    })
  }
}
