import repositoryRegistry from '../../../repositories/index';
import { MODEL_SCHEMA_CONTAINER } from '../../../annotations/model';
import DefaultRepository from '../../../repositories/base/impl/default';
class DefaultBaseService {
    constructor(modelClass, repo = DefaultRepository) {
        this.modelClass = modelClass;
        const modelName = this.modelName;
        if (!repositoryRegistry.has(modelName)) {
            repositoryRegistry.add(modelName, new repo(modelName, this.modelClass));
        }
        this.repo = repositoryRegistry.get(modelName);
    }
    get modelName() {
        return this.modelClass['prototype'][MODEL_SCHEMA_CONTAINER].name;
    }
    preload() {
        return Promise.resolve();
    }
    getRepo() {
        return this.repo;
    }
}
export default DefaultBaseService;
//# sourceMappingURL=default.js.map