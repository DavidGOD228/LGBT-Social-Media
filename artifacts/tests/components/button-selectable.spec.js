import 'react-native';
// Note: test renderer must be required after react-native.
import React from 'react';
import renderer from 'react-test-renderer';
import ButtonSelectable from '../../components/button-selectable';
it('renders correctly when selected false', () => {
    const item = {
        key: 42,
        value: 'It works',
        isSelected: false
    };
    const tree = renderer.create(React.createElement(ButtonSelectable, { item: item, onPress: () => ({}) }));
    expect(tree)
        .toMatchSnapshot();
});
it('renders correctly when selected true', () => {
    const item = {
        key: 42,
        value: 'It works',
        isSelected: true
    };
    const tree = renderer.create(React.createElement(ButtonSelectable, { item: item, onPress: () => ({}) }));
    expect(tree)
        .toMatchSnapshot();
});
//# sourceMappingURL=button-selectable.spec.js.map