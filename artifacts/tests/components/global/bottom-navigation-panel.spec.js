import 'react-native';
// Note: test renderer must be required after react-native.
import React from 'react';
import renderer from 'react-test-renderer';
import BottomNavigationPanel from '../../../components/global/bottom-navigation/bottom-navigation-panel';
import UiBlockHorizontalEdges from '../../../components/ui/block/horizontal-edges';
import UiBlockVerticalCenter from '../../../components/ui/block/vertical-center';
import { Text } from 'react-native';
it('renders correctly', () => {
    const tree = renderer.create(React.createElement(BottomNavigationPanel, null,
        React.createElement(UiBlockVerticalCenter, null,
            React.createElement(UiBlockHorizontalEdges, null,
                React.createElement(Text, null, " The answer to life is 42")))));
    expect(tree)
        .toMatchSnapshot();
});
//# sourceMappingURL=bottom-navigation-panel.spec.js.map