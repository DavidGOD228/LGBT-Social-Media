import React, { Component } from 'react';
import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import PhotoView from 'react-native-photo-view';
export default class ProfileViewPhoto extends Component {
    constructor(props) {
        super(props);
        this.togglePicture = () => {
            this.setState(prevState => (Object.assign({}, this.state, { showPicture: !prevState.showPicture })));
        };
        this.state = {
            showPicture: false
        };
    }
    render() {
        const { data, position } = this.props;
        return (React.createElement(View, { style: [styles.photoContainer, position === 0 && styles.firstPhotoContainer] },
            React.createElement(TouchableOpacity, { onPress: this.togglePicture },
                React.createElement(Image, { source: data.photo, style: [styles.photo, position === 0 && styles.firstPhoto] })),
            React.createElement(Modal, { visible: this.state.showPicture, transparent: false, onRequestClose: this.togglePicture },
                React.createElement(PhotoView, { style: { flex: 1 }, source: data.photo }),
                React.createElement(TouchableOpacity, { style: styles.closeBtn, onPress: this.togglePicture },
                    React.createElement(Image, { source: require('Musl/images/global/btn-close.png') })))));
    }
}
const styles = StyleSheet.create({
    photoContainer: {
        margin: 0,
        padding: 0,
        height: '100%',
        width: Dimensions.get('window').width,
    },
    firstPhotoContainer: {
        width: Dimensions.get('window').width - 50,
    },
    photo: {
        height: '100%',
        width: Dimensions.get('window').width,
    },
    firstPhoto: {
        width: Dimensions.get('window').width - 50,
    },
    closeBtn: {
        position: 'absolute',
        right: 15,
        bottom: 8
    }
});
//# sourceMappingURL=profile-view-photo.js.map