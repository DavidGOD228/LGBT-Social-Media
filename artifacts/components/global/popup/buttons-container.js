import React from 'react';
import { StyleSheet } from 'react-native';
import UiBlockBasic from '../../ui/block/basic';
import UiBlockLeft from '../../ui/block/left';
const PopupButtonsContainer = (props) => (React.createElement(UiBlockBasic, { style: styles.container },
    React.createElement(UiBlockLeft, null, props.children)));
const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30
    }
});
export default PopupButtonsContainer;
//# sourceMappingURL=buttons-container.js.map