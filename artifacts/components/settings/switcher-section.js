import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import UiBlockBasic from '../ui/block/basic';
import UiBlockSpace from '../ui/block/space';
import LineFullWidth from '../global/line-full-width';
import i18n from '../../locales/i18n';
import SettingsRadioButton from './radio-button';
import TextBold from '../global/text/basic/text-bold';
const SwitcherSection = ({ usePhotos = false, onChangeUsePhotos, onInfoPress }) => (React.createElement(UiBlockBasic, null,
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(SettingsRadioButton, { value: usePhotos, onChange: onChangeUsePhotos },
        React.createElement(UiBlockBasic, null,
            React.createElement(TextBold, null, i18n.t('settings.switcher.usePhotos')),
            React.createElement(TouchableOpacity, { style: styles.infoIcon, onPress: onInfoPress },
                React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') })))),
    React.createElement(UiBlockSpace, { height: 10 }),
    React.createElement(LineFullWidth, { style: styles.titleBottomBorder })));
const styles = StyleSheet.create({
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    infoIcon: {
        position: 'absolute',
        top: -7,
        right: -30
    }
});
export default SwitcherSection;
//# sourceMappingURL=switcher-section.js.map