import React from 'react'
import {
  ListViewDataSource,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import DefaultHeader from '../components/global/default-header'
import UiBlockVerticalCenter from '../components/ui/block/vertical-center'
import BottomNavigationPanel from '../components/global/bottom-navigation/bottom-navigation-panel'
import UiBlockHorizontalEdges from '../components/ui/block/horizontal-edges'
import {NavigationScreenProp} from 'react-navigation'
import BaseScreenDefault from './base/base-scene'
import NavigationTextButtonWhite from '../components/global/bottom-navigation/text-button-white'
import i18n from '../locales/i18n'
import UiBlockSpace from '../components/ui/block/space'

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  dataSource: ListViewDataSource,
  modalDataSource: ListViewDataSource,
  showGuideModal: boolean
}

export default class UnderConstructionScreen extends BaseScreenDefault <Props, State> {

  static navigationOptions = {
    title: 'UnderConstructionScreen',
    header: <DefaultHeader/>,
    headerLeft: null
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <UiBlockSpace height={1}/>
        <Text style={styles.title}>{i18n.t('underConstruction.title')}</Text>
        <BottomNavigationPanel>
          <UiBlockVerticalCenter>
            <UiBlockHorizontalEdges>
              <NavigationTextButtonWhite
                onPress={this.backButton}>
                {i18n.t('common.buttons.back')}
              </NavigationTextButtonWhite>
            </UiBlockHorizontalEdges>
          </UiBlockVerticalCenter>
        </BottomNavigationPanel>
      </View>
    )
  }

  private backButton = () => {
    this.props.navigation.goBack()
  }
}

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
})
