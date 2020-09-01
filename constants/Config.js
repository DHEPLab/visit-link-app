import Constants from 'expo-constants';

const environments = {
  local: {
    apiHost: 'http://10.0.24.187:8080',
    // apiHost: 'http://192.168.43.30:8080',
  },
  dev: {
    apiHost: 'https://dev.healthyfutures.cloud',
  },
  stg: {
    apiHost: 'https://stg.healthyfutures.cloud',
  },
  prod: {
    apiHost: 'https://www.healthyfutures.cloud',
  },
};

const env = Constants.manifest.releaseChannel || 'local';

export default {
  ...environments[env],
};
