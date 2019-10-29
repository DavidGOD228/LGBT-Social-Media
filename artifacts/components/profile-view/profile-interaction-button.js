import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
class ProfileInteractionItem extends Component {
    constructor(props) {
        super(props);
        this.imageClicked = () => {
            if (!(this.props.item.name === 'Note' || this.props.item.name === 'Message')) {
                this.setState({
                    isSelected: !this.state.isSelected
                });
            }
            this.props.onPress();
        };
        this.state = {
            isSelected: this.props.item.isSelected
        };
    }
    render() {
        return (React.createElement(TouchableOpacity, { onPress: this.imageClicked, style: styles.button }, this.state.isSelected ? (React.createElement(Image, { source: this.props.item.imageSelected })) : (React.createElement(Image, { source: this.props.item.image }))));
    }
}
export default ProfileInteractionItem;
const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
//# sourceMappingURL=profile-interaction-button.js.map