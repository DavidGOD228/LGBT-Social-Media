import React from 'react';
import { StyleSheet } from 'react-native';
import i18n from '../../locales/i18n';
import TwoValueSelector from '../two-value-selector';
import UiBlockBasic from '../ui/block/basic';
import LineFullWidth from '../global/line-full-width';
import UiBlockSpace from '../ui/block/space';
const MetricsSection = (props) => (React.createElement(UiBlockBasic, null,
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(UiBlockBasic, { style: styles.twoValueSwitcherContainer },
        React.createElement(TwoValueSelector, { valLeft: i18n.t('settings.metrics.imperial'), valRight: i18n.t('settings.metrics.metric'), selectedValue: props.metricsType, valSelected: props.onMetricsSelected })),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder })));
const styles = StyleSheet.create({
    twoValueSwitcherContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
});
export default MetricsSection;
//# sourceMappingURL=metrics-section.js.map