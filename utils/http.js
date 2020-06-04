const Host = 'http://192.168.3.3:8080';

export default {
  post(url, body) {
    return new Promise((resolve, reject) => {
      fetch(`${Host}${url}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return resolve(response.json());
          }
          return reject(response.json());
        })
        .catch((error) => {
          reject(error);
          console.warn(error);
        });
    });
  },
};
