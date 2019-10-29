import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import UiBlockRight from '../ui/block/right';
const SettingsRadioButton = (props) => (React.createElement(UiBlockRight, null,
    React.createElement(View, { style: styles.textContainer }, props.children),
    React.createElement(Switch, { value: props.value, onValueChange: props.onChange })));
const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
export default SettingsRadioButton;
//# sourceMappingURL=radio-button.js.map