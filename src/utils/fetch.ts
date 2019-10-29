import {Platform} from 'react-native'
const getHeaders = () => {
  return {
    'content-type': 'application/json',
  }
}

const defaultResponseHandler = (response: Response) => {
  console.log(response, 'defaultResponseHandler')

  if (response.status === 200) {
    return response.json()
  } else {
    throw response
  }
}

class Fetch {

  static async get(url, query = {}) {
    const queryParams = Object.keys(query)
                              .map(field => [field, query[field]])

    // cache killer
    queryParams.push(['_', new Date().valueOf()])

    const requestUrl = `${url}?${queryParams.map(it => it.join('='))
                                            .join('&')}`

    console.log('Fetch.get: ', requestUrl)

    return fetch(requestUrl, {
      headers: getHeaders()
    })
      .then(defaultResponseHandler)
  }

  static post(url, body, handler?): Promise<Response> | any {
    console.log('Fetch.post: ', url, body)
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: getHeaders()
    })
      .then(handler || defaultResponseHandler)
  }

  // will refactor it to make a single universal/configurable post method
  static postForm(url, data, handler?): Promise<Response> | any {
    console.log('Fetch.post form: ', url)
    return fetch(url, {
      method: 'post',
      body: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
    })
      .then(handler || defaultResponseHandler)
  }

  static put(url, body) {
    console.log('Fetch.put: ', url, body)
    return fetch(url, {
      method: 'put',
      body: JSON.stringify(body),
      headers: getHeaders()
    })
      .then(defaultResponseHandler)
  }

  static upload(url, file) {
    console.log('Fetch.upload: ', url, file)

    const body = new FormData()

    body.append('file', {
      uri: file,
      type: 'image/jpeg',
      name: 'photo.jpg'
    } as any)

    return fetch(url, {
      method: 'put',
      body
    })
      .then(defaultResponseHandler)
  }

  static uploadVideo(url, file) {
    console.log('Fetch.upload video: ', url, file)

    const body = new FormData()

    body.append('file', {
      uri: file,
      type: Platform.OS === 'android' ? 'video/mp4' : 'video/mov',
      name: Platform.OS === 'android' ? 'video.mp4' : 'video.mov'
    } as any)

    return fetch(url, {
      method: 'put',
      body
    })
      .then(defaultResponseHandler)
  }

  static delete(url) {
    console.log('Fetch.delete: ', url)
    return fetch(url, {
      method: 'delete',
      headers: getHeaders()
    })
      .then(defaultResponseHandler)
  }

  static customRequest(url: string, params: any) {
    console.log('Fetch custom ' + params.method, params)
    return fetch(url, params)
  }
}

export default Fetch
