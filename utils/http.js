import AsyncStorage from '@react-native-community/async-storage';
import Config from '../constants/Config';
import { ToastAndroid } from 'react-native';

// fetch timeout 15s
const timeout = 15000;
const Host = Config.apiHost;
let Token;

AsyncStorage.getItem('JWT_TOKEN', (_, result) => {
  Token = result;
});

function responseContentTypeJSON(response) {
  return response.headers.get('content-type') === 'application/json';
}

async function onResponseError(error) {
  let msg = '服务异常，请稍后重试';
  switch (error.status) {
    case 502:
      msg = '网络异常，请稍后重试';
    case 500:
      break;
    case 401:
      return;
    default:
      const data = await error.json();
      if (data.violations) {
        msg = '表单校验失败';
      } else if (data.detail) {
        msg = data.detail;
      }
  }
  ToastAndroid.show(msg, ToastAndroid.LONG);
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
          onResponseError(response);
          reject(response);
        }
      })
      .catch((error) => {
        ToastAndroid.show('网络异常，请稍后重试', ToastAndroid.SHORT);
        reject(error);
        console.warn(JSON.stringify(error));
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
        timeout,
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
        timeout,
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
        timeout,
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
        timeout,
      })
    );
  },
};
