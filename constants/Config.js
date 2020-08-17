import Constants from 'expo-constants';

const environments = {
  local: {
    // apiHost: 'http://192.168.3.3:8080',
    apiHost: 'http://192.168.43.30:8080',
    ossHost: 'https://healthy-future-dev.oss-cn-shanghai.aliyuncs.com',
  },
  dev: {
    apiHost: 'https://dev.healthyfutures.cloud',
    ossHost: 'https://healthy-future-dev.oss-cn-shanghai.aliyuncs.com',
  },
  stg: {
    apiHost: 'https://stg.healthyfutures.cloud',
    ossHost: 'https://healthy-future-dev.oss-cn-shanghai.aliyuncs.com',
  },
};

const env = Constants.manifest.releaseChannel || 'local';

export default {
  ...environments[env],
};
