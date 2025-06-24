import axios from 'axios';
import humps from 'humps';

export const authKey = 'App-Authorization';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,

  decamelizeRequest: true,
  camelizeResponse: true,
});

// Decamelize request
api.interceptors.request.use((config) => {
  if (config.decamelizeRequest) {
    if (
      // Skip decamelize with FormData's
      !(config.data instanceof FormData)
    ) {
      config.data = humps.decamelizeKeys(config.data);
    }

    if (config.params) {
      config.params = humps.decamelizeKeys(config.params);
    }
  }

  return config;
});

// Send auth header
api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem(authKey);

  return config;
});

// Store auth header
api.interceptors.response.use((response) => {
  if (
    response.headers['authorization'] &&
    response.headers['authorization'] !== '-'
  ) {
    localStorage.setItem(authKey, response.headers['authorization']);
  }

  return response;
});

// Camelize response
api.interceptors.response.use((response) => {
  if (response.config.responseType && response.config.responseType !== 'json') {
    return response;
  }

  if (response.config.camelizeResponse && response.data) {
    response.data = humps.camelizeKeys(response.data);
  }

  return response;
});

export default api;
