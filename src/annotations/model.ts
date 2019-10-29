import 'reflect-metadata'

export const MODEL_SCHEMA_CONTAINER = '__schema'

export const typeMap = {
  Number: 'double',
  String: 'string',
  Boolean: 'bool',
  Array: 'list',
  Date: 'date'
}

const checkSchemaContainer = target => target && !target[MODEL_SCHEMA_CONTAINER] ? target[MODEL_SCHEMA_CONTAINER] = {
  name: null,
  properties: {}
} : null

const checkPropertyContainer =
  (target, propertyName) => !target[propertyName] ? target[propertyName] = {type: null} : null

const fieldProperty = (fieldName, value, override = false) => (target: any, key: string) => {
  checkSchemaContainer(target)
  checkPropertyContainer(target[MODEL_SCHEMA_CONTAINER].properties, key)

  if (target[MODEL_SCHEMA_CONTAINER].properties[key][fieldName] && !override) {
    return
  }

  target[MODEL_SCHEMA_CONTAINER].properties[key] = {
    ...target[MODEL_SCHEMA_CONTAINER].properties[key],
    [fieldName]: value
  }
}

const schemaProperty = (fieldName, value) => (constructor) => {
  checkSchemaContainer(constructor.prototype)
  constructor.prototype[MODEL_SCHEMA_CONTAINER] = {
    ...constructor.prototype[MODEL_SCHEMA_CONTAINER],
    [fieldName]: value
  }
}

export const modelName = name => schemaProperty('name', name)

export const remoteBaseUrl = url => schemaProperty('remoteBaseUrl', url)

export const remotePathUrl = url => schemaProperty('remotePathUrl', url)

const simpleProp = (target: any, key: string, type?: string, override = false) => {
  const propertyType = Reflect.getMetadata('design:type', target, key).name
  const f = fieldProperty('type', type || typeMap[propertyType] || propertyType.replace('Model', ''), override)
  f(target, key)
}

export const attr = (type?: string) => (target: any, key: string) => simpleProp(target, key, type)

export const primaryKey = () => (target: any, key: string) => {
  checkSchemaContainer(target)
  target[MODEL_SCHEMA_CONTAINER] = {
    ...target[MODEL_SCHEMA_CONTAINER],
    primaryKey: key
  }
}

export const optional = () => fieldProperty('optional', true)

export const indexed = () => fieldProperty('indexed', true)

export const toMany = (name: string) => fieldProperty('objectType', name)

export const toOne = (name: string) => (target: any, key: string) => simpleProp(target, key, name, true)
