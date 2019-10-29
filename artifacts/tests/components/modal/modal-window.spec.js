import 'react-native';
// Note: test renderer must be required after react-native.
import React from 'react';
import renderer from 'react-test-renderer';
import ModalWindow from '../../../components/modal/modal-window';
import { Text } from 'react-native';
it('renders correctly visible empty', () => {
    const tree = renderer.create(React.createElement(ModalWindow, { visible: true }));
    expect(tree)
        .toMatchSnapshot();
});
it('renders correctly visible text', () => {
    const tree = renderer.create(React.createElement(ModalWindow, { visible: true },
        React.createElement(Text, null, "All you had to do was follow the damn train CJ")));
    expect(tree)
        .toMatchSnapshot();
});
//# sourceMappingURL=modal-window.spec.js.map