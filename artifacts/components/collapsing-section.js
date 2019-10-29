import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import UiBlockHorizontalEdges from './ui/block/horizontal-edges';
import LineFullWidth from './global/line-full-width';
import UiBlockSpace from './ui/block/space';
import TextBold from './global/text/basic/text-bold';
import UiBlockHorizontal from './ui/block/horizontal';
import UiBlockSpaceHorizontal from './ui/block/space-horizontal';
import UiBlockBasic from './ui/block/basic';
export default class CollapsingSection extends Component {
    constructor(props) {
        super(props);
        this.toggleShowChildren = () => {
            this.setState(Object.assign({}, this.state, { showChildren: !this.state.showChildren }));
        };
        this.state = Object.assign({}, this.state, { showChildren: props.showChildren });
    }
    render() {
        const toggleIcon = this.state.showChildren ?
            require('Musl/images/profile/icon-minus-dark.png')
            :
                require('Musl/images/profile/icon-plus-dark.png');
        const completedIcon = (this.props.completed && require('Musl/images/profile/icon-check.png')) || null;
        const children = React.createElement(View, null, this.props.children);
        return React.createElement(View, null,
            React.createElement(LineFullWidth, { style: styles.line }),
            React.createElement(View, { style: styles.container },
                React.createElement(TouchableOpacity, { onPress: this.toggleShowChildren },
                    React.createElement(UiBlockSpace, { height: 10 }),
                    React.createElement(UiBlockHorizontalEdges, null,
                        React.createElement(UiBlockBasic, null,
                            React.createElement(TextBold, null, this.props.title),
                            this.props.infoPressed ? (React.createElement(TouchableOpacity, { style: styles.infoIcon, onPress: this.props.infoPressed },
                                React.createElement(Image, { source: require('Musl/images/global/icon-btn-info.png') }))) : (null)),
                        React.createElement(UiBlockHorizontal, null,
                            React.createElement(Image, { source: completedIcon, style: styles.toggleSize }),
                            React.createElement(UiBlockSpaceHorizontal, { width: 10 }),
                            React.createElement(Image, { source: toggleIcon, style: styles.toggleSize })))),
                this.state.showChildren && children),
            React.createElement(UiBlockSpace, { height: 10 }),
            React.createElement(LineFullWidth, { style: styles.line }));
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5
    },
    toggleSize: {
        width: 20,
        height: 20
    },
    line: {
        backgroundColor: '#579ee9'
    },
    infoIcon: {
        position: 'absolute',
        top: -7,
        right: -30
    }
});
//# sourceMappingURL=collapsing-section.js.map