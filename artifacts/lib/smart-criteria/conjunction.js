import Junction from './junction';
import NATURE from './nature';
/**
 * @class Conjunction
 * @extends Junction
 */
class Conjunction extends Junction {
    /**
     * constructor
     * @param conditions {Criterion[]}
     */
    constructor(...conditions) {
        super(NATURE.AND, ...conditions);
    }
}
export default Conjunction;
//# sourceMappingURL=conjunction.js.map