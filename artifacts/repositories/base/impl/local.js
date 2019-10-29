import defaultRealm from '../../../initializers/realm';
class DefaultLocalRepository {
    constructor(modelName, realm = defaultRealm) {
        this.modelName = modelName;
        this.realm = realm;
    }
    unload(entity) {
        return this.remove(entity);
    }
    peek(query) {
        return this.find(query);
    }
    peekRecord(query) {
        return this.findRecord(query);
    }
    peekAll() {
        return this.findAll();
    }
    peekByPrimary(primary) {
        return this.findByPrimary(primary);
    }
    create(entity) {
        return new Promise(res => {
            this.realm.write(() => {
                res(this.realm.create(this.modelName, entity, true));
            });
        });
    }
    find(query) {
        return Promise.resolve(this.getAllFromRealm()
            .filtered(query)
            .map((it) => it));
    }
    findRecord(query) {
        return this.find(query)
            .then(result => result.find(() => true));
    }
    findAll() {
        return Promise.resolve(this.getAllFromRealm()
            .map((it) => it));
    }
    findByPrimary(primary) {
        return Promise.resolve(this.getAllFromRealm()
            .filtered(`id = '${primary}'`)
            .find(() => true));
    }
    update(entity) {
        return new Promise(res => {
            this.realm.write(() => {
                res(this.realm.create(this.modelName, entity, true));
            });
        });
    }
    remove(entity) {
        return new Promise(res => {
            this.findByPrimary(entity.id)
                .then(founded => founded ? this.realm.write(() => {
                this.realm.delete(founded);
                res();
            }) : res());
        });
    }
    removeAll() {
        return new Promise(res => {
            this.realm.write(() => {
                this.realm.delete(this.getAllFromRealm());
                res();
            });
        });
    }
    getUpdater() {
        return new Promise((res) => this.realm.addListener('change', res));
    }
    getAllFromRealm() {
        return this.realm.objects(this.modelName);
    }
}
export default DefaultLocalRepository;
//# sourceMappingURL=local.js.map