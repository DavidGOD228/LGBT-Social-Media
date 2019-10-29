import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
const WhiteMarker = (props) => {
    return React.createElement(TouchableHighlight, null,
        React.createElement(View, { style: [props.markerStyle, styles.markerStyle] }));
};
const styles = StyleSheet.create({
    markerStyle: {
        height: 28,
        width: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.2
    },
    pressedMarkerStyle: {},
    disabled: {
        backgroundColor: '#d3d3d3'
    }
});
export default WhiteMarker;
//# sourceMappingURL=white-marker.js.map