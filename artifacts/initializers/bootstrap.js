import realm from './realm';
import serviceRegistry from '../services/index';
export default () => Promise.all([realm, serviceRegistry]);
//# sourceMappingURL=bootstrap.js.map