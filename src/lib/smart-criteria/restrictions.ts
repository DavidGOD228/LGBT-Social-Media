import Expression from './expression'
import OPERATORS from './operators'
import Conjunction from './conjunction'
import Disjunction from './disjunction'

/**
 * @class Restrictions
 * Expression factory
 */
class Restrictions {

  /**
   * equal
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static equal(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.EQUAL, value)
  }

  /**
   * notEqual
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static notEqual(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.NOT_EQUAL, value)
  }

  /**
   * contain
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static contain(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.CONTAIN, value)
  }

  /**
   * notContain
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static notContain(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.NOT_CONTAIN, value)
  }

  /**
   * like
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static like(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.LIKE, value)
  }

  /**
   * less
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static less(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.LESS, value)
  }

  /**
   * notLess
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static notLess(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.NOT_LESS, value)
  }

  /**
   * more
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static more(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.MORE, value)
  }

  /**
   * notMore
   * @param propertyName {string}
   * @param value {any}
   * @returns {Expression}
   */
  static notMore(propertyName: string, value: any) {
    return new Expression(propertyName, OPERATORS.NOT_MORE, value)
  }

  /**
   * isNull
   * @param propertyName {string}
   * @returns {Expression}
   */
  static isNull(propertyName: string) {
    return new Expression(propertyName, OPERATORS.IS_NULL)
  }

  /**
   * isNotNull
   * @param propertyName {string}
   * @returns {Expression}
   */
  static isNotNull(propertyName: string) {
    return new Expression(propertyName, OPERATORS.IS_NOT_NULL)
  }

  /**
   * conjunction
   * @param conditions {string}
   * @returns {Conjunction}
   */
  static conjunction(...conditions) {
    return new Conjunction(...conditions)
  }

  /**
   * disjunction
   * @param conditions {string}
   * @returns {Disjunction}
   */
  static disjunction(...conditions) {
    return new Disjunction(...conditions)
  }

  static desc(propertyName: string) {
    return new Expression(propertyName, OPERATORS.DESC)
  }

  static asc(propertyName: string) {
    return new Expression(propertyName, OPERATORS.ASC)
  }

}

export default Restrictions
