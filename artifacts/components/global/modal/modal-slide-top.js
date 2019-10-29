import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
var View = Animated.View;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default class ModalSlideTop extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = (visible) => {
            if (visible) {
                this.showModal();
            }
            else {
                this.hideModal();
            }
        };
        this.showModal = () => {
            Animated.timing(this.state.modalY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        };
        this.hideModal = () => {
            Animated.timing(this.state.modalY, {
                toValue: -windowHeight,
                duration: 300,
                useNativeDriver: true
            }).start();
        };
        this.state = {
            modalY: new Animated.Value(-windowHeight)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            this.toggleModal(nextProps.visible);
        }
    }
    render() {
        return (React.createElement(View, { style: [styles.modal, { transform: [{ translateY: this.state.modalY }] }] }, this.props.children));
    }
}
const styles = StyleSheet.create({
    modal: {
        zIndex: 20,
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowWidth,
        height: windowHeight
    }
});
//# sourceMappingURL=modal-slide-top.js.map