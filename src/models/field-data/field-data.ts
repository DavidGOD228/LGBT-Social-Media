import DefaultModel from '../base/impl/default-model'
import FieldModel from '../field'
import FieldValueModel from '../field-value'

class FieldDataModel extends DefaultModel {

  id: number

  name: string

  profileId: number

  field: FieldModel

  fieldValues: FieldValueModel[]

}

export default FieldDataModel
