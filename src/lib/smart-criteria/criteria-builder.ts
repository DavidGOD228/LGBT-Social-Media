import Junction from './junction'
import NATURE from './nature'

/**
 * @class CriteriaBuilder
 * @extends Junction
 */
class CriteriaBuilder extends Junction {

  /**
   * constructor
   * @param conditions {Criterion[]}
   */
  constructor(...conditions) {
    super(NATURE.AND, ...conditions)
  }

  /**
   * Generate output
   * @returns {string}
   */
  generate() {
    return this.generateConditions()
  }
}
export default CriteriaBuilder
