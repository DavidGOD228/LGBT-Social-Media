import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
const GridView = (props) => {
    return React.createElement(FlatList, { ref: ref => props.getListReference && props.getListReference(ref), refreshControl: React.createElement(RefreshControl, { onRefresh: props.onRefresh, refreshing: props.refreshing }), numColumns: 3, data: props.dataSource, renderItem: (item) => props.renderRow(item), ListFooterComponent: props.footer, ListHeaderComponent: props.header });
};
export default GridView;
//# sourceMappingURL=grid-view.js.map