import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    text: {
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(40, 98, 148)'
    },
    subtext: {
        marginLeft: 20,
        fontSize: 19,
        fontWeight: 'bold',
        color: 'rgb(93, 164, 229)'
    },
    photo: {
        marginLeft: 20,
        height: '100%',
        aspectRatio: 1,
        borderRadius: 20
    }
});
const UiProfileHubEmptyRow = ({ data, onClick }) => (React.createElement(TouchableOpacity, { style: styles.container, onPress: onClick },
    React.createElement(Image, { source: data.photo, style: styles.photo }),
    React.createElement(View, { style: styles.textView },
        React.createElement(Text, { style: styles.text }, data.name),
        React.createElement(Text, { style: styles.subtext }, "Create Profile"))));
export default UiProfileHubEmptyRow;
//# sourceMappingURL=empty-row.js.map