import { AsyncStorage } from 'react-native';
import Config from '../constants/Config';

const Host = Config.apiHost;
let Token;

AsyncStorage.getItem('JWT_TOKEN', (_, result) => {
  Token = result;
});

function request(fetchPromise) {
  return new Promise((resolve, reject) => {
    fetchPromise
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.json());
        }
        reject(response.json());
      })
      .catch((error) => {
        reject(error);
        console.warn(error);
      });
  });
}

export default {
  async auth(token) {
    await AsyncStorage.setItem('JWT_TOKEN', token);
    Token = token;
  },
  async token() {
    return await AsyncStorage.getItem('JWT_TOKEN');
  },
  async logout() {
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
  get(url, params) {
    return request(
      fetch(`${Host}${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      })
    );
  },
};
