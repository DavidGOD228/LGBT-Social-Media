import {MODEL_SCHEMA_CONTAINER} from '../../annotations/model'

class SchemaRegistry {
  private registry: any[]

  constructor() {
    this.registry = []
  }

  add(item: any) {
    this.registry.push(item.prototype[MODEL_SCHEMA_CONTAINER])
    return this
  }

  publish() {
    return this.registry
  }

  has(name: string): boolean {
    return this.get(name)
  }

  get(name: string): any {
    return this.registry.find(it => it.name === name)
  }
}

export default SchemaRegistry
