import React from 'react';
import { NativeModules, Linking, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import BaseScreenDefault from './base/base-scene';
import TextBold from '../components/global/text/basic/text-bold';
import TextNormal from '../components/global/text/basic/text-normal';
import UiBlockSpace from '../components/ui/block/space';
import UiBlockHorizontalCenter from '../components/ui/block/horizontal-center';
const SettingsLinkModule = NativeModules.SettingsLinkModule;
export default class LocationPermissionScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.settingsPressed = () => {
            this.openIosSettings();
            this.openAndroidSettings();
        };
        this.state = Object.assign({}, this.state);
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(View, { style: styles.content },
                React.createElement(TextBold, null, "Please, turn on location services, in order to use MUSL App"),
                React.createElement(UiBlockSpace, { height: 40 }),
                React.createElement(TouchableOpacity, { onPress: this.settingsPressed },
                    React.createElement(UiBlockHorizontalCenter, null,
                        React.createElement(TextNormal, { style: styles.settingsLink }, "Settings")))),
            React.createElement(View, { style: styles.bottom },
                React.createElement(BottomNavigationPanel, null))));
    }
    openIosSettings() {
        if (Platform.OS !== 'ios') {
            return;
        }
        const url = this.getSettingsUrl(this.props.navigation.state.params.status);
        Linking.canOpenURL(url)
            .then(supported => {
            if (!supported) {
                throw new Error('Cant handle settings url');
            }
            else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    getSettingsUrl(locationStatus) {
        if (locationStatus === 'serviceTurnedOff') {
            return 'App-Prefs:root=Privacy&path=LOCATION';
        }
        return 'app-settings:';
    }
    openAndroidSettings() {
        if (Platform.OS !== 'android') {
            return;
        }
        const locationStatus = this.props.navigation.state.params.status;
        console.log('locationStatus: ', locationStatus);
        if (locationStatus === 'serviceTurnedOff') {
            SettingsLinkModule.openPhoneLocationSettings()
                .then(success => console.log('success: ' + success))
                .catch(e => console.log('error: ', e));
        }
        if (locationStatus === 'denied') {
            SettingsLinkModule.openSettings()
                .then(success => console.log('success: ' + success))
                .catch(e => console.log('error: ', e));
        }
    }
}
LocationPermissionScreen.navigationOptions = {
    header: React.createElement(DefaultHeader, null)
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        height: '75%'
    },
    title: {
        color: 'rgb(46, 46, 46)',
        fontSize: 30,
        fontWeight: '300'
    },
    messageContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    settingsLink: {
        fontSize: 20,
        color: '#1EAEE9'
    }
});
//# sourceMappingURL=location-permission.js.map