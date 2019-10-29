import React, { Component } from 'react';
import SquareGrid from 'react-native-square-grid';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { comparator } from '../../utils/number';
export default class HankiesGrid extends Component {
    constructor(props) {
        super(props);
        this.onMeasure = (measureEvent) => {
            this.setState(Object.assign({}, this.state, { itemWidth: measureEvent.nativeEvent.layout.width }));
        };
        this.newValue = (value) => {
            const fieldData = this.props.fieldData;
            if (fieldData.fieldValues.indexOf(value) !== -1) {
                return fieldData.fieldValues.filter(it => it !== value);
            }
            else {
                return [...fieldData.fieldValues, value];
            }
        };
        this.renderItem = (item) => {
            const hankyIcon = item.isSelected ? (React.createElement(Image, { resizeMode: 'contain', source: ICONS['glowIcon'], style: {
                    width: '90%',
                    height: '90%',
                    alignItems: 'center'
                } },
                React.createElement(Image, { source: ICONS[item.title], resizeMode: 'contain', style: {
                        flex: 1,
                        width: '72%',
                        height: '72%'
                    } }))) : (React.createElement(Image, { resizeMode: 'contain', source: ICONS[item.title], style: {
                    width: '75%',
                    height: '75%',
                    alignItems: 'center'
                } }));
            return React.createElement(TouchableOpacity, { style: styles.item, onPress: () => this.props.onValueUpdated(this.newValue(item.value)) },
                React.createElement(View, { style: styles.content },
                    hankyIcon,
                    React.createElement(Text, { style: styles.text }, item.title)));
        };
        this.state = {
            itemWidth: 0
        };
    }
    render() {
        const { field, fieldData } = this.props;
        const items = field.fieldValues.sort(comparator)
            .map((fieldValue, i) => ({
            value: fieldValue,
            title: fieldValue.value,
            isSelected: fieldData.fieldValues.indexOf(fieldValue) !== -1,
            key: i
        }));
        const grid = (+this.state.itemWidth) ? React.createElement(SquareGrid, { columns: 3, rows: 3, renderItem: this.renderItem, items: items }) : null;
        return (React.createElement(View, { style: [styles.container], onLayout: this.onMeasure },
            React.createElement(View, { style: {
                    width: this.state.itemWidth,
                    height: this.state.itemWidth
                } }, grid)));
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
};
const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    item: {
        flex: 1,
        alignSelf: 'stretch'
    },
    content: {
        padding: 3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        position: 'absolute',
        bottom: 0,
        color: 'grey',
        fontSize: 12
    }
});
//# sourceMappingURL=hankies.js.map