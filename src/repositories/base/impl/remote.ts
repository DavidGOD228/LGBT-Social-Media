import Query from '../../../lib/smart-criteria/query'
import Fetch from '../../../utils/fetch'
import pluralize from 'pluralize'
import configuration from '../../../configs/index'
import Entity from '../entity'
import {dasherize} from '../../../utils/string'
import RemoteRepository from '../remote'

class DefaultRemoteRepository<T extends Entity, Q extends Query> implements RemoteRepository<T, Q> {

  private modelName: string
  private baseUrl: string
  private pathUrl?: string

  constructor(modelName, baseUrl = configuration.remoteApi.base, pathUrl?: string) {
    this.modelName = modelName
    this.baseUrl = baseUrl
    this.pathUrl = pathUrl
  }

  fetch(query: Q): Promise<T[]> {
    return this.find(query)
  }

  fetchRecord(query: Q): Promise<T | undefined> {
    return this.findRecord(query)
  }

  fetchAll(): Promise<T[]> {
    return this.findAll()
  }

  fetchByPrimary(primary: any): Promise<T | undefined> {
    return this.findByPrimary(primary)
  }

  create(entity: T): Promise<T> {
    return Fetch.put(this.url(), entity)
                .then(res => res.response.objects.pop())
  }

  find(query: Q): Promise<T[]> {
    return Fetch.post(this.url(), query.generate())
                .then(res => res.response.objects)
  }

  findRecord(query: Q): Promise<T | undefined> {
    return Fetch.post(this.url(), query.setLimit(1)
                                       .generate())
                .then(res => res.response.objects.pop())
  }

  findAll(): Promise<T[]> {
    return Fetch.post(this.url(), {})
                .then(res => res.response.objects)
  }

  findByPrimary(primary: any): Promise<T | undefined> {
    return Fetch.get(`${this.url()}/${primary}`)
                .then(res => res.response.objects.pop())
  }

  update(entity: T): Promise<T> {
    return Fetch.put(this.url(entity.id), entity)
                .then(res => res.response.objects.pop())
  }

  remove(entity: T): Promise<null> {
    return Fetch.delete(this.url(entity.id))
  }

  removeAll(): Promise<null> {
    return Promise.reject(null)
  }

  private url(postfix?) {
    const dashedAndPluralized = pluralize(dasherize(this.modelName))

    const pathUrl = this.pathUrl || dashedAndPluralized

    return `${this.baseUrl}/${pathUrl}${postfix ? `/${postfix}` : ''}`
  }

}

export default DefaultRemoteRepository
