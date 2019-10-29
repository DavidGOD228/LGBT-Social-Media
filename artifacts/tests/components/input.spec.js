import 'react-native';
// Note: test renderer must be required after react-native.
import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../components/input';
it('renders correctly', () => {
    const tree = renderer.create(React.createElement(Input, { value: '', placeholder: 'Password', keyboardType: 'default', onChangeText: () => console.log('123') }));
    expect(tree)
        .toMatchSnapshot();
});
it('renders correctly with value', () => {
    const tree = renderer.create(React.createElement(Input, { value: '42', placeholder: 'Password', keyboardType: 'default', onChangeText: () => console.log('123') }));
    expect(tree)
        .toMatchSnapshot();
});
//# sourceMappingURL=input.spec.js.map