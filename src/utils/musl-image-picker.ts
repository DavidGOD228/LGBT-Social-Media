import {
  ActionSheetIOS,
  Alert,
  Platform
} from 'react-native'
import i18n from '../locales/i18n'
import ImagePicker, {
  PickerImage,
  PickerOptions
} from './media-picker'
import {itemToCollection} from './array-utils'

export default class MuslImagePicker {

  imagePickerOptions: PickerOptions = {
    compressImageMaxWidth: 1000,
    compressImageMaxHeight: 1000
  }

  imageSelected: (image: PickerImage[]) => void

  pickImage = (onImageSelected: (image: PickerImage[]) => void, options?: PickerOptions) => {
    if (options) {
      this.imagePickerOptions = options
    }
    this.imageSelected = onImageSelected
    this.chooseImageSource()
  }

  private chooseImageSource = () => {
    this.chooseImageSourceAndroid()
    this.chooseImageSourceIOS()
  }

  private chooseImageSourceAndroid = () => {
    if (Platform.OS === 'android') {
      Alert.alert(
        i18n.t('profile.setup.selectImageDialogTitle'),
        i18n.t('profile.setup.selectImageDialogMessage'),
        [
          {
            text: i18n.t('profile.setup.selectImageGallery'),
            onPress: this.pickFromGallery
          },
          {
            text: i18n.t('profile.setup.selectImageCamera'),
            onPress: this.pickFromCamera
          }
        ]
      )
    }
  }

  private chooseImageSourceIOS = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        title: i18n.t('profile.setup.selectImageDialogTitle'),
        options: [
          i18n.t('profile.setup.selectImageGallery'),
          i18n.t('profile.setup.selectImageCamera'),
          i18n.t('common.buttons.cancel')],
        cancelButtonIndex: 2
      }, (buttonIndex) => {
        if (buttonIndex === 0) {
          this.pickFromGallery()
        }
        if (buttonIndex === 1) {
          this.pickFromCamera()
        }
      })
    }
  }

  private pickFromGallery = (): void => {
    ImagePicker.openPicker(this.imagePickerOptions)
               .then(itemToCollection)
               .then(images => this.imageSelected(images))
  }

  private pickFromCamera = (): void => {
    ImagePicker.openCamera(this.imagePickerOptions)
               .then(itemToCollection)
               .then(image => this.imageSelected(image))
  }
}
