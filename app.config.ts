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
    android: {
      package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE || "edu.stanford.fsi.reap.app",
    },
    plugins: [
      "expo-asset", "expo-font", "expo-localization",
      ["expo-build-properties", {
        android: {
          usesCleartextTraffic: true,
        }
      }
      ]
    ],
    extra: {
      eas: {
        // TODO: This is testing projectId, should switch to production projectId
        projectId: "6808191f-e81d-469a-8dc6-6a7878fea1b8"
      }
    }
  };
};
