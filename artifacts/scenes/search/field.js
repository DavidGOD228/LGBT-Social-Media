import React, { Component } from 'react';
import { View } from 'react-native';
import inputTypes from './field-component-map';
import ProfileSetupFieldEmpty from '../../components/field-values/empty';
import FieldBehaviour from './search-field/util/field-behaviour';
class FieldComponent extends Component {
    constructor() {
        super(...arguments);
        this.renderInput = () => {
            const { searchField, userMetrics } = this.props;
            const inputComponent = inputTypes[this.props.searchField.field.type] || ProfileSetupFieldEmpty;
            const updateCallback = FieldBehaviour.UPDATE_STRATEGY[this.props.searchField.field.type] || (a => a);
            const valuesCallback = FieldBehaviour.VALUES_STRATEGY[this.props.searchField.field.type] || (() => []);
            const optionCallback = FieldBehaviour.OPTIONS[this.props.searchField.field.type];
            const options = optionCallback && optionCallback(searchField, userMetrics);
            return inputComponent(Object.assign({}, options, { value: valuesCallback(searchField, this.props.restrictionMap, userMetrics), onUpdate: updateCallback(this, searchField, this.props.restrictionMap, userMetrics), key: searchField.id }));
        };
    }
    render() {
        return (React.createElement(View, null, this.props.searchField ? this.renderInput() : null));
    }
}
export default FieldComponent;
//# sourceMappingURL=field.js.map