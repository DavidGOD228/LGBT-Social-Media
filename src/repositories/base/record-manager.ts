import Repository from './repo'

interface RecordManager<T, Q> extends Repository<T, Q> {
  saveRecord(record: T): Promise<T>

  createRecord(initProps?: object): T

  recordFor(id?: number, underlying?: object): T
}

export default RecordManager
