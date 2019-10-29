import Criterion from './criterion'
import CriterionContainer from './criterion-container'

/**
 * @class Junction
 * @implements Criterion
 * @implements CriterionContainer
 */
abstract class Junction implements Criterion, CriterionContainer {
  nature: string
  private conditions: Criterion[]

  /**
   * constructor
   * @param nature {string}
   * @param conditions {Criterion[]}
   */
  constructor(nature, ...conditions) {
    this.nature = nature
    this.conditions = conditions
  }

  /**
   * add new criterion to the list
   * @param criterion {Criterion}
   * @returns {Junction}
   */
  add(criterion: Criterion): this {
    this.conditions.push(criterion)
    return this
  }

  /**
   * generate output of nested conditions
   * @returns {string}
   */
  generateConditions(): string {
    return this.conditions
               .map(condition => condition.generate())
               .join(this.nature)
  }

  /**
   * generate output
   * @returns {string}
   */
  generate(): string {
    const result = this.generateConditions()
    return `(${result })`
  }
}

export default Junction
