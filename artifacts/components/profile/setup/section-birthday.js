import React from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockLeft from '../../ui/block/left';
import UiBlockBottom from '../../ui/block/bottom';
import TextNormal from '../../global/text/basic/text-normal';
import UiBlockSpace from '../../ui/block/space';
import LineFullWidth from '../../global/line-full-width';
const ProfileSetupSectionBirthday = (props) => {
    const { birthay, onDateSelected } = props;
    return (React.createElement(UiBlockBasic, null,
        React.createElement(UiBlockLeft, null,
            React.createElement(UiBlockBasic, null,
                React.createElement(UiBlockBottom, null,
                    React.createElement(TextNormal, { style: styles.label }, "Birthday"))),
            React.createElement(DatePicker, { showIcon: false, customStyles: {
                    dateTouchBody: styles.dateTouchBody,
                    dateInput: styles.dateInput
                }, style: { flex: 1 }, date: birthay, mode: "date", androidMode: "spinner", format: "MMM DD YYYY", confirmBtnText: "Confirm", cancelBtnText: "Cancel", onDateChange: onDateSelected })),
        React.createElement(UiBlockSpace, { height: 3 }),
        React.createElement(LineFullWidth, { style: styles.line })));
};
const styles = StyleSheet.create({
    dateTouchBody: {
        height: 30
    },
    dateInput: {
        fontFamily: 'Uniform',
        fontSize: 16,
        height: 30,
        lineHeight: 32,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        color: 'rgb(46, 46, 46)'
    },
    label: {
        color: '#8C8C8C',
        paddingRight: 10
    },
    line: {
        backgroundColor: '#A6B4BD'
    }
});
export default ProfileSetupSectionBirthday;
//# sourceMappingURL=section-birthday.js.map