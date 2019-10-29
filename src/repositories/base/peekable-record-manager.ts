import RecordManager from './record-manager'
import LocalRepository from './local'

interface PeekableRecordManager<T, Q> extends RecordManager<T, Q>, LocalRepository<T, Q> {

}

export default PeekableRecordManager
