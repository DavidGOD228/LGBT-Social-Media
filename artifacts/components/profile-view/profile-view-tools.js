import React, { Component } from 'react';
import ProfileInteractionItem from './profile-interaction-button';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockBasic from '../ui/block/basic';
import UiBlockSpaceHorizontal from '../ui/block/space-horizontal';
import TextNormal from '../global/text/basic/text-normal';
class ProfileViewTools extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            this.props.items.map(item => React.createElement(ProfileInteractionItem, { key: JSON.stringify(item), item: item, onPress: () => this.props.onItemSelected(item) })),
            this.props.shareVisible && (React.createElement(UiBlockBasic, { style: styles.shareBlock }, this.props.profiles
                .map(it => (React.createElement(TouchableOpacity, { style: { width: '40%' }, onPress: () => this.props.sharePressed(it) },
                React.createElement(UiBlockBasic, { style: styles.shareComponent },
                    React.createElement(View, { style: [
                            styles.circle,
                            this.props.share && this.props.share[it.profileType.code]
                                ? styles.circleGreen : styles.circleRed
                        ] }),
                    React.createElement(UiBlockSpaceHorizontal, { width: 8 }),
                    React.createElement(TextNormal, { style: styles.nickName }, it.nickname.length > 10 ? `${it.nickname.substr(0, 10)}...` : it.nickname)))))))));
    }
}
const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    shareBlock: {
        position: 'absolute',
        height: 60,
        width: '100%',
        top: 0,
        left: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    shareComponent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#979797'
    },
    circleRed: {
        backgroundColor: '#CE0B24'
    },
    circleGreen: {
        backgroundColor: '#81D135'
    },
    nickName: {
        color: '#5DA4E5'
    }
});
export default ProfileViewTools;
//# sourceMappingURL=profile-view-tools.js.map