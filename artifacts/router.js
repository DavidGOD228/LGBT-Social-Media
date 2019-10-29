import TermsScreen from './scenes/terms';
import HomeScreen from './scenes/home';
import RegistrationScreen from './scenes/registration';
import LoginScreen from './scenes/login';
import RegistrationConfirmationScreen from './scenes/registration-confirmation';
import ProfileHubScreen from './scenes/profile-hub';
import SetupProfileScreen from './scenes/profile/setup/setup-profile-screen';
import CommunityScreen from './scenes/community';
import NotificationsScreen from './scenes/notifications';
import MessagesScreen from './scenes/messages/messages';
import StatsScreen from './scenes/stats';
import SearchScreen from './scenes/search';
import SettingsScreen from './scenes/settings/settings';
import SetupProfileDetailsScreen from './scenes/profile/setup/setup-profile-details-screen';
import UnderConstructionScreen from './scenes/under-construction';
import ChatScreen from './scenes/messages/chat';
import ProfileView from './scenes/profile/view/profile-view';
import ChangeEmailScreen from './scenes/settings/change-email';
import ChangePasswordScreen from './scenes/settings/change-password';
import BlockedUsersScreen from './scenes/blocked-users';
import ProfileBlockedScreen from './scenes/profile-blocked';
import VisibilityScreen from './scenes/visibility';
import LocationPermissionScreen from './scenes/location-permission';
const routeConfig = {
    home: {
        screen: HomeScreen,
        name: 'home'
    },
    terms: {
        screen: TermsScreen,
        name: 'terms'
    },
    registration: {
        screen: RegistrationScreen,
        name: 'registration'
    },
    registrationConfirmation: {
        screen: RegistrationConfirmationScreen,
        name: 'registrationConfirmation'
    },
    login: {
        screen: LoginScreen,
        name: 'login'
    },
    profileHub: {
        screen: ProfileHubScreen,
        name: 'profileHub'
    },
    setupProfile: {
        screen: SetupProfileScreen,
        name: 'setupProfile'
    },
    setupProfileDetails: {
        screen: SetupProfileDetailsScreen,
        name: 'setupProfileDetails'
    },
    community: {
        screen: CommunityScreen,
        name: 'community'
    },
    profileView: {
        screen: ProfileView,
        name: 'profileView'
    },
    notifications: {
        screen: NotificationsScreen,
        name: 'notifications'
    },
    messages: {
        screen: MessagesScreen,
        name: 'messages'
    },
    chat: {
        screen: ChatScreen,
        name: 'chat'
    },
    stats: {
        screen: StatsScreen,
        name: 'stats'
    },
    search: {
        screen: SearchScreen,
        name: 'search'
    },
    settings: {
        screen: SettingsScreen,
        name: 'settings'
    },
    underConstruction: {
        screen: UnderConstructionScreen,
        name: 'underConstruction'
    },
    profileBlocked: {
        screen: ProfileBlockedScreen,
        name: 'profileBlocked'
    },
    changeEmail: {
        screen: ChangeEmailScreen,
        name: 'changeEmail'
    },
    changePassword: {
        screen: ChangePasswordScreen,
        name: 'changePassword'
    },
    blockedUsers: {
        screen: BlockedUsersScreen,
        name: 'blockedUsers'
    },
    visibility: {
        screen: VisibilityScreen,
        name: 'visibility'
    },
    locationPermission: {
        screen: LocationPermissionScreen,
        name: 'locationPermission'
    }
};
export default routeConfig;
//# sourceMappingURL=router.js.map