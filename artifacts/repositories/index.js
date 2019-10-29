export class RepositoryRegistry {
    constructor() {
        this.repos = new Map();
    }
    add(name, repo) {
        this.repos.set(name, repo);
        return this;
    }
    get(name) {
        const repo = this.repos.get(name);
        if (repo) {
            return repo;
        }
        throw new Error(`no repo by name: ${name}`);
    }
    has(name) {
        return this.repos.has(name);
    }
}
const repositoryRegistry = new RepositoryRegistry();
export default repositoryRegistry;
//# sourceMappingURL=index.js.map