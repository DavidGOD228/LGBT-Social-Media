import Criterion from './criterion'

/**
 * @interface CriterionContainer
 * @extends Criterion
 */
interface CriterionContainer extends Criterion {

  /**
   * Add new criterion to the list
   * @param criterion {Criterion}
   */
  add(criterion: Criterion): this;
}

export default CriterionContainer
