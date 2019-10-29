import {Component} from 'react'
import {NavigationScreenProp} from 'react-navigation'

export interface BaseScene<S> {
  setSpecState<K extends keyof S>(stateName: K, value: S[K]): this
}

export interface BaseProps {
  navigation: NavigationScreenProp<any, any>
}

export interface BaseState {
}

export default class BaseScreenDefault<P extends BaseProps, S extends BaseState>
  extends Component<P, S>
  implements BaseScene<S> {

  setSpecState<K extends keyof S>(stateName: K, value: S[K]): this {

    if (this.state[stateName] !== value) {
      this.setState(prevState => ({
        ...(prevState as BaseState),
        [stateName as string]: value
      }))
    }

    return this
  }
}
