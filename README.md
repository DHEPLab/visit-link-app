# Healthy Future App

## Supported Platforms

Recommended resolution: 1200x1920

Supports only Android Pad, Android 9 Pie or higher (other versions untested; tested on HUAWEI MediaPad M5 lite 8 which is 1200x1920 FHD, 283 PPI, 8.0 inch)

## Local Development

* NodeJS version v16 LTS
* Expo SDK 38

[Prepare an Android emulator](https://docs.expo.io/workflow/android-studio-emulator/)

```
$ yarn global add expo-cli@3.23.1
$ yarn
$ yarn start
```

Run on Android device/emulator by clicking in the Expo Development Tools or use the official [Expo Client App](https://expo.io/tools#client) to scan the QR code for preview.


Recommended tool: [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

## External Dependencies

healthy-future-backend，API endpoint located in `constants/Config.js`

## Deployment Scripts

```
$ ansible/build.sh
$ ansible/package.sh
$ DEPLOY_GROUP=prod ansible/deploy.sh
```

## Building Android APK

[Turtle](https://github.com/expo/turtle) CLI is a command line interface for building Expo standalone apps. You can use it both on your CI and your private computer.

```
$ EXPO_ANDROID_KEYSTORE_PASSWORD="" \
EXPO_ANDROID_KEY_PASSWORD="" \
turtle build:android \
  --type apk \
  --keystore-path ../healthy-app-prod.jks \
  --keystore-alias "keyalias" \
  --allow-non-https-public-url \
  --public-url https://healthyfutures.cloud/expo/android-index.json
```

## Reference

- [Expo](https://docs.expo.io/)
- [Build Standalone Expo .apk and .ipa with Turtle CLI](https://www.robincussol.com/build-standalone-expo-apk-ipa-with-turtle-cli/)
