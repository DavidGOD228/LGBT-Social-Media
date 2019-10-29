import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockLeft from '../../ui/block/left';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockRight from '../../ui/block/right';
const renderPlaceholder = (props, dark) => {
    const { containerWidth, imageSelected, muslImagePicker } = props;
    return (React.createElement(TouchableOpacity, { onPress: () => muslImagePicker.pickImage(imageSelected) },
        React.createElement(View, { style: [styles.template, dark ? styles.templateDark : styles.templateLight, {
                    width: containerWidth / 2,
                    height: containerWidth / 2
                }] },
            React.createElement(Image, { source: require('Musl/images/profile/btn-photo-add.png') }))));
};
const renderUserImage = (props, imageNumber) => {
    const { containerWidth, images, onDeleteBtnPress } = props;
    return (React.createElement(Image, { style: {
            width: containerWidth / 2,
            height: containerWidth / 2
        }, source: { uri: images[imageNumber].mediaUrl } },
        React.createElement(UiBlockRight, null,
            React.createElement(TouchableOpacity, { style: styles.deleteBtn, onPress: () => {
                    onDeleteBtnPress(images[imageNumber]);
                } },
                React.createElement(Image, { style: styles.deleteBtnIcon, source: require('Musl/images/profile/icon-trash.png') })))));
};
const imageExist = (images, imageNumber) => {
    return images && images.length > imageNumber;
};
const renderImage = (props, imageNumber, dark) => {
    if (imageExist(props.images, imageNumber)) {
        return renderUserImage(props, imageNumber);
    }
    return renderPlaceholder(props, dark);
};
const renderImagesRow = (props, rowNumber) => {
    return (React.createElement(UiBlockLeft, { key: props.images && props.images[rowNumber] ? props.images[rowNumber].id : rowNumber },
        renderImage(props, rowNumber * 2, isEven(rowNumber)),
        renderImage(props, rowNumber * 2 + 1, !isEven(rowNumber))));
};
const isEven = (n) => {
    return n % 2 === 0;
};
const ProfileImages = (props) => {
    const rowsCount = props.imagesPlaces || 4 / 2;
    const rows = [];
    for (let i = 0; i < rowsCount; i++) {
        rows.push(renderImagesRow(props, i));
    }
    return (React.createElement(UiBlockBasic, null, rows));
};
const styles = StyleSheet.create({
    template: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    templateDark: {
        backgroundColor: '#CCCCCC'
    },
    templateLight: {
        backgroundColor: '#F2F2F2'
    },
    deleteBtn: {
        padding: 10
    },
    deleteBtnIcon: {
        width: 30,
        height: 30
    }
});
export default ProfileImages;
//# sourceMappingURL=profile-images.js.map