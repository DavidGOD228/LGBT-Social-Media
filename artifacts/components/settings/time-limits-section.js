import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import CollapsingSection from '../collapsing-section';
import i18n from '../../locales/i18n';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
import SettingsRadioButton from './radio-button';
import TwoValueSelector from '../two-value-selector';
import MultiSlider from 'react-native-multi-slider';
import WhiteMarker from '../global/multi-slider/white-marker';
import UiBlockHorizontalCenter from '../ui/block/horizontal-center';
import TextNormal from '../global/text/basic/text-normal';
export default class TimeLimitsSection extends Component {
    constructor(props) {
        super(props);
        this.measureSliderLength = (event) => {
            this.setState(Object.assign({}, this.state, { sliderLength: event.nativeEvent.layout.width }));
        };
        this.sliderChangeFinish = (values) => {
            const timeLimits = this.state.timeLimits;
            timeLimits.hours = values[0];
            this.setState(Object.assign({}, this.state, { timeLimits }));
            return this.props.timeLimitsChange(this.state.timeLimits);
        };
        this.onChanged = (value) => {
            const timeLimits = this.state.timeLimits;
            timeLimits.on = value;
            this.setState(Object.assign({}, this.state, { timeLimits }));
            return this.props.timeLimitsChange(this.state.timeLimits);
        };
        this.onTypeChange = (value) => {
            const timeLimits = this.state.timeLimits;
            if (timeLimits.timeLimitType !== value) {
                // Updating time limit preserving ratio
                timeLimits.hours = value === 'Daily' ? Math.round(timeLimits.hours / 7) || 1 : timeLimits.hours * 7;
            }
            timeLimits.timeLimitType = value;
            this.setState(Object.assign({}, this.state, { timeLimits }));
            return this.props.timeLimitsChange(this.state.timeLimits);
        };
        this.state = {
            sliderLength: Dimensions.get('window').width,
            timeLimits: {
                on: props.on,
                hours: props.hours,
                timeLimitType: props.timeLimitType
            }
        };
    }
    componentWillReceiveProps(props) {
        this.setState(Object.assign({}, this.state, { timeLimits: {
                on: props.on,
                hours: props.hours,
                timeLimitType: props.timeLimitType
            } }));
    }
    get minHours() {
        return 1;
    }
    get maxHours() {
        if (this.props.timeLimitType === 'Daily') {
            return 24;
        }
        return 168;
    }
    render() {
        return (React.createElement(CollapsingSection, { title: i18n.t('settings.timeLimits.sectionTitle'), completed: false, infoPressed: this.props.infoPressed },
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(UiBlockBasic, { style: styles.fieldsContainer },
                React.createElement(SettingsRadioButton, { value: this.state.timeLimits.on, onChange: this.onChanged },
                    React.createElement(TextNormal, null, i18n.t('settings.timeLimits.onOff'))),
                React.createElement(UiBlockSpace, { height: 20 })),
            React.createElement(TwoValueSelector, { valLeft: i18n.t('settings.timeLimits.daily'), valRight: i18n.t('settings.timeLimits.weekly'), selectedValue: this.state.timeLimits.timeLimitType, valSelected: this.onTypeChange }),
            React.createElement(View, { style: { flex: 1 }, onLayout: this.measureSliderLength },
                React.createElement(MultiSlider, { values: [this.props.hours || 1], min: this.minHours, max: this.maxHours, onValuesChangeFinish: this.sliderChangeFinish.bind(this), unselectedStyle: { backgroundColor: '#b9b9b9' }, selectedStyle: { backgroundColor: '#4990E2' }, containerStyle: {
                        height: 28,
                        marginTop: 35
                    }, trackStyle: { height: 3 }, customMarker: WhiteMarker, sliderLength: this.state.sliderLength }),
                React.createElement(UiBlockHorizontalCenter, null,
                    React.createElement(TextNormal, { style: styles.hours },
                        this.props.hours,
                        "hours/",
                        this.props.timeLimitType === 'Daily' ? 'day' : 'week'))),
            React.createElement(UiBlockSpace, { height: 15 })));
    }
}
const styles = StyleSheet.create({
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    fieldsContainer: {
        paddingLeft: 15,
        paddingRight: 7
    },
    hours: {
        fontSize: 26
    }
});
//# sourceMappingURL=time-limits-section.js.map