import Entity from '../../repositories/base/entity'

interface Model {
  modelName: string

  // flags
  hasDirtyAttributes: boolean
  isLoaded: boolean
  isNew: boolean
  isReloading: boolean
  isSaving: boolean
  isValid: boolean

  // fields
  id: any

  // public
  save(): Promise<this>
  update(): Promise<this>
  deleteRecord(): Promise<null>
  rollback(): this
  // unloadRecord(): Promise<null>
  set(field: keyof this, value: any): this
  get<K extends keyof this>(propertyName: K): this[K]

  // technical
  serialize(): Entity
  deserialize(realmModel: Entity): this
}

export default Model
