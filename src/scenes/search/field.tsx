import React, {Component} from 'react'
import {View} from 'react-native'
import inputTypes from './field-component-map'
import ProfileSetupFieldEmpty from '../../components/field-values/empty'
import ProfileModel from '../../models/profile'
import ProfileDataModel from '../../models/field-data/profile-data'
import FieldBehaviour from './search-field/util/field-behaviour'
import SearchSubSectionModel from '../../models/search/search-sub-section'
import SearchSectionModel from '../../models/search/search-section'
import SearchFieldModel from '../../models/search/search-field'

interface Props {
  subSection: SearchSubSectionModel
  section: SearchSectionModel
  searchField: SearchFieldModel
  profile: ProfileModel
  restrictionMap: any
  userMetrics: string
}

interface State {
  profileData: ProfileDataModel
}

class FieldComponent extends Component<Props, State> {

  render() {

    return (
      <View>

        {/*field input*/}
        {this.props.searchField ? this.renderInput() : null}

      </View>
    )
  }

  private renderInput = () => {
    const {searchField, userMetrics} = this.props

    const inputComponent = inputTypes[this.props.searchField.field.type] || ProfileSetupFieldEmpty
    const updateCallback = FieldBehaviour.UPDATE_STRATEGY[this.props.searchField.field.type] || (a => a)
    const valuesCallback = FieldBehaviour.VALUES_STRATEGY[this.props.searchField.field.type] || (() => [])

    const optionCallback = FieldBehaviour.OPTIONS[this.props.searchField.field.type]

    const options = optionCallback && optionCallback(searchField, userMetrics)

    return inputComponent({
      ...options,
      value: valuesCallback(searchField, this.props.restrictionMap, userMetrics),
      onUpdate: updateCallback(this, searchField, this.props.restrictionMap, userMetrics),
      key: searchField.id
    })
  }
}

export default FieldComponent
