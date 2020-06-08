import Constants from 'expo-constants';

const environments = {
  local: {
    apiHost: 'http://192.168.3.3',
  },
  dev: {
    apiHost: 'https://dev.healthyfutures.cloud',
  },
};

const env = Constants.manifest.releaseChannel || 'local';

export default {
  ...environments[env],
};
