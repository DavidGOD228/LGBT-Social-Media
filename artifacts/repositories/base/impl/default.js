import schemaRegistry from '../../../models/index';
import DefaultLocalRepository from './local';
import DefaultRemoteRepository from './remote';
import CacheRepository from './cache';
class DefaultRepository {
    constructor(modelName, modelClass) {
        this.modelName = modelName;
        const schema = schemaRegistry.get(modelName);
        this.remote = new DefaultRemoteRepository(modelName, schema.remoteUrl, schema.remotePathUrl);
        this.local = new DefaultLocalRepository(modelName);
        this.cache = new CacheRepository(modelName, modelClass);
        this.models = new Set();
        this.modelClass = modelClass;
    }
    peek(query) {
        return this.local.find(query)
            .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)));
    }
    peekRecord(query) {
        return this.local.findRecord(query)
            .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined);
    }
    peekAll() {
        return this.local.findAll()
            .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)));
    }
    peekByPrimary(primary) {
        return this.local.findByPrimary(primary)
            .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined);
    }
    getUpdater() {
        throw new Error('Method not implemented.');
    }
    unload(entity) {
        console.log(entity);
        throw new Error('Method not implemented.');
    }
    saveRecord(record) {
        return record.isNew ? this.create(record) : this.update(record);
    }
    create(entity) {
        return this.remote.create(entity.serialize())
            .then(response => this.local.create(response))
            .then(realmObject => entity.deserialize(realmObject));
    }
    find(query) {
        return this.persistList(this.remote.find(query));
    }
    findRecord(query) {
        return this.persist(this.remote.findRecord(query));
    }
    findAll() {
        return this.persistList(this.remote.findAll());
    }
    findByPrimary(primary) {
        return this.persist(this.remote.findByPrimary(primary));
    }
    update(entity) {
        return this.remote.update(entity.serialize())
            .then(response => this.local.update(response))
            .then(realmObject => entity.deserialize(realmObject));
    }
    remove(entity) {
        const maybeDeleteFromRemote = entity.id ? this.remote.remove(entity) : Promise.resolve(null);
        return maybeDeleteFromRemote.then(() => this.local.remove(entity));
    }
    removeAll() {
        return Promise.reject(null);
    }
    createRecord(initProps = {}) {
        return Object.keys(initProps)
            .reduce((record, field) => {
            record[field] = initProps[field];
            return record;
        }, this.recordFor());
    }
    recordFor(id, underlying) {
        const model = id ? [...this.models].find(existingModel => existingModel.id === id) : null;
        if (!model) {
            const newModel = new this.modelClass(underlying, this.modelName, this);
            this.models.add(newModel);
            return newModel;
        }
        if (underlying) {
            model.deserialize(underlying);
        }
        return model;
    }
    persistList(objects) {
        return objects.then(fetchedObjects => Promise.all(fetchedObjects.map(object => this.local.update(object))))
            .then((realmObjects) => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)));
    }
    persist(object) {
        return object.then(fetchedObject => fetchedObject ? this.local.update(fetchedObject) : undefined)
            .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined);
    }
    realmObjectToModel(realmObject) {
        return this.recordFor(realmObject && realmObject.id ? realmObject.id : undefined, realmObject);
    }
}
export default DefaultRepository;
//# sourceMappingURL=default.js.map