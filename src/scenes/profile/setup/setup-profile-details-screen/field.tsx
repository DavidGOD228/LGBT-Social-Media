import React, {Component} from 'react'
import {Alert,View} from 'react-native'
import SubSectionModel from '../../../../models/sub-section'
import FieldModel from '../../../../models/field'
import inputTypes from './field-component-map'
import ProfileSetupFieldEmpty from '../../../../components/field-values/empty'
import ProfileModel from '../../../../models/profile'
import ProfileDataModel from '../../../../models/field-data/profile-data'
import SectionModel from '../../../../models/section'
import FieldValueModel from '../../../../models/field-value'
import {ProfileDataService} from '../../../../services/profile-data'
import {lazy} from '../../../../annotations/inversify'

interface Props {
  subSection: SubSectionModel
  section: SectionModel
  field: FieldModel
  profile: ProfileModel,
  onFieldUpdated: (profileData: ProfileDataModel) => void,
  metricsType: string
}

interface State {
  profileData?: ProfileDataModel
}

class FieldComponent extends Component<Props, State> {

  @lazy('ProfileDataService')
  private profileDataService: ProfileDataService

  constructor(props: Props) {
    super(props)

    this.state = {}

    this.profileDataService.getForField(props.field, props.profile)
        .then(profileData => this.setState(prevState => ({
          ...prevState,
          profileData
        })))
  }

  updateFieldValue = (value: FieldValueModel[]): Promise<ProfileDataModel> => {
    console.log(value, 'VALUE========================================================', this.props.field.type)
    const profileData = this.state.profileData
    if (!profileData) {
      throw new Error('no profile data')
    }

    profileData.fieldValues = value
    this.forceUpdate()
    this.props.onFieldUpdated(profileData)
    return profileData.save()
  }
  onCloseModal = (date: any) => {
    setTimeout(() => {
      Alert.alert(
        'Hi there,',
  `In order to use MUSL you must be at least
            18 years of age (or legal age in your country).`,
        [
          {
            text: 'ОК',
            onPress: () => console.log('Change date'),
            style: 'cancel',
          },
        ],
      );
    }, 1000)
    console.log(date , "DATE STRING???????????????");
  }

  render() {

    return (
      <View>

        {/*field input*/}
        {this.state.profileData ? this.renderInput(this.state.profileData) : null}

      </View>
    )
  }

  private renderInput = (profileData: ProfileDataModel) => {
    const inputComponent = profileData && inputTypes[this.props.field.type] ? inputTypes[this.props.field.type] : ProfileSetupFieldEmpty
    return inputComponent({
      profileType: this.props.profile.profileType.code,
      fieldData: profileData,
      field: this.props.field,
      section: this.props.section,
      subSection: this.props.subSection,
      onValueUpdated: this.updateFieldValue,
      key: this.props.field.id,
      metricsType: this.props.metricsType,
      onCloseModal: this.onCloseModal
    })
  }
}

export default FieldComponent
