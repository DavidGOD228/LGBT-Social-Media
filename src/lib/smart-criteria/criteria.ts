import Junction from './junction'
import NATURE from './nature'

/**
 * @class Criteria
 * @extends Junction
 */
class Criteria extends Junction {

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
  generate(): string {
    return this.generateConditions()
  }

}

export default Criteria
