import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {ProfileGeneralInfoDict} from '../../configs/dicts'
import TextBold from '../global/text/basic/text-bold'
import UiBlockVerticalCenter from '../ui/block/vertical-center'
import Image = Animated.Image

interface Props {
  dataSource: ProfileGeneralInfoDict
  name: string
  profileType: string
  distance: string | null
  hopingFor: string[]
  safetyPractice: string[]
  role: string[]
}

const HOPINGFOR_ICONS = {
  'Just dating': require('Musl/images/profile/relationship/dating.png'),
  'A great date or two': require('Musl/images/profile/relationship/dating.png'),
  'Long term relationship': require('Musl/images/profile/relationship/ltr.png'),
  'Marriage': require('Musl/images/profile/relationship/marriage.png')
}

const ROLE_ICONS = {
  'Top': require('Musl/images/profile/role/icon-top.png'),
  'Top/Versatile': require('Musl/images/profile/role/icon-top-versatile.png'),
  'Versatile': require('Musl/images/profile/role/icon-versatile.png'),
  'Bottom/Versatile': require('Musl/images/profile/role/icon-bottom-versatile.png'),
  'Bottom': require('Musl/images/profile/role/icon-bottom.png'),
  'Oral/JO Only': require('Musl/images/profile/role/icon-oral.png'),
  'Oral/JO': require('Musl/images/profile/role/icon-oral.png'),
  'Side': require('Musl/images/profile/role/icon-side.png'),
  'Sides': require('Musl/images/profile/role/icon-side.png')
}

const SAFETYPRACTICE_ICONS = {
  'Bareback': require('Musl/images/profile/safety/bareback.png'),
  'Condoms': require('Musl/images/profile/safety/condoms.png'),
  'Needs Discussion': require('Musl/images/profile/safety/needs.png'),
  'Prep': require('Musl/images/profile/safety/prep.png'),
  'Treatment as Prevention': require('Musl/images/profile/safety/tap.png')
}

const ProfileViewGeneralInfo = (props: Props) => {

  return <View style={styles.container}>
    <UiBlockVerticalCenter>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{props.name}</Text>
    </UiBlockVerticalCenter>
    <View style={styles.rightBlock}>
      <View style={styles.paddingRight}>
        {props.distance && (
          <UiBlockVerticalCenter>
            <TextBold>{props.distance}</TextBold>
          </UiBlockVerticalCenter>
        )}
      </View>

      {renderHopingForIcons(props)}
      {(props.profileType === 'FUN' && props.role) && props.role.map(code =>
        <Image style={styles.indicator} source={ROLE_ICONS[code]}/>
      )}
      {renderSafetyPracticeIcons(props)}
    </View>
  </View>
}

const renderSafetyPracticeIcons = (props: Props) => {
  if (props.profileType === 'FUN' && props.safetyPractice && props.safetyPractice.length > 0) {
    if (props.safetyPractice.length > 1) {
      return <Image style={styles.indicator} source={require('Musl/images/profile/safety/2.png')}/>
    }
    return <Image style={styles.indicator} source={SAFETYPRACTICE_ICONS[props.safetyPractice[0]]}/>
  }
  return null
}

const renderHopingForIcons = (props: Props) => {
  if (props.profileType === 'FLIRT' && props.hopingFor) {
    if (props.hopingFor.length > 1) {
      return <Image style={styles.indicator} source={require('Musl/images/profile/safety/2.png')}/>
    }
    return <Image style={styles.indicator} source={HOPINGFOR_ICONS[props.hopingFor[0]]}/>
  }
  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50
  },
  text: {
    fontFamily: 'Uniform-Bold',
    fontSize: 23,
    color: 'white',
    paddingLeft: 25
  },
  rightBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 25
  },
  paddingRight: {
    paddingRight: 5
  },
  indicator: {
    marginRight: 5,
    width: 25,
    height: 25
  }
})

export default ProfileViewGeneralInfo
