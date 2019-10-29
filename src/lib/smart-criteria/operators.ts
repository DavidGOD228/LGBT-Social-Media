import Operator from './operator'

const OPERATORS = {
  EQUAL: new Operator('#equal("{0}", {1})'),
  NOT_EQUAL: new Operator('#notEqual("{0}", {1})'),
  CONTAIN: new Operator('#contain("{0}", {1})'),
  NOT_CONTAIN: new Operator('#notContain("{0}", {1})'),
  LIKE: new Operator('#like("{0}", {1})'),
  LESS: new Operator('#less("{0}", {1})'),
  NOT_LESS: new Operator('#notLess("{0}", {1})'),
  MORE: new Operator('#more("{0}", {1})'),
  NOT_MORE: new Operator('#notMore("{0}", {1})'),
  IS_NULL: new Operator('#isNull("{0}")'),
  IS_NOT_NULL: new Operator('#isNotNull("{0}")'),
  ASC: new Operator('#asc("{0}")'),
  DESC: new Operator('#desc("{0}")')
}

export default OPERATORS
