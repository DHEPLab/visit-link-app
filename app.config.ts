import { ConfigContext, ExpoConfig } from "@expo/config";
import pkg from "./package.json";

export default (context: ConfigContext): ExpoConfig => {
  return {
    owner: "dheplab",
    name: process.env.EXPO_PUBLIC_APP_NAME || "Healthy Future",
    description: "RURAL EDUCATION ACTION PROGRAM",
    slug: "healthy-future-app",
    platforms: ["android"],
    version: process.env.EXPO_PUBLIC_APP_VERSION || pkg.version,
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "hf",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "cover",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    android: {
      package:
        process.env.EXPO_PUBLIC_ANDROID_PACKAGE || "edu.stanford.fsi.reap.app",
    },
    plugins: [
      [
        "expo-asset",
        {
          assets: ["src/assets"],
        },
      ],
      "expo-font",
      "expo-localization",
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
            useLegacyPackaging: true,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "b4aba8d3-502f-4a0a-9f48-2b58b4bf3274",
      },
    },
  };
};
