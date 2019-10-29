import React from 'react';
import { StyleSheet } from 'react-native';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockHorizontalEdges from '../../ui/block/horizontal-edges';
const PopupTwoButtonsContainer = (props) => (React.createElement(UiBlockBasic, { style: styles.container },
    React.createElement(UiBlockHorizontalEdges, null, props.children)));
const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30
    }
});
export default PopupTwoButtonsContainer;
//# sourceMappingURL=two-buttons-container.js.map