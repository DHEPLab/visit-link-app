import { ConfigContext, ExpoConfig } from "@expo/config";

export default (context: ConfigContext): ExpoConfig => {
  if (process.env.APP_ENV === "production") {
    return {
      name: "健康未来",
      description: "RURAL EDUCATION ACTION PROGRAM",
      slug: "healthy-future-app",
      platforms: ["android"],
      version: "3.0.1",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "hf",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "cover",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      android: {
        package: "edu.stanford.fsi.reap.app",
      },
      extra: {
        releaseChannel: "prod",
      },
    };
  } else if (process.env.APP_ENV === "staging") {
    return {
      name: "Stg Healthy Future",
      description: "RURAL EDUCATION ACTION PROGRAM",
      slug: "healthy-future-app",
      platforms: ["android"],
      version: "1.0.0-stg",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "hf",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "cover",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      android: {
        package: "edu.stanford.fsi.reap.app",
      },
      extra: {
        releaseChannel: "stg",
      },
    };
  } else if (process.env.APP_ENV === "dev") {
    return {
      name: "Dev Healthy Future",
      description: "RURAL EDUCATION ACTION PROGRAM",
      slug: "healthy-future-app",
      platforms: ["android"],
      version: "4.0.3-dev",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "hf",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "cover",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      android: {
        package: "edu.stanford.fsi.reap.appdev",
      },
      extra: {
        releaseChannel: "dev",
      },
    };
  } else {
    return {
      name: "Healthy Future",
      description: "RURAL EDUCATION ACTION PROGRAM",
      slug: "healthy-future-app",
      platforms: ["android"],
      version: "2.0.0-local",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "hf",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "cover",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      android: {
        package: "edu.stanford.fsi.reap.app",
      },
      plugins: ["expo-asset", "expo-font", "expo-localization"],
    };
  }
};
