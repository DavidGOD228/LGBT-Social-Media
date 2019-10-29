import { ActionSheetIOS, Alert, Platform } from 'react-native';
import i18n from '../locales/i18n';
import ImagePicker from './media-picker';
import { itemToCollection } from './array-utils';
export default class MuslImagePicker {
    constructor() {
        this.imagePickerOptions = {
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000
        };
        this.pickImage = (onImageSelected, options) => {
            if (options) {
                this.imagePickerOptions = options;
            }
            this.imageSelected = onImageSelected;
            this.chooseImageSource();
        };
        this.chooseImageSource = () => {
            this.chooseImageSourceAndroid();
            this.chooseImageSourceIOS();
        };
        this.chooseImageSourceAndroid = () => {
            if (Platform.OS === 'android') {
                Alert.alert(i18n.t('profile.setup.selectImageDialogTitle'), i18n.t('profile.setup.selectImageDialogMessage'), [
                    {
                        text: i18n.t('profile.setup.selectImageGallery'),
                        onPress: this.pickFromGallery
                    },
                    {
                        text: i18n.t('profile.setup.selectImageCamera'),
                        onPress: this.pickFromCamera
                    }
                ]);
            }
        };
        this.chooseImageSourceIOS = () => {
            if (Platform.OS === 'ios') {
                ActionSheetIOS.showActionSheetWithOptions({
                    title: i18n.t('profile.setup.selectImageDialogTitle'),
                    options: [
                        i18n.t('profile.setup.selectImageGallery'),
                        i18n.t('profile.setup.selectImageCamera'),
                        i18n.t('common.buttons.cancel')
                    ],
                    cancelButtonIndex: 2
                }, (buttonIndex) => {
                    if (buttonIndex === 0) {
                        this.pickFromGallery();
                    }
                    if (buttonIndex === 1) {
                        this.pickFromCamera();
                    }
                });
            }
        };
        this.pickFromGallery = () => {
            ImagePicker.openPicker(this.imagePickerOptions)
                .then(itemToCollection)
                .then(images => this.imageSelected(images));
        };
        this.pickFromCamera = () => {
            ImagePicker.openCamera(this.imagePickerOptions)
                .then(itemToCollection)
                .then(image => this.imageSelected(image));
        };
    }
}
//# sourceMappingURL=musl-image-picker.js.map