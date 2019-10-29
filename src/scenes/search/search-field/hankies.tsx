import React, {Component} from 'react'
import SquareGrid from 'react-native-square-grid'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {comparator} from '../../../utils/number'

interface Props {
  options: any[]
  value: any[]
  onUpdate: (value) => void
}

interface State {
  itemWidth
}

export default class HankiesGrid extends Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      itemWidth: 0
    }
  }

  onMeasure = (measureEvent: any) => {
    this.setState({
      ...this.state,
      itemWidth: measureEvent.nativeEvent.layout.width
    })
  }

  newValue =  (selected) => {
    if (this.props.value.indexOf(selected) !== -1) {
      return this.props.value.filter(it => it !== selected)
    } else {
      return [...this.props.value, selected]
    }
  }

  onValueUpdated = (value) => {
    this.props.onUpdate(value)
  }

  render() {

    const items = this.props.options.sort(comparator)
                      .map((fieldValue, i) => ({
      value: fieldValue,
      title: fieldValue.value,
      isSelected: this.props.value && this.props.value.indexOf(fieldValue) !== -1,
      key: i
    }))

    const grid = (+this.state.itemWidth) ? <SquareGrid
      columns={3}
      rows={3}
      renderItem={this.renderItem}
      items={items}
    /> : null

    return (
      <View style={[styles.container]} onLayout={this.onMeasure}>
        <View style={{
          width: this.state.itemWidth,
          height: this.state.itemWidth
        }}>
          {grid}
        </View>
      </View>
    )
  }

  renderItem = (item: any) => {
    const hankyIcon = item.isSelected ? (
      <Image resizeMode={'contain'} source={ICONS['glowIcon']} style={{
        width: '90%',
        height: '90%',
        alignItems: 'center'
      }}>
        <Image source={ICONS[item.title]}
               resizeMode={'contain'}
               style={{
                 flex: 1,
                 width: '72%',
                 height: '72%'
               }}
        />
      </Image>
    ) : (
      <Image resizeMode={'contain'} source={ICONS[item.title]} style={{
        width: '75%',
        height: '75%',
        alignItems: 'center'
      }}/>
    )
    return <TouchableOpacity style={styles.item}
                             onPress={() => this.onValueUpdated(this.newValue(item.value))}>
      <View style={styles.content}>
        {hankyIcon}
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  }

}

const ICONS = {
  'Bondage': require('Musl/images/hankies/bondage.png'),
  'S&M': require('Musl/images/hankies/sandm.png'),
  'Dad/Son': require('Musl/images/hankies/dadson.png'),
  'Anything': require('Musl/images/hankies/anything.png'),
  'Watersports': require('Musl/images/hankies/watersports.png'),
  'Anal': require('Musl/images/hankies/anal.png'),
  'Oral': require('Musl/images/hankies/oral.png'),
  'Safe Sex': require('Musl/images/hankies/safesex.png'),
  'Fisting': require('Musl/images/hankies/xxx.png'),
  'glowIcon': require('Musl/images/hankies/glow.png')
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  item: {
    flex: 1,
    alignSelf: 'stretch'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'grey',
    fontSize: 12
  }
})
