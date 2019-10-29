/**
 * @class Expression
 * @implements Criterion
 */
class Expression {
    /**
     * constructor
     * @param propertyName {string}
     * @param operator {Operator}
     * @param value {any}
     */
    constructor(propertyName, operator, value) {
        this.propertyName = propertyName;
        this.value = value;
        this.operator = operator;
    }
    /**
     * get string representation of value
     * @returns {string}
     */
    getValue() {
        return JSON.stringify(this.value);
    }
    /**
     * get property name
     * @returns {string}
     */
    getPropertyName() {
        return this.propertyName;
    }
    /**
     * generate output
     * @returns {string}
     */
    generate() {
        return this.operator.generate(this);
    }
}
export default Expression;
//# sourceMappingURL=expression.js.map