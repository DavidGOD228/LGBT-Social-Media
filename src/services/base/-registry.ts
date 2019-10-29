import BaseService from './base'

export class ServiceRegistry<T extends BaseService> {
  services: Map<string, T>

  private onReadyCallbacks: Array<(s: this) => void>

  constructor() {
    this.services = new Map()
    this.onReadyCallbacks = []
  }

  add(service: T): this {
    this.services.set(service.modelName, service)
    return this
  }

  get(name: string): T {
    const repo = this.services.get(name)
    if (repo) {
      return repo
    }

    throw new Error(`no service by name: ${name}`)
  }

  has(name: string) {
    return this.services.has(name)
  }

  values(): T[] {
    return [...this.services.values()]
  }

  onReady(f: (s: this) => void) {
    this.onReadyCallbacks.push(f)
  }

  ready() {
    return this.onReadyCallbacks.map(f => f(this))
  }
}

const serviceRegistry = new ServiceRegistry<BaseService>()

export default serviceRegistry
