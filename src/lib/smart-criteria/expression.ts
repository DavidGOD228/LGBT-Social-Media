import Criterion from './criterion'
import Operator from './operator'

/**
 * @class Expression
 * @implements Criterion
 */
class Expression implements Criterion {
  private propertyName: string
  private value: any
  private operator: Operator

  /**
   * constructor
   * @param propertyName {string}
   * @param operator {Operator}
   * @param value {any}
   */
  constructor(propertyName, operator: Operator, value?: any) {
    this.propertyName = propertyName
    this.value = value
    this.operator = operator
  }

  /**
   * get string representation of value
   * @returns {string}
   */
  getValue() {
    return JSON.stringify(this.value)
  }

  /**
   * get property name
   * @returns {string}
   */
  getPropertyName() {
    return this.propertyName
  }

  /**
   * generate output
   * @returns {string}
   */
  generate(): string {
    return this.operator.generate(this)
  }
}

export default Expression
