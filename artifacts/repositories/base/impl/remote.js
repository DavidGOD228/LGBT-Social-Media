import Fetch from '../../../utils/fetch';
import pluralize from 'pluralize';
import configuration from '../../../configs/index';
import { dasherize } from '../../../utils/string';
class DefaultRemoteRepository {
    constructor(modelName, baseUrl = configuration.remoteApi.base, pathUrl) {
        this.modelName = modelName;
        this.baseUrl = baseUrl;
        this.pathUrl = pathUrl;
    }
    fetch(query) {
        return this.find(query);
    }
    fetchRecord(query) {
        return this.findRecord(query);
    }
    fetchAll() {
        return this.findAll();
    }
    fetchByPrimary(primary) {
        return this.findByPrimary(primary);
    }
    create(entity) {
        return Fetch.put(this.url(), entity)
            .then(res => res.response.objects.pop());
    }
    find(query) {
        return Fetch.post(this.url(), query.generate())
            .then(res => res.response.objects);
    }
    findRecord(query) {
        return Fetch.post(this.url(), query.setLimit(1)
            .generate())
            .then(res => res.response.objects.pop());
    }
    findAll() {
        return Fetch.post(this.url(), {})
            .then(res => res.response.objects);
    }
    findByPrimary(primary) {
        return Fetch.get(`${this.url()}/${primary}`)
            .then(res => res.response.objects.pop());
    }
    update(entity) {
        return Fetch.put(this.url(entity.id), entity)
            .then(res => res.response.objects.pop());
    }
    remove(entity) {
        return Fetch.delete(this.url(entity.id));
    }
    removeAll() {
        return Promise.reject(null);
    }
    url(postfix) {
        const dashedAndPluralized = pluralize(dasherize(this.modelName));
        const pathUrl = this.pathUrl || dashedAndPluralized;
        return `${this.baseUrl}/${pathUrl}${postfix ? `/${postfix}` : ''}`;
    }
}
export default DefaultRemoteRepository;
//# sourceMappingURL=remote.js.map