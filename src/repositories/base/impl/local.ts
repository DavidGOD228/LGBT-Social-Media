import defaultRealm from '../../../initializers/realm'
import * as Realm from 'realm'
import {Results} from 'realm'
import Entity from '../entity'
import LocalRepository from '../local'

class DefaultLocalRepository<T extends Entity, Q extends string> implements LocalRepository<T, Q> {

  private modelName: string
  private realm: Realm

  constructor(modelName, realm = defaultRealm) {
    this.modelName = modelName
    this.realm = realm
  }

  unload(entity: T): Promise<null> {
    return this.remove(entity)
  }

  peek(query: Q): Promise<T[]> {
    return this.find(query)
  }

  peekRecord(query: Q): Promise<T | undefined> {
    return this.findRecord(query)
  }

  peekAll(): Promise<T[]> {
    return this.findAll()
  }

  peekByPrimary(primary: any): Promise<T | undefined> {
    return this.findByPrimary(primary)
  }

  create(entity: T): Promise<T> {
    return new Promise(res => {
      this.realm.write(() => {
        res(this.realm.create(this.modelName, entity, true))
      })
    })
  }

  find(query: Q): Promise<T[]> {
    return Promise.resolve(this.getAllFromRealm()
                               .filtered(query)
                               .map((it: T) => it))
  }

  findRecord(query: Q): Promise<T | undefined> {
    return this.find(query)
               .then(result => result.find(() => true))
  }

  findAll(): Promise<T[]> {
    return Promise.resolve(this.getAllFromRealm()
                               .map((it: T) => it))
  }

  findByPrimary(primary: any): Promise<T | undefined> {
    return Promise.resolve(this.getAllFromRealm()
                               .filtered(`id = '${primary}'`)
                               .find(() => true))
  }

  update(entity: T): Promise<T> {
    return new Promise(res => {
      this.realm.write(() => {
        res(this.realm.create(this.modelName, entity, true))
      })
    })
  }

  remove(entity: T): Promise<null> {
    return new Promise(res => {
      this.findByPrimary(entity.id)
          .then(founded => founded ? this.realm.write(() => {
            this.realm.delete(founded)
            res()
          }) : res())
    })
  }

  removeAll(): Promise<null> {
    return new Promise(res => {
      this.realm.write(() => {
        this.realm.delete(this.getAllFromRealm())
        res()
      })
    })
  }

  getUpdater(): Promise<null> {
    return new Promise((res: () => void) => this.realm.addListener('change', res))
  }

  private getAllFromRealm(): Results<T> {
    return this.realm.objects(this.modelName)
  }
}

export default DefaultLocalRepository
