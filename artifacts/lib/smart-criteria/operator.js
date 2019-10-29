/**
 * @class Operator
 */
class Operator {
    /**
     * constructor
     * @param functionName {string}
     */
    constructor(functionName) {
        this.signature = functionName;
    }
    /**
     * generate output for specified expression
     * @param expr {Expression}
     * @returns {string}
     */
    generate(expr) {
        return this.format(expr.getPropertyName(), expr.getValue());
    }
    /**
     * substitute placeholders into function signature
     * @param args
     * @returns {string}
     */
    format(...args) {
        return this.signature.replace(/{(\d+)}/g, (match, counter) => typeof args[counter] !== 'undefined' ? args[counter] : match);
    }
}
export default Operator;
//# sourceMappingURL=operator.js.map