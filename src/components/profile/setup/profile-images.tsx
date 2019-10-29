import React from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockLeft from '../../ui/block/left'
import UiBlockBasic from '../../ui/block/basic'
import UiBlockRight from '../../ui/block/right'
import MuslImagePicker from '../../../utils/musl-image-picker'
import {PickerImage} from '../../../utils/media-picker'
import AlbumMediaModel from '../../../models/album-media'

interface Props {
  images: AlbumMediaModel[],
  imagesPlaces?: number,
  containerWidth: number,
  imageSelected: (image: PickerImage[]) => void,
  onDeleteBtnPress: (position: AlbumMediaModel) => void,
  muslImagePicker: MuslImagePicker
}

const renderPlaceholder = (props: Props, dark) => {
  const {containerWidth, imageSelected, muslImagePicker} = props
  return (
    <TouchableOpacity onPress={() => muslImagePicker.pickImage(imageSelected)}>
      <View style={[styles.template, dark ? styles.templateDark : styles.templateLight, {
        width: containerWidth / 2,
        height: containerWidth / 2
      }]}>
        <Image source={require('Musl/images/profile/btn-photo-add.png')}/>
      </View>
    </TouchableOpacity>
  )
}

const renderUserImage = (props: Props, imageNumber) => {
  const {containerWidth, images, onDeleteBtnPress} = props
  return (
    <Image style={{
      width: containerWidth / 2,
      height: containerWidth / 2
    }} source={{uri: images[imageNumber].mediaUrl}}>
      <UiBlockRight>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => {
          onDeleteBtnPress(images[imageNumber])
        }}>
          <Image style={styles.deleteBtnIcon} source={require('Musl/images/profile/icon-trash.png')}/>
        </TouchableOpacity>
      </UiBlockRight>
    </Image>
  )
}

const imageExist = (images: any[], imageNumber: number): boolean => {
  return images && images.length > imageNumber
}

const renderImage = (props: Props, imageNumber: number, dark: boolean): any => {
  if (imageExist(props.images, imageNumber)) {
    return renderUserImage(props, imageNumber)
  }
  return renderPlaceholder(props, dark)
}

const renderImagesRow = (props: Props, rowNumber: number): any => {
  return (
    <UiBlockLeft key={props.images && props.images[rowNumber] ? props.images[rowNumber].id : rowNumber}>
      {renderImage(props, rowNumber * 2, isEven(rowNumber))}
      {renderImage(props, rowNumber * 2 + 1, !isEven(rowNumber))}
    </UiBlockLeft>
  )
}

const isEven = (n): boolean => {
  return n % 2 === 0
}

const ProfileImages = (props: Props) => {
  const rowsCount = props.imagesPlaces || 4 / 2
  const rows: any = []

  for (let i = 0; i < rowsCount; i++) {
    rows.push(renderImagesRow(props, i))
  }

  return (
    <UiBlockBasic>
      {rows}
    </UiBlockBasic>
  )
}

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
})

export default ProfileImages
