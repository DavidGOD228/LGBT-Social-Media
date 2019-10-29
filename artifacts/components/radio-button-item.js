import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import TextNormal from './global/text/basic/text-normal';
import { PROFILE_SEX_ROLE } from '../configs/dicts';
const RadioButtonItem = ({ item, onPress }) => (React.createElement(TouchableOpacity, { onPress: onPress, style: styles.container },
    React.createElement(Image, { source: PROFILE_SEX_ROLE[item.value.value] }),
    React.createElement(TextNormal, { style: item.isSelected ? styles.textSelected : styles.text }, item.title || item.value || item)));
export default RadioButtonItem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10
    },
    textSelected: {
        fontSize: 15,
        paddingLeft: 10,
        color: 'rgb(77, 146, 223)'
    },
    text: {
        fontSize: 15,
        paddingLeft: 10,
        color: 'rgb(92, 92, 92)'
    }
});
//# sourceMappingURL=radio-button-item.js.map