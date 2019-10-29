export class ServiceRegistry {
    constructor() {
        this.services = new Map();
        this.onReadyCallbacks = [];
    }
    add(service) {
        this.services.set(service.modelName, service);
        return this;
    }
    get(name) {
        const repo = this.services.get(name);
        if (repo) {
            return repo;
        }
        throw new Error(`no service by name: ${name}`);
    }
    has(name) {
        return this.services.has(name);
    }
    values() {
        return [...this.services.values()];
    }
    onReady(f) {
        this.onReadyCallbacks.push(f);
    }
    ready() {
        return this.onReadyCallbacks.map(f => f(this));
    }
}
const serviceRegistry = new ServiceRegistry();
export default serviceRegistry;
//# sourceMappingURL=-registry.js.map