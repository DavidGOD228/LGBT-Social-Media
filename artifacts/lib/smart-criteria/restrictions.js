import Expression from './expression';
import OPERATORS from './operators';
import Conjunction from './conjunction';
import Disjunction from './disjunction';
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
    static equal(propertyName, value) {
        return new Expression(propertyName, OPERATORS.EQUAL, value);
    }
    /**
     * notEqual
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static notEqual(propertyName, value) {
        return new Expression(propertyName, OPERATORS.NOT_EQUAL, value);
    }
    /**
     * contain
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static contain(propertyName, value) {
        return new Expression(propertyName, OPERATORS.CONTAIN, value);
    }
    /**
     * notContain
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static notContain(propertyName, value) {
        return new Expression(propertyName, OPERATORS.NOT_CONTAIN, value);
    }
    /**
     * like
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static like(propertyName, value) {
        return new Expression(propertyName, OPERATORS.LIKE, value);
    }
    /**
     * less
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static less(propertyName, value) {
        return new Expression(propertyName, OPERATORS.LESS, value);
    }
    /**
     * notLess
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static notLess(propertyName, value) {
        return new Expression(propertyName, OPERATORS.NOT_LESS, value);
    }
    /**
     * more
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static more(propertyName, value) {
        return new Expression(propertyName, OPERATORS.MORE, value);
    }
    /**
     * notMore
     * @param propertyName {string}
     * @param value {any}
     * @returns {Expression}
     */
    static notMore(propertyName, value) {
        return new Expression(propertyName, OPERATORS.NOT_MORE, value);
    }
    /**
     * isNull
     * @param propertyName {string}
     * @returns {Expression}
     */
    static isNull(propertyName) {
        return new Expression(propertyName, OPERATORS.IS_NULL);
    }
    /**
     * isNotNull
     * @param propertyName {string}
     * @returns {Expression}
     */
    static isNotNull(propertyName) {
        return new Expression(propertyName, OPERATORS.IS_NOT_NULL);
    }
    /**
     * conjunction
     * @param conditions {string}
     * @returns {Conjunction}
     */
    static conjunction(...conditions) {
        return new Conjunction(...conditions);
    }
    /**
     * disjunction
     * @param conditions {string}
     * @returns {Disjunction}
     */
    static disjunction(...conditions) {
        return new Disjunction(...conditions);
    }
    static desc(propertyName) {
        return new Expression(propertyName, OPERATORS.DESC);
    }
    static asc(propertyName) {
        return new Expression(propertyName, OPERATORS.ASC);
    }
}
export default Restrictions;
//# sourceMappingURL=restrictions.js.map