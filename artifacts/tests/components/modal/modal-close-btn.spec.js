import 'react-native';
// Note: test renderer must be required after react-native.
import React from 'react';
import renderer from 'react-test-renderer';
import ModalCloseBtn from '../../../components/modal/modal-close-btn';
it('renders correctly', () => {
    const tree = renderer.create(React.createElement(ModalCloseBtn, { onPress: () => null }));
    expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=modal-close-btn.spec.js.map