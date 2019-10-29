import React from 'react';
import { ListView, StyleSheet, View } from 'react-native';
const ProfileHubModalList = (props) => {
    return React.createElement(ListView, { style: styles.container, dataSource: props.dataSource, renderScrollComponent: viewProps => React.createElement(View, Object.assign({}, viewProps)), renderRow: (rowData) => React.createElement(View, { style: styles.row }, props.renderRow(rowData)) });
};
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
export default ProfileHubModalList;
//# sourceMappingURL=profile-hub-modal-list.js.map