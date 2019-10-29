import React from 'react'
import {AdMobBanner} from 'react-native-admob'
import {Platform} from 'react-native'
import {ADMOB_UNIT_IDS} from '../../configs/dicts'

const bannerError = (error) => {
  console.log(error)
}

const getAdUnitID = () => {
  if (__DEV__) {
    return ADMOB_UNIT_IDS.banner_community_screen_320x50.sample
  }
  if (Platform.OS === 'android') {
    return ADMOB_UNIT_IDS.banner_community_screen_320x50.android
  }
  return ADMOB_UNIT_IDS.banner_community_screen_320x50.ios
}

interface Props {
  hidden?: boolean
}

const AdBannerCommunityHorizontal = (props: Props) => {
  const adUnitID = getAdUnitID()

  return (
    <AdMobBanner
      bannerSize='banner'
      adUnitID={adUnitID}
      didFailToReceiveAdWithError={bannerError}
      style={{
        width: 320,
        height: props.hidden ? 0 : 50
      }}/>
  )
}

export default AdBannerCommunityHorizontal
