import es6_symbol from 'es6-symbol/implement'
import {
  AppRegistry,
  Linking
} from 'react-native'

import ContainerComponent from './container'
import VersionCheck from 'react-native-version-check'
import configuration from './configs/index'

VersionCheck.setAppID(configuration.appStore.APP_ID)
VersionCheck.setAppName(configuration.appStore.APP_NAME)

VersionCheck.needUpdate()
            .then(async res => {
              if (res.isNeeded) {
                return Linking.openURL(await VersionCheck.getStoreUrl())
              }
            })

console.log(es6_symbol)

AppRegistry.registerComponent('Musl', () => ContainerComponent)
