import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockHorizontalEdges from './ui/block/horizontal-edges';
import LineFullWidth from './global/line-full-width';
import UiBlockSpace from './ui/block/space';
import TextNormal from './global/text/basic/text-normal';
import UiBlockHorizontal from './ui/block/horizontal';
export default class CollapsingSubSection extends Component {
    constructor(props) {
        super(props);
        this.toggleShowChildren = () => {
            this.setState(Object.assign({}, this.state, { showChildren: !this.state.showChildren }));
        };
        this.state = Object.assign({}, this.state, { showChildren: props.showChildren, completed: true });
    }
    render() {
        const toggleIcon = this.state.showChildren ?
            require('Musl/images/profile/icon-minus.png')
            :
                require('Musl/images/profile/icon-plus.png');
        const children = this.props.title === 'When / Where' ?
            React.createElement(View, null,
                React.createElement(UiBlockSpace, { height: 10 }),
                React.createElement(UiBlockHorizontal, null, this.props.children)) :
            React.createElement(View, null,
                React.createElement(UiBlockSpace, { height: 10 }),
                this.props.children);
        return React.createElement(View, null,
            React.createElement(UiBlockSpace, { height: 5 }),
            React.createElement(LineFullWidth, null),
            React.createElement(View, { style: styles.container },
                React.createElement(TouchableOpacity, { onPress: this.toggleShowChildren },
                    React.createElement(UiBlockSpace, { height: 10 }),
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(TextNormal, null, this.props.title),
                        React.createElement(Image, { source: toggleIcon, style: styles.toggleSize }))),
                this.state.showChildren && children),
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(LineFullWidth, null));
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5
    },
    toggleSize: {
        width: 16,
        height: 16
    }
});
//# sourceMappingURL=collapsing-sub-section.js.map