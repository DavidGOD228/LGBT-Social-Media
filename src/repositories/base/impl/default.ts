import Query from '../../../lib/smart-criteria/query'
import Entity from '../entity'
import schemaRegistry from '../../../models/index'
import Repository from '../repo'
import Model from '../../../models/base/model'
import DefaultLocalRepository from './local'
import DefaultRemoteRepository from './remote'
import PeekableRecordManager from '../peekable-record-manager'
import CacheRepository from './cache'

class DefaultRepository<T extends Model, Q extends Query> implements PeekableRecordManager<T, Q> {
  private modelName: string
  private remote: Repository<Entity, Query>
  private local: Repository<Entity, string>
  private cache: Repository<T, string>
  private models: Set<T>
  private modelClass

  constructor(modelName: string, modelClass) {
    this.modelName = modelName

    const schema = schemaRegistry.get(modelName)
    this.remote = new DefaultRemoteRepository(modelName, schema.remoteUrl, schema.remotePathUrl)

    this.local = new DefaultLocalRepository(modelName)
    this.cache = new CacheRepository(modelName, modelClass)
    this.models = new Set()
    this.modelClass = modelClass
  }

  peek(query: string): Promise<T[]> {
    return this.local.find(query)
               .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)))
  }

  peekRecord(query: string): Promise<T | undefined> {
    return this.local.findRecord(query)
               .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined)
  }

  peekAll(): Promise<T[]> {
    return this.local.findAll()
               .then(realmObjects => realmObjects.map(realmObject => this.realmObjectToModel(realmObject)))
  }

  peekByPrimary(primary: any): Promise<T | undefined> {
    return this.local.findByPrimary(primary)
               .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined)
  }

  getUpdater(): Promise<null> {
    throw new Error('Method not implemented.')
  }

  unload(entity: T): Promise<null> {
    console.log(entity)
    throw new Error('Method not implemented.')
  }

  saveRecord(record: T): Promise<T> {
    return record.isNew ? this.create(record) : this.update(record)
  }

  create(entity: T): Promise<T> {
    return this.remote.create(entity.serialize())
               .then(response => this.local.create(response))
               .then(realmObject => entity.deserialize(realmObject))
  }

  find(query: Q): Promise<T[]> {
    return this.persistList(this.remote.find(query))
  }

  findRecord(query: Q): Promise<T | undefined> {
    return this.persist(this.remote.findRecord(query))
  }

  findAll(): Promise<T[]> {
    return this.persistList(this.remote.findAll())
  }

  findByPrimary(primary: any): Promise<T | undefined> {
    return this.persist(this.remote.findByPrimary(primary))
  }

  update(entity: T): Promise<T> {
    return this.remote.update(entity.serialize())
               .then(response => this.local.update(response))
               .then(realmObject => entity.deserialize(realmObject))
  }

  remove(entity: T): Promise<null> {
    const maybeDeleteFromRemote = entity.id ? this.remote.remove(entity) : Promise.resolve(null)
    return maybeDeleteFromRemote.then(() => this.local.remove(entity))
  }

  removeAll(): Promise<null> {
    return Promise.reject(null)
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

  private persistList(objects): Promise<T[]> {
    return objects.then(fetchedObjects => Promise.all(fetchedObjects.map(object => this.local.update(object))))
                  .then(
                    (realmObjects: Entity[]) => realmObjects.map(realmObject => this.realmObjectToModel(realmObject))
                  )
  }

  private persist(object): Promise<T | undefined> {
    return object.then(fetchedObject => fetchedObject ? this.local.update(fetchedObject) : undefined)
                 .then(realmObject => realmObject ? this.realmObjectToModel(realmObject) : undefined)
  }

  private realmObjectToModel(realmObject: Entity): T {
    return this.recordFor(realmObject && realmObject.id ? realmObject.id : undefined, realmObject)
  }

}

export default DefaultRepository
