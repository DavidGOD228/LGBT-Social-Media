import {NavigationActions} from 'react-navigation'
import routeConfig from '../../router'
import {Component} from 'react'

export default class NavigateToProfileHub extends Component<any, any> {
  navigateToProfileHub() {
    this.props
        .navigation
        .dispatch(NavigationActions.reset(
          {
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: routeConfig.profileHub.name,
                params: {}
              })
            ],
            key: null
          }))
  }
}
