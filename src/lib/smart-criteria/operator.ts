import Expression from './expression'

/**
 * @class Operator
 */
class Operator {
  private signature: string

  /**
   * constructor
   * @param functionName {string}
   */
  constructor(functionName) {
    this.signature = functionName
  }

  /**
   * generate output for specified expression
   * @param expr {Expression}
   * @returns {string}
   */
  generate(expr: Expression): string {
    return this.format(expr.getPropertyName(), expr.getValue())
  }

  /**
   * substitute placeholders into function signature
   * @param args
   * @returns {string}
   */
  private format(...args) {
    return this.signature.replace(
      /{(\d+)}/g,
      (match, counter) => typeof args[counter] !== 'undefined' ? args[counter] : match
    )
  }
}

export default Operator
