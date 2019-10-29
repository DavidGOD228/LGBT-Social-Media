import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import TextBold from '../../global/text/basic/text-bold';
import TextNormal from '../../global/text/basic/text-normal';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textView: {
        marginLeft: 10,
        flex: 1
    },
    text: {
        fontSize: 16,
        color: 'white'
    },
    photo: {
        height: '100%',
        aspectRatio: 1
    }
});
const UiProfileHubModalRow = ({ data }) => (React.createElement(View, { style: styles.container },
    React.createElement(Image, { source: data.photo, style: styles.photo }),
    React.createElement(View, { style: styles.textView },
        React.createElement(TextBold, { style: styles.text },
            data.name,
            React.createElement(TextNormal, { style: styles.text }, data.description)))));
export default UiProfileHubModalRow;
//# sourceMappingURL=profile-hub-modal-row.js.map