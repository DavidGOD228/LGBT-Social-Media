import DefaultLocalRepository from './local';
class CacheRepository {
    constructor(modelName, modelClass) {
        this.modelName = modelName;
        this.local = new DefaultLocalRepository(modelName);
        this.models = new Set();
        this.modelClass = modelClass;
    }
    saveRecord(record) {
        return record.isNew ? this.create(record) : this.update(record);
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
    create(entity) {
        return this.local.create(entity)
            .then(realmObject => entity.deserialize(realmObject));
    }
    find(query) {
        return this.local.find(query)
            .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)));
    }
    findRecord(query) {
        return this.local.findRecord(query)
            .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined);
    }
    findAll() {
        return this.local.findAll()
            .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)));
    }
    findByPrimary(primary) {
        return this.local.findByPrimary(primary)
            .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined);
    }
    update(entity) {
        return this.local.update(entity.serialize())
            .then(res => entity.deserialize(res));
    }
    remove(entity) {
        return this.local.remove(entity);
    }
    removeAll() {
        return this.local.removeAll();
    }
    realmObjectToModel(realmObject) {
        return this.recordFor(realmObject && realmObject.id ? realmObject.id : undefined, realmObject);
    }
}
export default CacheRepository;
//# sourceMappingURL=cache.js.map