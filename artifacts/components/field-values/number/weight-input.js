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
import { LocalSettingsService } from '../../../services/local-settings';
import { lazy } from '../../../annotations/inversify';
import WeightInputMetric from './weight-input-metric';
import WeightInputImperial from './weight-input-imperial';
class WeightInputStateful extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.state);
        this.localSettingsService.getUserMetrics()
            .then(val => this.setState(Object.assign({}, this.state, { metrics: props.metricsType || val })));
    }
    render() {
        const { fieldData, persist, metricsType } = this.props;
        if (metricsType === 'Metric') {
            return (React.createElement(WeightInputMetric, { fieldData: fieldData, metrics: metricsType, persist: persist }));
        }
        return (React.createElement(WeightInputImperial, { fieldData: fieldData, metrics: metricsType, persist: persist }));
    }
}
__decorate([
    lazy('LocalSettingsService'),
    __metadata("design:type", LocalSettingsService)
], WeightInputStateful.prototype, "localSettingsService", void 0);
const WeightInput = ({ fieldData, persist, metrics, metricsType }) => (React.createElement(WeightInputStateful, { fieldData: fieldData, metrics: metrics, persist: persist, metricsType: metricsType }));
export default WeightInput;
//# sourceMappingURL=weight-input.js.map