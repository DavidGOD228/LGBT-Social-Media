import Repository from './repo'

interface LocalRepository<T, Q> extends Repository<T, Q> {

  // read
  peek(query: string): Promise<T[]>

  peekRecord(query: string): Promise<T | undefined>

  peekAll(): Promise<T[]>

  peekByPrimary(primary: any): Promise<T | undefined>

  getUpdater(): Promise<null>

  unload(entity: T): Promise<null>
}

export default LocalRepository
