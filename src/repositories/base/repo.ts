interface Repository<T, Q> {

  // create
  create(entity: T): Promise<T>

  // read
  find(query: Q): Promise<T[]>

  findRecord(query: Q): Promise<T | undefined>

  findAll(): Promise<T[]>

  findByPrimary(primary: any): Promise<T | undefined>

  // update
  update(entity: T): Promise<T>

  // delete
  remove(entity: T): Promise<null>

  removeAll(): Promise<null>
}

export default Repository
