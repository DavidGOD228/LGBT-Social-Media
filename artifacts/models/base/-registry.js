import { MODEL_SCHEMA_CONTAINER } from '../../annotations/model';
class SchemaRegistry {
    constructor() {
        this.registry = [];
    }
    add(item) {
        this.registry.push(item.prototype[MODEL_SCHEMA_CONTAINER]);
        return this;
    }
    publish() {
        return this.registry;
    }
    has(name) {
        return this.get(name);
    }
    get(name) {
        return this.registry.find(it => it.name === name);
    }
}
export default SchemaRegistry;
//# sourceMappingURL=-registry.js.map