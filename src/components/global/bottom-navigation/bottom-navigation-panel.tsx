import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import {globalParams} from '../../../assets/styles/style'
import {lazy} from '../../../annotations/inversify'
import {ProfileService} from '../../../services/profile'

const COLORS = {
  FRIEND: "#1D4C83",
  FLIRT: "#1b3883",
  FUN: "#111111"
}

interface State {
  profileTypeCode: string
}

interface Props {
  children: any
}

export default class BottomNavigationPanel extends Component<Props, State> {

  @lazy('ProfileService')
  private profileService: ProfileService

  constructor(props) {
    super(props)

    const profile = this.profileService.getActive()
    const profileTypeCode = (profile && profile.profileType.code) || "FRIEND"

    this.state = {
      profileTypeCode
    }
  }

  render() {
    return <View style={[styles.container, {backgroundColor: COLORS[this.state.profileTypeCode]}]}>
      {this.props.children}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    height: globalParams.bottomPanelHeight,
    paddingLeft: 15,
    paddingRight: 15
  }
})
