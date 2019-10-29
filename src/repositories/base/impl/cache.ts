import RecordManager from '../record-manager'
import Model from '../../../models/base/model'
import Entity from '../entity'
import DefaultLocalRepository from './local'
import LocalRepository from '../local'

class CacheRepository<T extends Model, Q extends string> implements RecordManager<T, Q> {

  private modelName: string
  private local: LocalRepository<Entity, string>
  private models: Set<T>
  private modelClass

  constructor(modelName: string, modelClass) {
    this.modelName = modelName
    this.local = new DefaultLocalRepository(modelName)
    this.models = new Set()
    this.modelClass = modelClass
  }

  saveRecord(record: T): Promise<T> {
    return record.isNew ? this.create(record) : this.update(record)
  }

  createRecord(initProps: object = {}): T {
    return Object.keys(initProps)
                 .reduce((record, field) => {
                   record[field] = initProps[field]
                   return record
                 }, this.recordFor())
  }

  recordFor(id?: number, underlying?: object): T {
    const model = id ? [...this.models].find(existingModel => existingModel.id === id) : null

    if (!model) {
      const newModel: T = new this.modelClass(underlying, this.modelName, this)
      this.models.add(newModel)
      return newModel
    }

    if (underlying) {
      model.deserialize(underlying as Entity)
    }

    return model
  }

  create(entity: T): Promise<T> {
    return this.local.create(entity)
               .then(realmObject => entity.deserialize(realmObject))
  }

  find(query: Q): Promise<T[]> {
    return this.local.find(query)
               .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)))
  }

  findRecord(query: Q): Promise<T | undefined> {
    return this.local.findRecord(query)
               .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined)
  }

  findAll(): Promise<T[]> {
    return this.local.findAll()
               .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)))
  }

  findByPrimary(primary: any): Promise<T | undefined> {
    return this.local.findByPrimary(primary)
               .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined)
  }

  update(entity: T): Promise<T> {
    return this.local.update(entity.serialize())
               .then(res => entity.deserialize(res))
  }

  remove(entity: T): Promise<null> {
    return this.local.remove(entity)
  }

  removeAll(): Promise<null> {
    return this.local.removeAll()
  }

  private realmObjectToModel(realmObject: Entity): T {
    return this.recordFor(realmObject && realmObject.id ? realmObject.id : undefined, realmObject)
  }

}

export default CacheRepository
