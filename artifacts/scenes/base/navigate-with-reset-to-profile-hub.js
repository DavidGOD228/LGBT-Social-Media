import { NavigationActions } from 'react-navigation';
import routeConfig from '../../router';
import { Component } from 'react';
export default class NavigateWithResetToProfileHub extends Component {
    navigateWithResetToProfileHub(routeName, params = {}) {
        this.props
            .navigation
            .dispatch(NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({
                    routeName: routeConfig.profileHub.name,
                    params: {}
                }),
                NavigationActions.navigate({
                    routeName,
                    params
                })
            ],
            key: null
        }));
    }
}
//# sourceMappingURL=navigate-with-reset-to-profile-hub.js.map