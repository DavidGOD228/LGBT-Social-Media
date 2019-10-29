import React from 'react';
import { StyleSheet } from 'react-native';
import CollapsingSection from '../collapsing-section';
import i18n from '../../locales/i18n';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
import SettingsRadioButton from './radio-button';
import TextNormal from '../global/text/basic/text-normal';
const AlertsSection = (props) => (React.createElement(CollapsingSection, { title: i18n.t('settings.alerts.sectionTitle'), infoPressed: props.infoPressed, completed: false },
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(UiBlockBasic, { style: styles.fieldsContainer },
        React.createElement(SettingsRadioButton, { value: props.alerts.notifications, onChange: val => props.alertsNotificationsChanged(val) },
            React.createElement(TextNormal, null, i18n.t('settings.alerts.notifications'))),
        React.createElement(UiBlockSpace, { height: 10 }),
        React.createElement(SettingsRadioButton, { value: props.alerts.sound, onChange: val => props.alertsSoundChanged(val) },
            React.createElement(TextNormal, null, i18n.t('settings.alerts.sound'))))));
const styles = StyleSheet.create({
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    fieldsContainer: {
        paddingLeft: 15,
        paddingRight: 7
    }
});
export default AlertsSection;
//# sourceMappingURL=alerts-section.js.map