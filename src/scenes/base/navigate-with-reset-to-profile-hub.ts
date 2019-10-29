import {NavigationActions} from 'react-navigation'
import routeConfig from '../../router'
import {Component} from 'react'

export default class NavigateWithResetToProfileHub extends Component<any, any> {
  navigateWithResetToProfileHub(routeName: string, params: any = {}) {
    this.props
        .navigation
        .dispatch(NavigationActions.reset(
          {
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
          }))
  }
}
