import Realm from 'realm';
import schemaRegistry from '../models/index';
import configuration from '../configs/index';
const realm = new Realm({
    schema: schemaRegistry.publish(),
    schemaVersion: configuration.realm.schemaVersion
});
export default realm;
//# sourceMappingURL=realm.js.map