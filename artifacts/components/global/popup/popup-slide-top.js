import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import ModalSlideTop from '../modal/modal-slide-top';
var View = Animated.View;
const PopupSlideTop = (props) => (React.createElement(ModalSlideTop, { visible: props.visible },
    React.createElement(View, { style: styles.container },
        React.createElement(View, { style: [styles.popup, props.style] }, props.children))));
const styles = StyleSheet.create({
    container: {
        zIndex: 20,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    popup: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
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
export default PopupSlideTop;
//# sourceMappingURL=popup-slide-top.js.map