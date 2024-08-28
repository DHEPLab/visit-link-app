import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

import Config from "../constants/Config";
import store from "../store";
import { openGlobalSubmitErrorMessage, restoreToken } from "@/actions";

// fetch timeout 15s
const timeout = 15000;
const Host = Config.apiHost;
let Token;

AsyncStorage.getItem("JWT_TOKEN", (_, result) => {
  Token = result;
});

export function responseContentTypeJSON(response) {
  return (
    response.headers.get("content-type") === "application/json" ||
    response.headers.get("content-type") === "application/problem+json"
  );
}

async function cleanToken() {
  store.dispatch(restoreToken(null));
  Token = "";
  await AsyncStorage.removeItem("JWT_TOKEN");
}

async function onResponseError(url, status, data) {
  let msg = "服务异常，请稍后重试";
  switch (status) {
    case 502:
      msg = "网络异常，请稍后重试";
    case 500:
      break;
    case 404:
      return;
    case 401:
      cleanToken();
      return;
    default:
      if (data.violations) {
        msg = "表单校验失败";
      } else if (data.detail) {
        msg = data.detail;
      }
  }
  console.warn(url, msg, data);
  ToastAndroid.show(msg, ToastAndroid.LONG);
}

function request(fetchPromise, method, { silence, url }) {
  return new Promise((resolve, reject) => {
    fetchPromise
      .then(async (response) => {
        const data = responseContentTypeJSON(response)
          ? await response.json()
          : { text: await response.text() };
        if (response.ok) {
          resolve(data);
        } else {
          !silence && onResponseError(url, response.status, data);
          reject(data);
        }
      })
      .catch((error) => {
        if (!silence) {
          if (method === "GET") {
            ToastAndroid.show(url + "网络异常，请稍后重试", ToastAndroid.SHORT);
          } else {
            store.dispatch(openGlobalSubmitErrorMessage());
          }
        }
        reject(error);
        console.warn(url + JSON.stringify(error));
      });
  });
}

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.join("&");
}

export default {
  async auth(token) {
    await AsyncStorage.setItem("JWT_TOKEN", token);
    Token = token;
  },
  async token() {
    return await AsyncStorage.getItem("JWT_TOKEN");
  },
  async signOut() {
    await AsyncStorage.removeItem("JWT_TOKEN");
  },
  post(url, body) {
    return request(
      fetch(`${Host}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
        timeout,
      }),
      "POST",
      { url },
    );
  },
  put(url, body) {
    return request(
      fetch(`${Host}${url}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
        timeout,
      }),
      "PUT",
      { url },
    );
  },
  silencePut(url, body) {
    return request(
      fetch(`${Host}${url}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
        timeout,
      }),
      "PUT",
      { silence: true, url },
    );
  },
  get(url, params) {
    return request(
      fetch(`${Host}${url}?${objToQueryString(params)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        timeout,
      }),
      "GET",
      { url },
    );
  },
  silenceGet(url, params) {
    return request(
      fetch(`${Host}${url}?${objToQueryString(params)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        timeout,
      }),
      "GET",
      { silence: true, url },
    );
  },
  delete(url) {
    return request(
      fetch(`${Host}${url}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        timeout,
      }),
      "DELETE",
      { url },
    );
  },
};
