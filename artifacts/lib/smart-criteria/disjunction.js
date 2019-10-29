import Junction from './junction';
import NATURE from './nature';
/**
 * @class Disjunction
 * @extends Junction
 */
class Disjunction extends Junction {
    /**
     * constructor
     * @param conditions {Criterion[]}
     */
    constructor(...conditions) {
        super(NATURE.OR, ...conditions);
    }
}
export default Disjunction;
//# sourceMappingURL=disjunction.js.map