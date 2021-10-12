import axios from 'axios';
import qs from 'qs';

async function client(endpoint, { body, method, params, additionalConfig } = {}){
  const Axios = axios.create();

  let headers = {
    "Content-type": "application/json; charset=UTF-8",
  }

  let config = {
    url: endpoint,
    method,
    headers: {
      ...headers
    },
    ...additionalConfig
  }

  if (params){
    config.params = params
    config.method = 'GET'
    config.paramsSerializer = params => {
      return qs.stringify(params, {
        arrayFormat: "brackets",
        encode: true,
        skipNulls: true
      })
    }
  }

  if (body){
    config.data = body
  }

  const onSuccess = (r) => {
    return r
  }

  const onError = (e) => {
    return Promise.reject(e.response)
  }

  return Axios(config)
    .then(onSuccess)
    .catch(onError)
}

export default client;