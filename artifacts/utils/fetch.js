var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Platform } from 'react-native';
const getHeaders = () => {
    return {
        'content-type': 'application/json',
    };
};
const defaultResponseHandler = (response) => {
    console.log(response, 'defaultResponseHandler');
    if (response.status === 200) {
        return response.json();
    }
    else {
        throw response;
    }
};
class Fetch {
    static get(url, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = Object.keys(query)
                .map(field => [field, query[field]]);
            // cache killer
            queryParams.push(['_', new Date().valueOf()]);
            const requestUrl = `${url}?${queryParams.map(it => it.join('='))
                .join('&')}`;
            console.log('Fetch.get: ', requestUrl);
            return fetch(requestUrl, {
                headers: getHeaders()
            })
                .then(defaultResponseHandler);
        });
    }
    static post(url, body, handler) {
        console.log('Fetch.post: ', url, body);
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: getHeaders()
        })
            .then(handler || defaultResponseHandler);
    }
    // will refactor it to make a single universal/configurable post method
    static postForm(url, data, handler) {
        console.log('Fetch.post form: ', url);
        return fetch(url, {
            method: 'post',
            body: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }
        })
            .then(handler || defaultResponseHandler);
    }
    static put(url, body) {
        console.log('Fetch.put: ', url, body);
        return fetch(url, {
            method: 'put',
            body: JSON.stringify(body),
            headers: getHeaders()
        })
            .then(defaultResponseHandler);
    }
    static upload(url, file) {
        console.log('Fetch.upload: ', url, file);
        const body = new FormData();
        body.append('file', {
            uri: file,
            type: 'image/jpeg',
            name: 'photo.jpg'
        });
        return fetch(url, {
            method: 'put',
            body
        })
            .then(defaultResponseHandler);
    }
    static uploadVideo(url, file) {
        console.log('Fetch.upload video: ', url, file);
        const body = new FormData();
        body.append('file', {
            uri: file,
            type: Platform.OS === 'android' ? 'video/mp4' : 'video/mov',
            name: Platform.OS === 'android' ? 'video.mp4' : 'video.mov'
        });
        return fetch(url, {
            method: 'put',
            body
        })
            .then(defaultResponseHandler);
    }
    static delete(url) {
        console.log('Fetch.delete: ', url);
        return fetch(url, {
            method: 'delete',
            headers: getHeaders()
        })
            .then(defaultResponseHandler);
    }
    static customRequest(url, params) {
        console.log('Fetch custom ' + params.method, params);
        return fetch(url, params);
    }
}
export default Fetch;
//# sourceMappingURL=fetch.js.map