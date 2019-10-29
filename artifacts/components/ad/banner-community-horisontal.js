import React from 'react';
import { AdMobBanner } from 'react-native-admob';
import { Platform } from 'react-native';
import { ADMOB_UNIT_IDS } from '../../configs/dicts';
const bannerError = (error) => {
    console.log(error);
};
const getAdUnitID = () => {
    if (__DEV__) {
        return ADMOB_UNIT_IDS.banner_community_screen_320x50.sample;
    }
    if (Platform.OS === 'android') {
        return ADMOB_UNIT_IDS.banner_community_screen_320x50.android;
    }
    return ADMOB_UNIT_IDS.banner_community_screen_320x50.ios;
};
const AdBannerCommunityHorizontal = (props) => {
    const adUnitID = getAdUnitID();
    return (React.createElement(AdMobBanner, { bannerSize: 'banner', adUnitID: adUnitID, didFailToReceiveAdWithError: bannerError, style: {
            width: 320,
            height: props.hidden ? 0 : 50
        } }));
};
export default AdBannerCommunityHorizontal;
//# sourceMappingURL=banner-community-horisontal.js.map