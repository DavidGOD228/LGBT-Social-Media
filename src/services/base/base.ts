interface BaseService {
  modelName: string
  preload(): Promise<any>
}

export default BaseService
