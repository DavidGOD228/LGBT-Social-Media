import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextBold from '../global/text/basic/text-bold';
const NewItemsLabel = (props) => (React.createElement(View, { style: [styles.label, props.style] },
    React.createElement(TextBold, { style: styles.labelText }, props.children)));
const styles = StyleSheet.create({
    label: {
        position: 'absolute',
        height: 19,
        minWidth: 19,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CE0B24'
    },
    labelText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    }
});
export default NewItemsLabel;
//# sourceMappingURL=new-items-label.js.map