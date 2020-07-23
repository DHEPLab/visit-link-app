import AsyncStorage from '@react-native-community/async-storage';
import Config from '../constants/Config';

const Host = Config.apiHost;
let Token;

AsyncStorage.getItem('JWT_TOKEN', (_, result) => {
  Token = result;
});

function responseContentTypeJSON(response) {
  return response.headers.get('content-type') === 'application/json';
}

function request(fetchPromise) {
  return new Promise((resolve, reject) => {
    fetchPromise
      .then(async (response) => {
        if (response.ok) {
          resolve(
            responseContentTypeJSON(response)
              ? await response.json()
              : { text: await response.text() }
          );
        } else {
          console.warn(response);
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
        console.warn(error);
      });
  });
}

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

export default {
  async auth(token) {
    await AsyncStorage.setItem('JWT_TOKEN', token);
    Token = token;
  },
  async token() {
    return await AsyncStorage.getItem('JWT_TOKEN');
  },
  async signOut() {
    await AsyncStorage.removeItem('JWT_TOKEN');
  },
  post(url, body) {
    return request(
      fetch(`${Host}${url}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
      })
    );
  },
  put(url, body) {
    return request(
      fetch(`${Host}${url}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
      })
    );
  },
  get(url, params) {
    return request(
      fetch(`${Host}${url}?${objToQueryString(params)}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      })
    );
  },
  delete(url) {
    return request(
      fetch(`${Host}${url}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      })
    );
  },
};
