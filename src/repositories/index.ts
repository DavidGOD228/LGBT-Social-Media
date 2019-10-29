import Model from '../models/base/model'
import RecordManager from './base/record-manager'

export class RepositoryRegistry<T extends RecordManager<M, any>, M extends Model> {
  repos: Map<string, T>

  constructor() {
    this.repos = new Map()
  }

  add(name: string, repo: T): this {
    this.repos.set(name, repo)
    return this
  }

  get(name: string): T {
    const repo = this.repos.get(name)
    if (repo) {
      return repo
    }

    throw new Error(`no repo by name: ${name}`)
  }

  has(name: string) {
    return this.repos.has(name)
  }
}

const repositoryRegistry = new RepositoryRegistry()

export default repositoryRegistry
