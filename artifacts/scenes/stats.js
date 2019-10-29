var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import UiBlockVerticalCenter from '../components/ui/block/vertical-center';
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges';
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel';
import i18n from '../locales/i18n';
import BaseScreenDefault from './base/base-scene';
import ActionListButton from '../components/action-list-button';
import ProfileSwitcher from '../components/profile-switcher';
import UiBlockBottomPanel from '../components/ui/block/bottom-panel';
import DefaultHeader from '../components/global/default-header';
import UiBlockSpace from '../components/ui/block/space';
import TextLight from '../components/global/text/basic/text-light';
import LineFullWidth from '../components/global/line-full-width';
import UiBlockLeft from '../components/ui/block/left';
import StatsValue from '../components/stats/value';
import StatsValueDescription from '../components/stats/value-description';
import StatsSection from '../components/stats/section';
import { ProfileService } from '../services/profile';
import { lazy } from '../annotations/inversify';
export default class StatsScreen extends BaseScreenDefault {
    constructor(props) {
        super(props);
        this.state = {
            profile7DaysViews: 0,
            profileTotalViews: 0,
            flexes7Days: 0,
            flexesTotal: 0,
            photosTotalViews: 0,
            messagesTotalSent: 0,
            messagesTotalReceived: 0
        };
        this.profileService.getStatistics()
            .then(stats => this.setState({
            profile7DaysViews: stats.profileVisits ? stats.profileVisits : 0,
            profileTotalViews: stats.totalProfileVisits ? stats.totalProfileVisits : 0,
            flexes7Days: stats.flexes ? stats.flexes : 0,
            flexesTotal: stats.totalFlexes ? stats.totalFlexes : 0,
            photosTotalViews: stats.totalPhotoViews ? stats.totalPhotoViews : 0,
            messagesTotalSent: stats.totalSentMessages ? stats.totalSentMessages : 0,
            messagesTotalReceived: stats.totalReceivedMessages ? stats.totalReceivedMessages : 0
        }));
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(StatusBar, { barStyle: "light-content" }),
            React.createElement(ScrollView, { style: styles.content },
                React.createElement(UiBlockSpace, { height: 30 }),
                React.createElement(TextLight, { style: styles.title }, i18n.t('stats.screenTitle')),
                React.createElement(UiBlockSpace, { height: 8 }),
                React.createElement(LineFullWidth, { style: styles.titleBottomBorder }),
                React.createElement(StatsSection, { title: i18n.t('stats.sections.profile.sectionTitle') },
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueLight }, this.state.profile7DaysViews),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.profile.last7Days'))),
                    React.createElement(UiBlockSpace, { height: 3 }),
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueDark }, this.state.profileTotalViews),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.profile.total')))),
                React.createElement(StatsSection, { title: i18n.t('stats.sections.flexes.sectionTitle') },
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueLight }, this.state.flexes7Days),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.flexes.last7Days'))),
                    React.createElement(UiBlockSpace, { height: 3 }),
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueDark }, this.state.flexesTotal),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.flexes.total')))),
                React.createElement(StatsSection, { title: i18n.t('stats.sections.photos.sectionTitle') },
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueDark }, this.state.photosTotalViews),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.photos.total')))),
                React.createElement(StatsSection, { title: i18n.t('stats.sections.chats.sectionTitle') },
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueDark }, this.state.messagesTotalSent),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.chats.messagesSent'))),
                    React.createElement(UiBlockSpace, { height: 3 }),
                    React.createElement(UiBlockLeft, null,
                        React.createElement(StatsValue, { styles: styles.valueDark }, this.state.messagesTotalReceived),
                        React.createElement(StatsValueDescription, null, i18n.t('stats.sections.chats.messagesReceived'))))),
            React.createElement(UiBlockBottomPanel, null,
                React.createElement(BottomNavigationPanel, null,
                    React.createElement(UiBlockVerticalCenter, null,
                        React.createElement(UiBlockHorizontalEdges, null,
                            React.createElement(ProfileSwitcher, { navigation: this.props.navigation }),
                            React.createElement(ActionListButton, { navigation: this.props.navigation })))))));
    }
}
StatsScreen.navigationOptions = ({ navigation }) => ({
    header: React.createElement(DefaultHeader, { showCommunityButton: true, navigation: navigation })
});
__decorate([
    lazy('ProfileService'),
    __metadata("design:type", ProfileService)
], StatsScreen.prototype, "profileService", void 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 24
    },
    titleBottomBorder: {
        backgroundColor: '#979797'
    },
    sectionTitle: {
        color: 'black',
        fontSize: 18
    },
    valueContainer: {
        width: 70,
        paddingRight: 10
    },
    valueLight: {
        color: '#5A96CD'
    },
    valueDark: {
        color: '#286294'
    }
});
//# sourceMappingURL=stats.js.map