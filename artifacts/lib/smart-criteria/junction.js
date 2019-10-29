/**
 * @class Junction
 * @implements Criterion
 * @implements CriterionContainer
 */
class Junction {
    /**
     * constructor
     * @param nature {string}
     * @param conditions {Criterion[]}
     */
    constructor(nature, ...conditions) {
        this.nature = nature;
        this.conditions = conditions;
    }
    /**
     * add new criterion to the list
     * @param criterion {Criterion}
     * @returns {Junction}
     */
    add(criterion) {
        this.conditions.push(criterion);
        return this;
    }
    /**
     * generate output of nested conditions
     * @returns {string}
     */
    generateConditions() {
        return this.conditions
            .map(condition => condition.generate())
            .join(this.nature);
    }
    /**
     * generate output
     * @returns {string}
     */
    generate() {
        const result = this.generateConditions();
        return `(${result})`;
    }
}
export default Junction;
//# sourceMappingURL=junction.js.map