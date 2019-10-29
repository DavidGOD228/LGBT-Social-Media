import React from 'react';
import { ListView, StyleSheet, View } from 'react-native';
const HorizontalList = (props) => {
    return React.createElement(ListView, { style: styles.container, dataSource: props.dataSource, horizontal: true, scrollEnabled: true, bounces: false, pagingEnabled: true, renderScrollComponent: viewProps => React.createElement(View, Object.assign({}, viewProps)), renderRow: (rowData) => {
            return (React.createElement(View, { style: styles.row }, props.renderRow(rowData)));
        } });
};
const styles = StyleSheet.create({
    row: {
        width: '92%',
        aspectRatio: 1
    },
    container: {
        flexDirection: 'row'
    }
});
export default HorizontalList;
//# sourceMappingURL=horizontal-list.js.map