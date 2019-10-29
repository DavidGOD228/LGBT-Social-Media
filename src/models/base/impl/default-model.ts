import Model from '../model'
import repositoryRegistry from '../../../repositories/index'
import schemaRegistry from '../../index'
import Entity from '../../../repositories/base/entity'
import RecordManager from '../../../repositories/base/record-manager'

const PRIMITIVE_TYPES = ['bool', 'int', 'float', 'double', 'string', 'data', 'date']

class DefaultModel implements Model {

  id: any

  isLoaded: boolean
  isReloading: boolean
  isSaving: boolean
  modelName: string

  get key() {
    return this.id
  }

  get isNew(): boolean {
    return !this.id || !this.realmModel
  }

  get hasDirtyAttributes(): boolean {
    return this.isNew || Object.keys(schemaRegistry.get(this.modelName).properties)
                               .some(field => this[field] !== this.realmModel[field]) // fails with relations
  }

  get isValid(): boolean {
    return !this.hasDirtyAttributes
  }

  private repo: RecordManager<this, any>
  private realmModel

  constructor(realmModel, modelName, repo) {
    this.realmModel = realmModel
    this.modelName = modelName
    this.repo = repo || repositoryRegistry.get(modelName)

    if (realmModel) {
      this.rollback()
    }
  }

  save(): Promise<this> {
    return this.repo.saveRecord(this)
  }

  update(): Promise<this> {
    return this.repo.update(this)
  }

  deleteRecord(): Promise<null> {
    return this.repo.remove(this)
  }

  rollback(): this {
    if (!this.realmModel) {
      return this
    }

    Object.keys(schemaRegistry.get(this.modelName).properties)
          .forEach(field => {
            try {
              const meta = schemaRegistry.get(this.modelName).properties[field]

              const realmValue = this.realmModel[field]

              // to many
              if (meta.type === 'list') {
                this[field] = realmValue.map(
                  realmModel => (repositoryRegistry.get(
                      realmModel.objectSchema().name) as RecordManager<this, any>
                  )
                    .recordFor(realmModel.id, realmModel)
                )
                return
              }

              // primitive
              if (PRIMITIVE_TYPES.indexOf(meta.type) !== -1) {
                this[field] = this.realmModel[field]
                return
              }

              // to one
              if (realmValue) {
                const {name} = realmValue.objectSchema()
                this[field] = (repositoryRegistry.get(name) as RecordManager<this, any>)
                  .recordFor(realmValue.id, realmValue)
              }

            } catch (error) {
              console.warn('=====================', error)
            }

          })

    return this
  }

  // unloadRecord(): Promise<null> {
  //   return this.repo.unload(this)
  // }

  serialize(): Entity {
    return this.toJSON()
  }

  deserialize(realmModel: Entity): this {
    this.realmModel = realmModel

    return this.rollback()
  }

  set <K extends keyof this>(propertyName: K, value: this[K]): this {
    this[propertyName] = value
    return this
  }

  get <K extends keyof this>(propertyName: K): this[K] {
    return this[propertyName]
  }

  private toJSON(): Entity {

    const serialized: Entity = {id: null}

    Object.keys(schemaRegistry.get(this.modelName).properties)
          .forEach(field => {

            try {
              const meta = schemaRegistry.get(this.modelName).properties[field]

              // to many
              if (meta.type === 'list') {
                serialized[field] = this[field] ? this[field].map(realmValue => ({id: realmValue.id})) : []
                return
              }

              // primitive
              if (PRIMITIVE_TYPES.indexOf(meta.type) !== -1) {
                serialized[field] = this[field]
                return
              }

              // to one
              serialized[field] = this[field] ? {id: this[field].id} : null
            } catch (error) {
              console.warn('=========================', error)
            }

          })

    return serialized
  }

}

export default DefaultModel
