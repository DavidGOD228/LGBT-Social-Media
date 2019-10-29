import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextNormal from './global/text/basic/text-normal';
import UiBlockHorizontalCenter from './ui/block/horizontal-center';
import UiBlockSpace from './ui/block/space';
const CommunityHeaderAdjust = (props) => React.createElement(View, { style: styles.container },
    React.createElement(TextNormal, { style: styles.text },
        "Your search resulted in ",
        props.resultCount,
        " people near your location"),
    React.createElement(UiBlockSpace, { height: 5 }),
    React.createElement(UiBlockHorizontalCenter, null,
        React.createElement(TouchableOpacity, { onPress: props.onAdjustPressed },
            React.createElement(TextNormal, { style: styles.refreshText }, "Adjust your filters"))));
const styles = {
    container: {
        paddingTop: 25,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        backgroundColor: "#E7EBEF"
    },
    text: {
        color: "#4A4A4A",
        fontSize: 14,
        textAlign: "center",
        paddingRight: 60,
        paddingLeft: 60
    },
    refreshText: {
        color: "#4A90E2",
        textAlign: "center"
    }
};
export default CommunityHeaderAdjust;
//# sourceMappingURL=community-header-adjust.js.map