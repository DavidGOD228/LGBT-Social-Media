import repositoryRegistry from '../../../repositories/index';
import schemaRegistry from '../../index';
const PRIMITIVE_TYPES = ['bool', 'int', 'float', 'double', 'string', 'data', 'date'];
class DefaultModel {
    get key() {
        return this.id;
    }
    get isNew() {
        return !this.id || !this.realmModel;
    }
    get hasDirtyAttributes() {
        return this.isNew || Object.keys(schemaRegistry.get(this.modelName).properties)
            .some(field => this[field] !== this.realmModel[field]); // fails with relations
    }
    get isValid() {
        return !this.hasDirtyAttributes;
    }
    constructor(realmModel, modelName, repo) {
        this.realmModel = realmModel;
        this.modelName = modelName;
        this.repo = repo || repositoryRegistry.get(modelName);
        if (realmModel) {
            this.rollback();
        }
    }
    save() {
        return this.repo.saveRecord(this);
    }
    update() {
        return this.repo.update(this);
    }
    deleteRecord() {
        return this.repo.remove(this);
    }
    rollback() {
        if (!this.realmModel) {
            return this;
        }
        Object.keys(schemaRegistry.get(this.modelName).properties)
            .forEach(field => {
            try {
                const meta = schemaRegistry.get(this.modelName).properties[field];
                const realmValue = this.realmModel[field];
                // to many
                if (meta.type === 'list') {
                    this[field] = realmValue.map(realmModel => repositoryRegistry.get(realmModel.objectSchema().name)
                        .recordFor(realmModel.id, realmModel));
                    return;
                }
                // primitive
                if (PRIMITIVE_TYPES.indexOf(meta.type) !== -1) {
                    this[field] = this.realmModel[field];
                    return;
                }
                // to one
                if (realmValue) {
                    const { name } = realmValue.objectSchema();
                    this[field] = repositoryRegistry.get(name)
                        .recordFor(realmValue.id, realmValue);
                }
            }
            catch (error) {
                console.warn('=====================', error);
            }
        });
        return this;
    }
    // unloadRecord(): Promise<null> {
    //   return this.repo.unload(this)
    // }
    serialize() {
        return this.toJSON();
    }
    deserialize(realmModel) {
        this.realmModel = realmModel;
        return this.rollback();
    }
    set(propertyName, value) {
        this[propertyName] = value;
        return this;
    }
    get(propertyName) {
        return this[propertyName];
    }
    toJSON() {
        const serialized = { id: null };
        Object.keys(schemaRegistry.get(this.modelName).properties)
            .forEach(field => {
            try {
                const meta = schemaRegistry.get(this.modelName).properties[field];
                // to many
                if (meta.type === 'list') {
                    serialized[field] = this[field] ? this[field].map(realmValue => ({ id: realmValue.id })) : [];
                    return;
                }
                // primitive
                if (PRIMITIVE_TYPES.indexOf(meta.type) !== -1) {
                    serialized[field] = this[field];
                    return;
                }
                // to one
                serialized[field] = this[field] ? { id: this[field].id } : null;
            }
            catch (error) {
                console.warn('=========================', error);
            }
        });
        return serialized;
    }
}
export default DefaultModel;
//# sourceMappingURL=default-model.js.map