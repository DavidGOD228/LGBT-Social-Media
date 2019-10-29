import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CollapsingSection from '../collapsing-section';
import i18n from '../../locales/i18n';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import UiBlockBasic from '../ui/block/basic';
import SettingsRadioButton from './radio-button';
import UiBlockHorizontalEdges from '../ui/block/horizontal-edges';
import TextNormal from '../global/text/basic/text-normal';
const QuietHoursSection = (props) => (React.createElement(CollapsingSection, { title: i18n.t('settings.quietHours.sectionTitle'), completed: false, infoPressed: props.onInfoPress },
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(UiBlockBasic, { style: styles.fieldsContainer },
        React.createElement(SettingsRadioButton, { value: props.quietHours.on, onChange: val => props.onQuietHoursToggle(val) },
            React.createElement(TextNormal, null, i18n.t('settings.quietHours.onOff'))),
        React.createElement(UiBlockSpace, { height: 20 }),
        React.createElement(UiBlockHorizontalEdges, null,
            React.createElement(UiBlockBasic, null,
                React.createElement(TouchableOpacity, { onPress: props.onTimeStartPress },
                    React.createElement(TextNormal, null, "Begin"),
                    React.createElement(UiBlockSpace, { height: 10 }),
                    React.createElement(TextNormal, { style: styles.timeValue }, props.quietHours.timeStart.getTimeToDisplay()))),
            React.createElement(UiBlockBasic, { style: { alignItems: 'flex-end' } },
                React.createElement(TouchableOpacity, { onPress: props.onTimeEndPress },
                    React.createElement(TextNormal, null, "End"),
                    React.createElement(UiBlockSpace, { height: 10 }),
                    React.createElement(TextNormal, { style: styles.timeValue }, props.quietHours.timeEnd.getTimeToDisplay())))))));
const styles = StyleSheet.create({
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    fieldsContainer: {
        paddingLeft: 15,
        paddingRight: 7
    },
    timeValue: {
        fontSize: 26
    }
});
export default QuietHoursSection;
//# sourceMappingURL=quiet-hours-section.js.map