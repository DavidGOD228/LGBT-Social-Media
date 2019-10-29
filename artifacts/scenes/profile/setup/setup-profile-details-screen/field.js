var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import inputTypes from './field-component-map';
import ProfileSetupFieldEmpty from '../../../../components/field-values/empty';
import { ProfileDataService } from '../../../../services/profile-data';
import { lazy } from '../../../../annotations/inversify';
class FieldComponent extends Component {
    constructor(props) {
        super(props);
        this.updateFieldValue = (value) => {
            console.log(value, 'VALUE========================================================', this.props.field.type);
            const profileData = this.state.profileData;
            if (!profileData) {
                throw new Error('no profile data');
            }
            profileData.fieldValues = value;
            this.forceUpdate();
            this.props.onFieldUpdated(profileData);
            return profileData.save();
        };
        this.onCloseModal = (date) => {
            setTimeout(() => {
                Alert.alert('Hi there,', `In order to use MUSL you must be at least
            18 years of age (or legal age in your country).`, [
                    {
                        text: 'ОК',
                        onPress: () => console.log('Change date'),
                        style: 'cancel',
                    },
                ]);
            }, 1000);
            console.log(date, "DATE STRING???????????????");
        };
        this.renderInput = (profileData) => {
            const inputComponent = profileData && inputTypes[this.props.field.type] ? inputTypes[this.props.field.type] : ProfileSetupFieldEmpty;
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
            });
        };
        this.state = {};
        this.profileDataService.getForField(props.field, props.profile)
            .then(profileData => this.setState(prevState => (Object.assign({}, prevState, { profileData }))));
    }
    render() {
        return (React.createElement(View, null, this.state.profileData ? this.renderInput(this.state.profileData) : null));
    }
}
__decorate([
    lazy('ProfileDataService'),
    __metadata("design:type", ProfileDataService)
], FieldComponent.prototype, "profileDataService", void 0);
export default FieldComponent;
//# sourceMappingURL=field.js.map