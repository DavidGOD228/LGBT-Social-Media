import React from 'react';
import PropTypes from 'prop-types';
import { Platform, requireNativeComponent, View } from 'react-native';
const nativeInterface = {
    name: 'NCView',
    propTypes: Object.assign({ clipChildren: PropTypes.bool }, View.propTypes)
};
const NCViewNative = requireNativeComponent('NCView', nativeInterface);
const NCView = (props) => (
// will force nonclipping behavior on android for now.
Platform.OS === 'android' ?
    React.createElement(NCViewNative, { style: props.style, clipChildren: false }, props.children)
    :
        React.createElement(View, { style: props.style }, props.children));
export default NCView;
//# sourceMappingURL=non-clipping-view.js.map