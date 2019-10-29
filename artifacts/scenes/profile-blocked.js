import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import DefaultHeader from '../components/global/default-header';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import BaseScreenDefault from './base/base-scene';
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white';
import i18n from '../locales/i18n';
import UiBlockSpace from '../components/ui/block/space';
export default class ProfileBlockedScreen extends BaseScreenDefault {
    constructor() {
        super(...arguments);
        this.backButton = () => {
            this.props.navigation.goBack();
        };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(UiBlockSpace, { height: 1 }),
            React.createElement(Text, { style: styles.title }, i18n.t('profileBlocked.title')),
            React.createElement(BottomNavigationPanel, null,
                React.createElement(UiBlockVerticalCenter, null,
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(NavigationTextButtonWhite, { onPress: this.backButton }, i18n.t('common.buttons.back')))))));
    }
}
ProfileBlockedScreen.navigationOptions = {
    title: 'ProfileBlockedScreen',
    header: React.createElement(DefaultHeader, null),
    headerLeft: null
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        color: 'rgb(46, 46, 46)',
        textAlign: "center",
        fontSize: 25,
        fontWeight: '300'
    }
});
//# sourceMappingURL=profile-blocked.js.map