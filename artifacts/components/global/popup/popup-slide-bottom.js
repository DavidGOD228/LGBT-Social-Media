import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import ModalSlideBottom from '../modal/modal-slide-bottom';
var View = Animated.View;
import { globalParams } from '../../../assets/styles/style';
const PopupSlideBottom = ({ visible, style, children, countBottomPanel = true }) => (React.createElement(ModalSlideBottom, { visible: visible },
    React.createElement(View, { style: [styles.container, !countBottomPanel && { paddingBottom: 0 }] },
        React.createElement(View, { style: [styles.popup, style] }, children))));
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: globalParams.bottomPanelHeight
    },
    popup: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 0.6
    }
});
export default PopupSlideBottom;
//# sourceMappingURL=popup-slide-bottom.js.map