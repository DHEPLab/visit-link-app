import Constants from "expo-constants";

const environments = {
  local: {
    //apiHost: 'https://dev.healthyfutures.cloud'
    apiHost: "http://192.168.31.41:8080",
  },
  dev: {
    apiHost: "https://dev.healthyfutures.cloud",
  },
  stg: {
    apiHost: "https://stg.healthyfutures.cloud",
  },
  prod: {
    apiHost: "https://healthyfutures.cloud",
  },
};

const env = Constants.expoConfig?.extra?.releaseChannel || "local";

export default {
  ...environments[env],
};
