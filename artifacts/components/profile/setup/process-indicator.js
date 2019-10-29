import React from 'react';
import { Image, StyleSheet } from 'react-native';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockLeft from '../../ui/block/left';
import UiBlockVerticalCenter from '../../ui/block/vertical-center';
import TextLight from '../../global/text/basic/text-light';
import UiBlockSpace from '../../ui/block/space';
import ProgressBar from '../../global/progress-bar';
const ProfileSetupProcessIndicator = ({ profileComplete = 0, profileLabel, profileText = '' }) => (React.createElement(UiBlockBasic, null,
    React.createElement(UiBlockLeft, null,
        React.createElement(UiBlockBasic, null,
            React.createElement(UiBlockVerticalCenter, null,
                React.createElement(Image, { style: styles.processLabel, source: profileLabel }))),
        React.createElement(UiBlockBasic, { style: { flex: 1 } },
            React.createElement(UiBlockVerticalCenter, null,
                React.createElement(TextLight, { style: styles.processText }, profileText)))),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(ProgressBar, { percent: profileComplete })));
export default ProfileSetupProcessIndicator;
const styles = StyleSheet.create({
    processText: {
        fontSize: 30,
        paddingLeft: 15
    },
    processLabel: {
        width: 47,
        height: 47
    },
});
//# sourceMappingURL=process-indicator.js.map