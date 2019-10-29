import React from 'react';
import { ListView, StyleSheet, View } from 'react-native';
const ScaledList = (props) => {
    const styles = StyleSheet.create({
        row: {
            width: '100%',
            flex: 1
        },
        container: {
            flex: 1,
            flexDirection: 'column'
        }
    });
    return React.createElement(ListView, { style: styles.container, dataSource: props.dataSource, renderScrollComponent: viewProps => React.createElement(View, Object.assign({}, viewProps)), renderRow: (rowData, sectionID, rowID) => {
            const colors = ['rgb(243, 245, 247)', 'white'];
            const style = [
                styles.row,
                { backgroundColor: colors[rowID % colors.length] }
            ];
            console.log(sectionID);
            return (React.createElement(View, { style: style }, props.renderRow(rowData)));
        } });
};
export default ScaledList;
//# sourceMappingURL=scaled-to-fill-list.js.map