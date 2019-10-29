import Repository from './repo'

interface RemoteRepository<T, Q> extends Repository<T, Q> {

  // read
  fetch(query: Q): Promise<T[]>

  fetchRecord(query: Q): Promise<T | undefined>

  fetchAll(): Promise<T[]>

  fetchByPrimary(primary: any): Promise<T | undefined>
}

export default RemoteRepository
