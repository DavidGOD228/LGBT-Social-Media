import CriteriaBuilder from './criteria-builder';
class Query {
    constructor() {
        this.criteria = new CriteriaBuilder();
        this.limit = null;
        this.page = null;
        this.sort = null;
        this.relationRestriction = null;
        this.distinct = true;
    }
    /**
     * add new criterion to list
     * @param criterion
     * @returns {Query}
     */
    add(criterion) {
        this.criteria.add(criterion);
        return this;
    }
    /**
     * set limit
     * @param limit
     * @returns {Query}
     */
    setLimit(limit) {
        this.limit = limit;
        return this;
    }
    /**
     * set page
     * @param page
     * @returns {Query}
     */
    setPage(page) {
        this.page = page;
        return this;
    }
    /**
     * set sort
     * @param sort
     * @returns {Query}
     */
    setSort(sort) {
        this.sort = sort;
        return this;
    }
    /**
     * Set distinct
     * @param distinct
     * @returns {Query}
     */
    setDistinct(distinct) {
        this.distinct = distinct;
        return this;
    }
    /**
     * Set relation restriction
     * @param relationRestriction
     * @returns {Query}
     */
    setRelationRestriction(relationRestriction) {
        this.relationRestriction = relationRestriction;
        return this;
    }
    /**
     * generate output
     * @returns {{
     * searchExpression: string,
     * orderExpression: string,
     * limit: (number|null),
     * page: (number|null),
     * distinct: boolean,
     * relationRestriction: (any|null)
     * }}
     */
    generate() {
        const query = {};
        const dirty = {
            searchExpression: this.criteria ? this.criteria.generate() : null,
            orderExpression: this.sort ? this.sort.generate() : null,
            limit: this.limit,
            page: this.page,
            distinct: this.distinct,
            relationRestriction: this.relationRestriction
        };
        Object.keys(dirty)
            .forEach(prop => dirty[prop] === null || (query[prop] = dirty[prop]));
        return query;
    }
}
export default Query;
//# sourceMappingURL=query.js.map