import BaseService from '../base'
import Model from '../../../models/base/model'
import repositoryRegistry from '../../../repositories/index'
import {MODEL_SCHEMA_CONTAINER} from '../../../annotations/model'
import DefaultRepository from '../../../repositories/base/impl/default'
import RecordManager from '../../../repositories/base/record-manager'

class DefaultBaseService<T extends Model, R extends RecordManager<T, any>> implements BaseService {

  private modelClass: any
  private repo: R

  get modelName(): string {
    return this.modelClass['prototype'][MODEL_SCHEMA_CONTAINER].name
  }

  constructor(modelClass, repo: any = DefaultRepository) {
    this.modelClass = modelClass

    const modelName = this.modelName

    if (!repositoryRegistry.has(modelName)) {
      repositoryRegistry.add(modelName, new repo(modelName, this.modelClass))
    }

    this.repo = repositoryRegistry.get(modelName) as R
  }

  preload(): Promise<any> {
    return Promise.resolve()
  }

  protected getRepo(): R {
    return this.repo
  }
}

export default DefaultBaseService
