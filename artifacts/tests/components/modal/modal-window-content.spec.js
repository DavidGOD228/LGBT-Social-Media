import 'react-native';
// Note: test renderer must be required after react-native.
import React from 'react';
import renderer from 'react-test-renderer';
import ModalWindowContent from '../../../components/modal/modal-window-content';
import { Text } from 'react-native';
it('renders correctly empty', () => {
    const tree = renderer.create(React.createElement(ModalWindowContent, null));
    expect(tree)
        .toMatchSnapshot();
});
it('renders correctly text', () => {
    const tree = renderer.create(React.createElement(ModalWindowContent, null,
        React.createElement(Text, null, "All you had to do was follow the damn train CJ")));
    expect(tree)
        .toMatchSnapshot();
});
//# sourceMappingURL=modal-window-content.spec.js.map