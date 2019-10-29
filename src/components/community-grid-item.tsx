import React, {PureComponent} from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import UiBlockHorizontalEdges from './ui/block/horizontal-edges'
import UiBlockVerticalCenter from './ui/block/vertical-center'
import configuration from '../configs/index'
import UiBlockHorizontal from './ui/block/horizontal'
import FastImage from 'react-native-fast-image'

interface Props {
  onItemClick: () => void,
  model: any,
  profileType: string,
  sessionId: string
}

interface State {
}

const ITEM_SIZE_THRESHOLD = 30
const ITEM_SIZE_SAMPLE = 128

const STATUS_ICONS = {
  OFFLINE: require('Musl/images/global/icon-inactive.png'),
  ONLINE: require('Musl/images/global/icon-active.png'),
  AWAY: require('Musl/images/global/lurking.png')
}

const HOPINGFOR_ICONS = {
  'Just dating': require('Musl/images/profile/relationship/dating.png'),
  'A great date or two': require('Musl/images/profile/relationship/dating.png'),
  'Long term relationship': require('Musl/images/profile/relationship/ltr.png'),
  'Marriage': require('Musl/images/profile/relationship/marriage.png')
}

const SAFETYPRACTICE_ICONS = {
  'Bareback': require('Musl/images/profile/safety/bareback.png'),
  'Condoms': require('Musl/images/profile/safety/condoms.png'),
  'Needs Discussion': require('Musl/images/profile/safety/needs.png'),
  'Prep': require('Musl/images/profile/safety/prep.png'),
  'Treatment as Prevention': require('Musl/images/profile/safety/tap.png')
}

const ROLE_ICONS = {
  'Top': require('Musl/images/profile/role/icon-top.png'),
  'Top/Versatile': require('Musl/images/profile/role/icon-top-versatile.png'),
  'Versatile': require('Musl/images/profile/role/icon-versatile.png'),
  'Bottom/Versatile': require('Musl/images/profile/role/icon-bottom-versatile.png'),
  'Bottom': require('Musl/images/profile/role/icon-bottom.png'),
  'Oral/JO Only': require('Musl/images/profile/role/icon-oral.png'),
  'Oral/JO': require('Musl/images/profile/role/icon-oral.png'),
  'Side': require('Musl/images/profile/role/icon-side.png'),
  'Sides': require('Musl/images/profile/role/icon-side.png')
}

const ICONS = {
  HOPINGFOR_ICONS,
  SAFETYPRACTICE_ICONS,
  ROLE_ICONS
}

const INDICATORSTRATEGY = {
  FRIEND: [],
  FLIRT: ['hopingFor'],
  FUN: ['role', 'safetyPractice']
}

const renderIndicators = (communityViewDto: any, profileType: string) =>
  <View style={styles.indicatorsContainer}>
    {INDICATORSTRATEGY[profileType].map(code => {
        if (communityViewDto[code].length > 1) {
          return <Image key={code}
                        style={styles.roleIndicator}
                        resizeMode='contain'
                        source={require('Musl/images/profile/safety/2.png')}/>
        }
        return <Image
          key={code}
          style={styles.roleIndicator}
          resizeMode='contain'
          source={ICONS[code.toUpperCase() + '_ICONS'][communityViewDto[code][0]]}
        />
      }
    )}
  </View>

export default class CommunityGridItem extends PureComponent<Props, State> {

  onItemClick = () => {
    this.props.model.item.visited = true
    this.forceUpdate()
    this.props.onItemClick()
  }

  render() {
    const model = this.props.model.item
    const sourceUrl = `${configuration.remoteApi.base}/medias/download/${model.mediaId}?type=SMALL`

    const visitedIcon = (<Image
      style={styles.visitStatus}
      source={require('Musl/images/profile/icon-visited.png')}
    />)

    const indicators = renderIndicators(model, this.props.profileType)

    const nicknameFull = (model.nickname || '')
    const nickname = nicknameFull.length > 10 ? nicknameFull.substring(0, 9)
                                                            .trim() + '...' : nicknameFull

    return <TouchableOpacity
      style={styles.itemContainer}
      onPress={this.onItemClick}
    >
      {Platform.OS === 'android' ?
        <FastImage
          style={styles.userPic}
          source={{
            uri: sourceUrl,
            priority: FastImage.priority.normal,
            headers: {Cookie: 'SESSION=' + this.props.sessionId}
          }}
          resizeMode={FastImage.resizeMode.contain}
        /> :
        <Image
          style={styles.userPic}
          source={{
            uri: sourceUrl,
            headers: {Cookie: 'SESSION=' + this.props.sessionId},
            cache: 'force-cache'
          }}
          resizeMode={'contain'}
        />}

      <ImageBackground style={styles.top}
                       resizeMode={'stretch'}
                       source={require('Musl/images/global/shadow-bg.png')}>
        <UiBlockVerticalCenter>
          <UiBlockHorizontalEdges>
            <UiBlockHorizontal>
              <Text style={styles.userName}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
              >{nickname}</Text>
            </UiBlockHorizontal>

          </UiBlockHorizontalEdges>
        </UiBlockVerticalCenter>
      </ImageBackground>

      <Image
        style={styles.activeStatus}
        source={STATUS_ICONS[model.status]}
      />

      {model.visited ? visitedIcon : null}

      <View style={styles.bottom}>
        <UiBlockVerticalCenter>
          <UiBlockHorizontalEdges>
            <Text style={styles.distance}
                  numberOfLines={1}
            >{model.distanceToDisplay}</Text>
            {indicators}
          </UiBlockHorizontalEdges>
        </UiBlockVerticalCenter>
      </View>
    </TouchableOpacity>
  }
}

const resizeItem = (dWidth: number, colCount: number, colSpacing: number) => {
  return dWidth / colCount - colSpacing * 2
}
const displayWidth = Dimensions.get('window').width
let columnCount = 3
const columnSpacing = 1

let itemWidth = resizeItem(displayWidth, columnCount, columnSpacing)
let sizeDiff = itemWidth - ITEM_SIZE_SAMPLE

while (Math.abs(sizeDiff) > ITEM_SIZE_THRESHOLD) {
  sizeDiff > 0 ? columnCount++ : columnCount--
  itemWidth = resizeItem(displayWidth, columnCount, columnSpacing)
  sizeDiff = itemWidth - ITEM_SIZE_SAMPLE
}

const itemHeight = itemWidth // SQUARENESS MAY BE A SUBJECT TO CHANGE. FOR NOW - SQUARE

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#4685c2',
    margin: columnSpacing,
    width: itemWidth,
    height: itemHeight
  },
  userPic: {
    flex: 1
  },
  activeStatus: {
    position: 'absolute',
    width: 12,
    height: 12,
    top: 5,
    left: 5
  },
  visitStatus: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 0,
    right: 0
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 4,
    height: 22,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  top: {
    position: 'absolute',
    width: '100%',
    height: 18,
    top: 0
  },
  userName: {
    color: 'white',
    fontSize: 12,
    marginLeft: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  distance: {
    color: '#eee',
    fontSize: 10,
    // fontWeight: 'bold',
    textAlign: 'center'
  },
  indicatorsContainer: {
    flexDirection: 'row'
  },
  roleIndicator: {
    width: 13,
    height: 13,
    marginTop: 2,
    marginLeft: 3
  }

})
