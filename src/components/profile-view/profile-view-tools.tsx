import React, {Component} from 'react'
import {ProfileInteractionButton} from '../../configs/dicts'
import ProfileInteractionItem from './profile-interaction-button'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockBasic from '../ui/block/basic'
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal'
import TextNormal from '../global/text/basic/text-normal'
import ProfileModel from '../../models/profile'

interface Props {
  items: ProfileInteractionButton[],
  onItemSelected: (item: ProfileInteractionButton) => void
  shareVisible: boolean
  profiles: ProfileModel[]
  share?: { FRIEND: boolean, FLIRT: boolean, FUN: boolean }
  sharePressed: (profile: ProfileModel) => void
}

class ProfileViewTools extends Component<Props, {}> {

  render() {
    return (
      <View style={styles.container}>
        {this.props.items.map(item =>
          <ProfileInteractionItem
            key={JSON.stringify(item)}
            item={item}
            onPress={() => this.props.onItemSelected(item)}
          />
        )}

        {this.props.shareVisible && (
          <UiBlockBasic style={styles.shareBlock}>
            {this.props.profiles
                 .map(it => (
                   <TouchableOpacity style={{width: '40%'}} onPress={() => this.props.sharePressed(it)}>
                     <UiBlockBasic style={styles.shareComponent}>
                       <View style={[
                         styles.circle,
                         this.props.share && this.props.share[it.profileType.code]
                           ? styles.circleGreen : styles.circleRed
                       ]}
                       />
                       <UiBlockSpaceHorizontal width={8}/>
                       <TextNormal style={styles.nickName}>{
                         it.nickname.length > 10 ? `${it.nickname.substr(0, 10)}...` : it.nickname
                       }</TextNormal>
                     </UiBlockBasic>
                   </TouchableOpacity>
                 ))}
          </UiBlockBasic>
        )}
      </View>
    )
  }
}

const styles: any = StyleSheet.create({
  container: {
    width: '95%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  shareBlock: {
    position: 'absolute',
    height: 60,
    width: '100%',
    top: 0,
    left: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  shareComponent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#979797'
  },
  circleRed: {
    backgroundColor: '#CE0B24'
  },
  circleGreen: {
    backgroundColor: '#81D135'
  },
  nickName: {
    color: '#5DA4E5'
  }
})

export default ProfileViewTools
