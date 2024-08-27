import { ConfigContext, ExpoConfig } from "@expo/config";
import pkg from "./package.json";

export default (context: ConfigContext): ExpoConfig => {
  return {
    name: process.env.EXPO_PUBLIC_APP_NAME || "Healthy Future",
    description: "RURAL EDUCATION ACTION PROGRAM",
    slug: "healthy-future-app",
    platforms: ["android"],
    version: process.env.EXPO_PUBLIC_APP_VERSION || pkg.version,
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
      package: `edu.stanford.fsi.reap.app${process.env.NODE_ENV}`,
    },
    plugins: ["expo-asset", "expo-font", "expo-localization"],
  };
};
