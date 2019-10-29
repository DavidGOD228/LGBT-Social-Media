import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {ProfileInteractionButton} from '../../configs/dicts'

interface Props {
  item: ProfileInteractionButton,
  onPress: () => void
}

interface State {
  isSelected: boolean
}

class ProfileInteractionItem extends Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      isSelected: this.props.item.isSelected
    }
  }

  imageClicked = () => {
    if (!(this.props.item.name === 'Note' || this.props.item.name === 'Message')) {
      this.setState({
        isSelected: !this.state.isSelected
      })
    }
    this.props.onPress()
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.imageClicked}
        style={styles.button}>
        {this.state.isSelected ? (
          <Image source={this.props.item.imageSelected}/>
        ) : (
          <Image source={this.props.item.image}/>
        )}
      </TouchableOpacity>
    )
  }
}

export default ProfileInteractionItem

const styles: any = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
