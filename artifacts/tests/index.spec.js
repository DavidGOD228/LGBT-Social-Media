import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
/**
 *
 * NOTE: there will be warnings in all tests. This is a bug which will be fixed in the next release of react-native
 * https://github.com/react-community/create-react-native-app/issues/298
 *
 */
it('index renders correctly', () => {
    const tree = renderer.create();
    console.log(tree);
});
//# sourceMappingURL=index.spec.js.map